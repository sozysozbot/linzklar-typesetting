"use strict";
exports.__esModule = true;
var fs = require("fs");
var jsdom = require("jsdom");
var svg_path_parser_1 = require("svg-path-parser");
(function () {
    var JSDOM = jsdom.JSDOM;
    var glyph_map = {};
    var filenames = fs.readdirSync("sheared_slab_serif");
    filenames.forEach(function (filename, index) {
        var charname = filename.slice(0, 1);
        // console.log(charname);
        var content = fs.readFileSync("sheared_slab_serif/" + filename, 'utf-8');
        var dom = new JSDOM(content);
        var glyph = dom.window.document.getElementById("glyph");
        var glyph_paths = Array.from(glyph.children);
        var slabs = dom.window.document.getElementById("slabs");
        var slab_paths = Array.from(slabs.children);
        var SHEAR_ANGLE = -10 * Math.PI / 180;
        var slab_affiliations = glyph_paths.map(function (glyph_path) {
            var d = glyph_path.getAttributeNS(null, "d");
            var commands = svg_path_parser_1.parseSVG(d);
            // `makeAbsolute` modifies the Command[] in-place;
            // this method generates `.x0`, `.y0`, `.x` and `.y` for all the commands.
            var commands_absolute = svg_path_parser_1.makeAbsolute(commands);
            // If we store both (x0, y0) and (x, y), then that will be redundant.
            // Also, the first 'moveto' command has `x0:0, y0:0`.
            // Hence we only need to store `.x` and `.y`
            // Also apply the shear transform here
            var coordinates = commands_absolute.map(function (c) { return ({ x: c.x, y: Math.tan(SHEAR_ANGLE) * c.x + c.y }); });
            var associated_slabs = slab_paths.filter(function (path) {
                var slab_midpoint = svg_path_parser_1.makeAbsolute(svg_path_parser_1.parseSVG(path.getAttributeNS(null, "d")))[0];
                return (coordinates.map(function (c) { return "" + c.x.toPrecision(4); }).includes(slab_midpoint.x.toPrecision(4))
                    && coordinates.map(function (c) { return "" + c.y.toPrecision(4); }).includes(slab_midpoint.y.toPrecision(4)));
            });
            return { glyph_path: glyph_path, associated_slabs: associated_slabs };
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
*/
    });
    // fs.writeFileSync("src/sans_serif.ts", `export const sans_serif_glyphs: { [key:string] : string[] } = ${JSON.stringify(glyph_map, null, 4)}`);
})();
