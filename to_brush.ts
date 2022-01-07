import * as fs from 'fs';
import * as svgpath from 'svgpath';
import * as jsdom from 'jsdom';
import { Command, CommandMadeAbsolute, makeAbsolute, parseSVG } from 'svg-path-parser';

type SlabAffiliation = { glyph_path: Element, associated_slabs: Element[] };
type Coord = { x: number, y: number };

function computeSvgTransform(before: { a: Coord, b: Coord }, after: { a: Coord, b: Coord }) {
	const d = { x: before.b.x - before.a.x, y: before.b.y - before.a.y };
	const d_after = { x: after.b.x - after.a.x, y: after.b.y - after.a.y };
	const K = d.x * d.x + d.y * d.y;
	const u_r = (d.x * d_after.x + d.y * d_after.y) / K;
	const u_i = (d.x * d_after.y - d.y * d_after.x) / K;
	const w = {
		x: after.a.x - u_r * before.a.x + u_i * before.a.y,
		y: after.a.y - u_r * before.a.y - u_i * before.a.x
	};
	return `transform="matrix(${u_r} ${u_i} ${-u_i} ${u_r} ${w.x} ${w.y})"`;
}

/// console.log(computeSvgTransform(
/// 	{ a: { x: 2, y: 7 }, b: { x: 5, y: 3 } },
/// 	{ a: { x: 20, y: -3 }, b: { x: 32, y: 2 } }
/// )); // `transform="matrix(0.64 2.52 -2.52 0.64 36.36 -12.52)"`

const slab_affiliation_to_stroke = (input: SlabAffiliation) => {
	if (input.associated_slabs.length >= 3) {
		console.log("NOT YET IMPLEMENTED");
		return;
	}
	if (input.associated_slabs.length === 0) {
		console.log("No associated slabs detected; cannot convert to brush");
		return;
	}

	if (input.associated_slabs.length === 1) {
		/***************************************
		 * TODO
		 * まず slab の端点を shear で逆変換
		 * それをもとに、動かす方の端点と動かさない方の端点を決定、
		 * 片方を固定してもう片方を動かしたときの座標変換を computeSvgTransform で計算、
		 * それを直に文字列にして、直に SVG タグを文字列でベタ打ち
		 * それと slab そのものをまとめて return
		 * ……で足りるかとも思ったが、それだとパスが一つにならないので塗れない。
		 * えーとライブラリ関数を呼んで変換後のパスを普通に計算し、くっつけてやればいいかな。
		 */
	}

	if (input.associated_slabs.length === 2) {
		/***************************************
		 * TODO
		 * だいたいさっきとやることが同じだが、
		 * 新しく線形変換で作られた 2 本のパスが X 字ではなく II 字となるようにしなければならない。
		 * それを調べるためには、えーとどうするんだっけ。
		 * えーと A を (0,0), B を (1,0), C を (0,1) に写すような線形写像を掛けたときに、
		 * D (X, Y) に関して ABCD が四角形を構成する条件は「(X+Y-1)Y < 0 または X < 0」のようだ。
		 * https://www.desmos.com/calculator/z6efx8knwe
		 * もっと上手い言い方なかったっけ。うーん。
		 * 
		 * A (0,0), B (b_x, b_y), C (c_x, c_y), D (d_x, d_y)
		 * 掛けるべき写像は (x, y) |-> (x * c_y - y * c_x, b_x * y - b_y * x) / D 
		 * ただし Det = (b_x * c_y - b_y * c_x)
		 * だから 
		 * X = (d_x * c_y - d_y * c_x) / Det
		 * Y = (b_x * d_y - b_y * d_x) / Det
		 * 
		 * 求める条件は
		 * ① (X+Y-1)Y < 0、
		 *     これは Det ≠0 なら「(d_x * c_y - d_y * c_x + b_x * d_y - b_y * d_x - b_x * c_y + b_y * c_x)(b_x * d_y - b_y * d_x) < 0」
		 *     つまり 「(d_x - b_x) * (c_y - d_y) - (d_y - b_y) * (c_x - d_x) と b_x * d_y - b_y * d_x が異符号」
		 * または、
		 * ② X < 0、つまり「d_x * c_y - d_y * c_x と b_x * c_y - b_y * c_x が異符号」
		 * 
		 * えーと、つまり「det(D-B, C-D) と det(B, D) が異符号」または「det(D, C) と det(B, C) が異符号」
		 * つまり、符号つき面積を考えたとき「⊿BCD と ⊿ABD が同符号」または「⊿ACD と ⊿ABC が同符号」でいいのか。
		 * 当然どの符号付き面積も nonzero であってほしい。
		 */ 
	}

}

