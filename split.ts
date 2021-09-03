import * as parse_svg from 'svg-path-parser';

(() => {
    const excelColumnName = require('excel-column-name');
    const svgpath = require('svgpath');
    const file_name = process.argv[2] ?? "complete.svg"
    const out_path = process.argv[3] ?? "glyphs"
    const fs = require('fs');
    const text = fs.readFileSync(file_name, 'utf-8');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(text);
    const glyphs = [...dom.window.document.getElementById("glyphs").childNodes];

    const x_width = 6.75383;
    const y_width = 6.75383;
    const x_delta = 0.28;
    const y_delta = 0.26;

    const transcription_count: Map<string, number> = new Map();

    for (const glyph of glyphs) {
        if (!glyph.getAttribute) { continue; }
        const glyph_id: string = glyph.getAttribute("id");
        const size = glyph_id.includes(":") ? 2 : 1;
        const [_, glyph_transcription, column_string, row_string] = glyph_id.match(/^(.)([A-Za-z]+)([0-9]+)/)!;
        const count = (transcription_count.get(glyph_transcription) ?? 0) + 1;
        transcription_count.set(glyph_transcription, count);
        const x_index = excelColumnName.excelColToInt(column_string) - 1;
        const y_index = Number(row_string);

        const old_paths = [...glyph.childNodes];
        const new_paths = old_paths.flatMap(path => {
            if (!path.getAttribute) { return []; }
            if (size === 1) {
                const old_path = path.getAttributeNS(null, "d");
                const new_path = svgpath(old_path)
                    .translate(-(x_index * x_width + x_delta), -(y_index * y_width + y_delta))
                    .toString();

                return [new_path];

            } else {
                const new_path = svgpath(path.getAttributeNS(null, "d"))
                    .translate(-(x_index * x_width + x_delta), -(y_index * y_width + y_delta))
                    .scale(0.5)
                    .toString()
                    ;
                return [new_path];
            }
        });

        fs.writeFileSync(`${out_path}/${glyph_transcription}_${size === 2 ? "large" : "small"}_${transcription_count.get(glyph_transcription)}.svg`, `<?xml version="1.0" encoding="UTF-8"?>
<svg width="20mm" height="20mm" version="1.1" viewBox="0 0 6.75383 6.75383" xmlns="http://www.w3.org/2000/svg">
    <!-- From ${glyph_id} -->
    <path fill="#faa" d="m0 0 h20v20h-20" />
    <g fill="none" stroke="#000" stroke-width=".365" >
        ${new_paths.map(p => `<path d="${p}" />`).join("\n\t\t")}
    </g>
</svg>`)

    }
})();