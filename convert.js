"use strict";
exports.__esModule = true;
var fs = require("fs");
var svgpath = require("svgpath");
var jsdom = require("jsdom");
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
        fs.writeFileSync("sheared/" + charname + ".svg", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"32mm\" height=\"32mm\" version=\"1.1\" viewBox=\"-4 -4 8 8\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g transform=\"matrix(1 " + Math.tan(-10 * Math.PI / 180) + " 0 1 0 0)\">\n        <path fill=\"#faa\" d=\"m-4 -4 h8v8h-8\" />\n        <path fill=\"#aff\" d=\"m-3.376915 -3.376915 h6.75383 v6.75383 h-6.75383\" />\n        <g fill=\"none\" stroke=\"#000\" stroke-width=\".365\" id=\"glyph\">\n" + new_paths.map(function (d) { return "            <path d=\"" + d + "\" />"; }).join("\n") + "\n        </g>\n    </g>\n</svg>");
        glyph_map[charname] = new_paths;
    });
    fs.writeFileSync("src/sans_serif.ts", "export const sans_serif_glyphs: { [key:string] : string[] } = " + JSON.stringify(glyph_map, null, 4));
})();
