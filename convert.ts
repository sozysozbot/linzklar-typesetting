import * as fs from 'fs';
import * as svgpath from 'svgpath';
import * as jsdom from 'jsdom';

(() => {
    const { JSDOM } = jsdom;
    const glyph_map: object = {};
    const filenames = fs.readdirSync("glyphs");
    filenames.forEach((filename, index) => {
        const charname = filename.slice(0, 1);
        console.log(charname);
        const content = fs.readFileSync(`glyphs/${filename}`, 'utf-8');
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

        console.log(new_paths)

        glyph_map[charname] = new_paths;

    });
    fs.writeFileSync("src/glyphs.ts", `const glyphs = ${JSON.stringify(glyph_map, null, 4)}`);
})();