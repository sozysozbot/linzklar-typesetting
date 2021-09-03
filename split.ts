import * as parse_svg from 'svg-path-parser';


(() => {
    const file_name = process.argv[2] ?? "incomplete-big.svg"
    const out_path = process.argv[3] ?? "incomplete-big-res.svg"
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

    glyphs.forEach(path => {
        if (!path.getAttribute) { return []; }
        parse_svg.parseSVG(path.getAttribute("d")).flatMap(c => {
            if (c.code === 'M') {

                const x_index = Math.floor((c.x - x_delta) / x_width);
                const y_index = Math.floor((c.y - y_delta) / y_width);
                const box_id = `？${[
                    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
                    "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ", 
            ][x_index]}${y_index}`;
                const box = dom.window.document.getElementById(box_id) ?? (() => {
                    const new_g = dom.window.document.createElementNS("http://www.w3.org/2000/svg", "g");
                    const randomColor = "#" + ("000000" + (Math.random() * 0xFFFFFF | 0).toString(16)).slice(-6);
                    new_g.setAttributeNS(null, "id", box_id);
                    new_g.setAttributeNS(null, "stroke", randomColor);
                    dom.window.document.getElementById("glyphs").appendChild(new_g);
                    return dom.window.document.getElementById(box_id);
                })();

                box.appendChild(path);
            }
        })
    })

    fs.writeFileSync(out_path,
        `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="350mm" height="246.4mm" version="1.1" viewBox="0 0 250 176" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#000" stroke-width=".365" id="glyphs">
    ${dom.window.document.getElementById("glyphs").innerHTML}
    </g>
</svg>
`)
    /*
    fs.writeFileSync(`${out_path}/content.txt`, text_content);
    glyph_map.forEach((value, key) => {
        fs.writeFileSync(`${out_path}/${key}.svg`, `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="136mm" height="120mm" version="1.1" viewBox="0 0 136 120" xmlns="http://www.w3.org/2000/svg">
        <path fill="#faa" d="m0 0 h136v120h-136" />
        <path fill="#aff" d="m10 10 h116 v 100 h-116 z" />
        <g stroke="#000" stroke-width="10" fill="none">
            <g id="glyph">${value}</g>
        </g>
    </svg>`);
    });*/
})();