(() => {
	const { JSDOM } = jsdom;
	const glyph_map: object = {};
	const filenames = fs.readdirSync("sheared_slab_serif");
	filenames.forEach((filename, index) => {
		const charname = filename.slice(0, 1);
		// console.log(charname);
		const content = fs.readFileSync(`sheared_slab_serif/${filename}`, 'utf-8');
		const dom = new JSDOM(content);
		const glyph = dom.window.document.getElementById("glyph");
		const glyph_paths = Array.from(glyph.children);

		const slabs = dom.window.document.getElementById("slabs");
		const slab_paths = Array.from(slabs.children);
		const SHEAR_ANGLE = -10 * Math.PI / 180;
		const slab_affiliations: SlabAffiliation[] = glyph_paths.map(glyph_path => {
			const d = glyph_path.getAttributeNS(null, "d")
			const commands: Command[] = parseSVG(d);

			// `makeAbsolute` modifies the Command[] in-place;
			// this method generates `.x0`, `.y0`, `.x` and `.y` for all the commands.
			const commands_absolute: CommandMadeAbsolute[] = makeAbsolute(commands);

			// If we store both (x0, y0) and (x, y), then that will be redundant.
			// Also, the first 'moveto' command has `x0:0, y0:0`.
			// Hence we only need to store `.x` and `.y`
			// Also apply the shear transform here
			const coordinates = commands_absolute.map(c => ({ x: c.x, y: Math.tan(SHEAR_ANGLE) * c.x + c.y }));

			const associated_slabs: Element[] = slab_paths.filter(
				path => {
					const slab_midpoint = makeAbsolute(parseSVG(path.getAttributeNS(null, "d")))[0];
					return (coordinates.map(c => `${c.x.toPrecision(4)}`).includes(slab_midpoint.x.toPrecision(4))
						&& coordinates.map(c => `${c.y.toPrecision(4)}`).includes(slab_midpoint.y.toPrecision(4))
					);
				}
			);
			return { glyph_path, associated_slabs }
		});
		if (charname === "闇") {
			console.log(slab_affiliations);
		}
		/*
		// generate slab serif
		fs.writeFileSync(`sheared_slab_serif_draft/${charname}.svg`, `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32mm" height="32mm" version="1.1" viewBox="-4 -4 8 8" xmlns="http://www.w3.org/2000/svg">
	<g transform="matrix(1 ${Math.tan(SHEAR_ANGLE)} 0 1 0 0)">
		<path fill="#faa" d="m-4 -4 h8v8h-8" />
		<path fill="#aff" d="m-3.376915 -3.376915 h6.75383 v6.75383 h-6.75383" />
		<g fill="none" stroke="#000" stroke-width=".07" id="glyph">
${new_paths.map(d => `            <path d="${d}" />`).join("\n")}
		</g>
	</g>
	<g stroke="#ff7f27" stroke-width=".07" id="slabs">
${new_paths.flatMap(d => {
			const commands: Command[] = parseSVG(d);
		    
			return ans;
		}).join("\n")}
	</g>
</svg>`);
glyph_map[charname] = new_paths;
*/

	});
	// fs.writeFileSync("src/sans_serif.ts", `export const sans_serif_glyphs: { [key:string] : string[] } = ${JSON.stringify(glyph_map, null, 4)}`);
})();