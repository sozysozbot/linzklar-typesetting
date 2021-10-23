import * as fs from 'fs';
import * as svgpath from 'svgpath';
import * as jsdom from 'jsdom';

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

        fs.writeFileSync(`sheared/${charname}.svg`, `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32mm" height="32mm" version="1.1" viewBox="-4 -4 8 8" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1 ${Math.tan(-10 * Math.PI / 180)} 0 1 0 0)">
        <path fill="#faa" d="m-4 -4 h8v8h-8" />
        <path fill="#aff" d="m-3.376915 -3.376915 h6.75383 v6.75383 h-6.75383" />
        <g fill="none" stroke="#000" stroke-width=".365" id="glyph">
${new_paths.map(d => `            <path d="${d}" />`).join("\n")}
        </g>
    </g>
</svg>`);

        glyph_map[charname] = new_paths;

    });
    fs.writeFileSync("src/sans_serif.ts", `export const sans_serif_glyphs: { [key:string] : string[] } = ${JSON.stringify(glyph_map, null, 4)}`);
})();