"use strict";
exports.__esModule = true;
var fs = require("fs");
var svgpath = require("svgpath");
var jsdom = require("jsdom");
var svg_path_parser_1 = require("svg-path-parser");
(function () {
    var JSDOM = jsdom.JSDOM;
    var glyph_map = {};
    var filenames = fs.readdirSync("sans_serif");
    filenames.forEach(function (filename, index) {
        var charname = filename.slice(0, 1);
        console.log(charname);
        var content = fs.readFileSync("sans_serif/" + filename, 'utf-8');
        var dom = new JSDOM(content);
        var glyph = dom.window.document.getElementById("glyph");
        var translate = glyph.getAttributeNS(null, "transform");
        var _a = (function () {
            if (translate === null) {
                return { translate_x: 0, translate_y: 0 };
            }
            else {
                var _a = translate.match(/translate\(([-0-9.]+) ([-0-9.]+)/), _ = _a[0], x = _a[1], y = _a[2];
                return { translate_x: Number(x), translate_y: Number(y) };
            }
        })(), translate_x = _a.translate_x, translate_y = _a.translate_y;
        console.log(translate_x, translate_y);
        var old_paths = Array.from(glyph.children);
        var new_paths = old_paths.flatMap(function (path) {
            var new_path = svgpath(path.getAttributeNS(null, "d"))
                .translate(translate_x, translate_y)
                .round(4)
                .toString();
            return [new_path];
        });
        console.log(new_paths);
        // generate slab serif
        var SLAB_LENGTH = 0.4;
        var SHEAR_ANGLE = -10 * Math.PI / 180;
        fs.writeFileSync("sheared_slab_serif/" + charname + ".svg", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"32mm\" height=\"32mm\" version=\"1.1\" viewBox=\"-4 -4 8 8\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g transform=\"matrix(1 " + Math.tan(SHEAR_ANGLE) + " 0 1 0 0)\">\n        <path fill=\"#faa\" d=\"m-4 -4 h8v8h-8\" />\n        <path fill=\"#aff\" d=\"m-3.376915 -3.376915 h6.75383 v6.75383 h-6.75383\" />\n        <g fill=\"none\" stroke=\"#000\" stroke-width=\".07\" id=\"glyph\">\n" + new_paths.map(function (d) { return "            <path d=\"" + d + "\" />"; }).join("\n") + "\n        </g>\n    </g>\n    <g stroke=\"#ff7f27\" stroke-width=\".07\" id=\"slabs\">\n" + new_paths.flatMap(function (d) {
            var commands = svg_path_parser_1.parseSVG(d);
            svg_path_parser_1.makeAbsolute(commands);
            // REASON: `makeAbsolute` modifies the Command[] in-place;
            // this method generates `.x0`, `.y0`, `.x` and `.y` for all the commands.
            // Hence I will cast with `as any as`
            var commands_absolute = commands;
            // If we store both x0 and y0, then that will be redundant.
            // Also, the first 'moveto' command has `x0:0, y0:0`.
            // Hence we only need to store `.x` and `.y`
            // Also apply the shear transform here
            var coordinates = commands_absolute.map(function (c) { return ({ x: c.x, y: Math.tan(SHEAR_ANGLE) * c.x + c.y }); });
            var cos_theta = function (a, b) {
                return ((a.x - b.x) * Math.SQRT1_2 + (a.y - b.y) * Math.SQRT1_2) / Math.hypot(a.x - b.x, a.y - b.y);
            };
            // The slab defaults to the ＼ direction,
            // but if the preceding or the following stroke is almost parallel to the stroke,
            // the direction is avoided and the slab will be in the ／ direction.
            var ans = [];
            for (var i = 0; i < coordinates.length; i++) {
                var prev = coordinates[i - 1];
                var now = coordinates[i];
                var next = coordinates[i + 1];
                var THRESHOLD = 0.9;
                if ((prev && now && Math.abs(cos_theta(prev, now)) > THRESHOLD)
                    || (next && now && Math.abs(cos_theta(next, now)) > THRESHOLD)) {
                    // ／ direction
                    ans.push("        <path d=\"m " + now.x.toPrecision(4) + " " + now.y.toPrecision(4) + " " + SLAB_LENGTH / 2 + " " + -SLAB_LENGTH / 2 + " " + -SLAB_LENGTH + " " + SLAB_LENGTH + " z\" />");
                }
                else {
                    // ＼ direction
                    ans.push("        <path d=\"m " + now.x.toPrecision(4) + " " + now.y.toPrecision(4) + " " + SLAB_LENGTH / 2 + " " + SLAB_LENGTH / 2 + " " + -SLAB_LENGTH + " " + -SLAB_LENGTH + " z\" />");
                }
            }
            return ans;
        }).join("\n") + "\n    </g>\n</svg>");
        glyph_map[charname] = new_paths;
    });
    fs.writeFileSync("src/sans_serif.ts", "export const sans_serif_glyphs: { [key:string] : string[] } = " + JSON.stringify(glyph_map, null, 4));
})();
