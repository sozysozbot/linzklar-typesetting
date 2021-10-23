import * as fs from 'fs';
import * as svgpath from 'svgpath';
import * as jsdom from 'jsdom';
import { Command, makeAbsolute, parseSVG } from 'svg-path-parser';

(() => {
    const { JSDOM } = jsdom;
    const glyph_map: object = {};
    const filenames = fs.readdirSync("sans_serif");
    filenames.forEach((filename, index) => {
        const charname = filename.slice(0, 1);
        console.log(charname);
        const content = fs.readFileSync(`sans_serif/${filename}`, 'utf-8');
        const dom = new JSDOM(content);
        const glyph = dom.window.document.getElementById("glyph");

        const translate = glyph.getAttributeNS(null, "transform");
        const { translate_x, translate_y } = (() => {
            if (translate === null) {
                return { translate_x: 0, translate_y: 0 }
            } else {
                const [_, x, y] = translate.match(/translate\(([-0-9.]+) ([-0-9.]+)/)!;
                return { translate_x: Number(x), translate_y: Number(y) };
            }
        })();
        console.log(translate_x, translate_y);

        const old_paths = Array.from(glyph.children);
        const new_paths = old_paths.flatMap(path => {
            const new_path = svgpath(path.getAttributeNS(null, "d"))
                .translate(translate_x, translate_y)
                .round(4)
                .toString()
                ;
            return [new_path];
        });

        console.log(new_paths);

        // generate slab serif
        const SLAB_LENGTH = 0.4;
        const SHEAR_ANGLE = -10 * Math.PI / 180;
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
            makeAbsolute(commands);
            // REASON: `makeAbsolute` modifies the Command[] in-place;
            // this method generates `.x0`, `.y0`, `.x` and `.y` for all the commands.
            // Hence I will cast with `as any as`
            const commands_absolute = commands as any as { x0: number, y0: number, x: number, y: number }[]

            // If we store both x0 and y0, then that will be redundant.
            // Also, the first 'moveto' command has `x0:0, y0:0`.
            // Hence we only need to store `.x` and `.y`
            // Also apply the shear transform here
            const coordinates = commands_absolute.map(c => ({ x: c.x, y: Math.tan(SHEAR_ANGLE) * c.x + c.y }));

            const cos_theta = (a: { x: number, y: number }, b: { x: number, y: number }) =>
                ((a.x - b.x) * Math.SQRT1_2 + (a.y - b.y) * Math.SQRT1_2) / Math.hypot(a.x - b.x, a.y - b.y)
                ;
            // The slab defaults to the ＼ direction,
            // but if the preceding or the following stroke is almost parallel to the stroke,
            // the direction is avoided and the slab will be in the ／ direction.
            const ans = [];
            for (let i = 0; i < coordinates.length; i++) {
                const prev: { x: number, y: number } | undefined = coordinates[i - 1];
                const now: { x: number, y: number } = coordinates[i];
                const next: { x: number, y: number } | undefined = coordinates[i + 1];

                const THRESHOLD = 0.9;

                if ((prev && Math.abs(cos_theta(prev, now)) > THRESHOLD)
                    || (next && Math.abs(cos_theta(next, now)) > THRESHOLD)
                ) {
                    // ／ direction
                    ans.push(`        <path d="m ${now.x.toPrecision(4)} ${now.y.toPrecision(4)} ${SLAB_LENGTH / 2} ${-SLAB_LENGTH / 2} ${-SLAB_LENGTH} ${SLAB_LENGTH} z" />`)
                } else {
                    // ＼ direction
                    ans.push(`        <path d="m ${now.x.toPrecision(4)} ${now.y.toPrecision(4)} ${SLAB_LENGTH / 2} ${SLAB_LENGTH / 2} ${-SLAB_LENGTH} ${-SLAB_LENGTH} z" />`)
                }
            }
            return ans;
        }).join("\n")}
    </g>
</svg>`);

        glyph_map[charname] = new_paths;

    });
    fs.writeFileSync("src/sans_serif.ts", `export const sans_serif_glyphs: { [key:string] : string[] } = ${JSON.stringify(glyph_map, null, 4)}`);
})();