import svgpath from 'svgpath';
import * as excelColumnName from 'excel-column-name';
import { glyphs } from './glyphs';

// 文字は [x_from, x_until) × [y_from, y_until) を埋める。
// 半開区間なので、 x_until - x_from が文字のサイズを表す。
type PositionedChar = { char: string, x_from: number, x_until: number, y_from: number, y_until: number }

type CellContent = { is_special: true, char: "topleft" | "bottomleft" | "bottomright" }
    | { is_special: false, char: string }

const interpret_cell_content = (content: string): CellContent | undefined => {
    content = content.trim();
    if (content === "") {
        return undefined;
    } else if ("┌┏「".includes(content)) {
        return { is_special: true, char: "topleft" }
    } else if ("└┗L".includes(content)) {
        return { is_special: true, char: "bottomleft" }
    } else if ("┘┛」".includes(content)) {
        return { is_special: true, char: "bottomright" }
    } else {
        return { is_special: false, char: content }
    }
}

// 罫線文字を処理する
const interpret_cells = (text: Readonly<string[][]>): PositionedChar[] => {
    const cells: Readonly<(CellContent | undefined)[][]> = text.map(row => row.map(interpret_cell_content));
    const positioned_chars: PositionedChar[] = [];
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[y].length; x++) {
            const cell = cells[y][x];
            if (!cell) { continue; }
            if (!cell.is_special) {
                console.log(cell.char);
                // 左に topleft、下にbottomright、左下にbottomleftがあるかもしれない
                const left_cell: CellContent | undefined = cells[y]?.[x - 1];
                const bottom_cell: CellContent | undefined = cells[y + 1]?.[x];
                const bottom_left_cell: CellContent | undefined = cells[y + 1]?.[x - 1];

                if (left_cell?.is_special && left_cell?.char === "topleft"
                    && bottom_cell?.is_special && bottom_cell?.char === "bottomright"
                    && bottom_left_cell?.is_special && bottom_left_cell?.char === "bottomleft") {
                    // 君はでかい文字だ
                    positioned_chars.push({ char: cell.char, x_from: x - 1, x_until: x + 1, y_from: y, y_until: y + 2 });
                } else if (left_cell?.is_special && left_cell?.char === "topleft"
                    || bottom_cell?.is_special && bottom_cell?.char === "bottomright"
                    || bottom_left_cell?.is_special && bottom_left_cell?.char === "bottomleft"
                ) {
                    console.log(left_cell, bottom_cell, bottom_left_cell);
                    throw new Error(`二倍サイズの文字を構成する枠線が不完全です。文字：${cell.char}、文字の場所：${excelColumnName.intToExcelCol(x + 1)}${y + 1}`)
                } else {
                    positioned_chars.push({ char: cell.char, x_from: x, x_until: x + 1, y_from: y, y_until: y + 1 });
                }
            }
        }
    }
    return positioned_chars;
}

/**
 *  @param chars gets destructively sorted.
 */
const typeset = (chars: PositionedChar[], relative_column_spacing: number, interpret_as_horizontal: boolean) => {
    const orig_size = 6.75383;
    const width = interpret_as_horizontal ? orig_size : orig_size * (1 + relative_column_spacing);
    const height = !interpret_as_horizontal ? orig_size : orig_size * (1 + relative_column_spacing);
    const max_y_until = Math.max(...chars.map(c => c.y_until));
    const max_x_until = Math.max(...chars.map(c => c.x_until));

    if (interpret_as_horizontal) {
        // 横書き
        // y_from の小さい順（同着なら x_from の小さい順）に出力すると、目で読みやすい SVG が出る。
        chars.sort((a: PositionedChar, b: PositionedChar) => {
            if (a.y_from < b.y_from) { return -1; }
            else if (a.y_from > b.y_from) { return 1; }
            else { return a.x_from - b.x_from }
        });
    } else {
        // 縦書き
        // x_until の大きい順（同着なら y_from の小さい順）に出力すると、目で読みやすい SVG が出る。
        chars.sort((a: PositionedChar, b: PositionedChar) => {
            if (a.x_until > b.x_until) { return -1; }
            else if (a.x_until < b.x_until) { return 1; }
            else { return a.y_from - b.y_from; }
        });
    }

    const char_svgs = chars.map(c => {
        const strokes = glyphs[c.char] ?? [
            /* invalid glyph */
            "M-2.4-3.2v6.4",
            "M-1.6-3.2v6.4",
            "M-0.8-3.2v6.4",
            "M 0.0-3.2v6.4",
            "M 0.8-3.2v6.4",
            "M 1.6-3.2v6.4",
            "M 2.4-3.2v6.4",

            "M-3.2-2.4h6.4",
            "M-3.2-1.6h6.4",
            "M-3.2-0.8h6.4",
            "M-3.2 0.0h6.4",
            "M-3.2 0.8h6.4",
            "M-3.2 1.6h6.4",
            "M-3.2 2.4h6.4",
        ];

        const is_small = c.x_until - c.x_from === 1 && c.y_until - c.y_from === 1;

        const excel = is_small ?
            `${excelColumnName.intToExcelCol(c.x_from + 1)}${c.y_from + 1}` :
            `${excelColumnName.intToExcelCol(c.x_from + 1)}${c.y_from + 1}:${excelColumnName.intToExcelCol(c.x_until)}${c.y_until}`

        return `        <g id="${c.char}${excel}">\n${strokes.map(stroke => `            <path d=` + `"${svgpath(stroke)
            .scale(is_small ? 1 : 2)
            .translate(width * (c.x_from + c.x_until) / 2, height * (c.y_from + c.y_until) / 2)
            .round(4)
            .toString()}" />\n`
        ).join("")}        </g>`
    });

    return {
        svg: `    <g fill="none" stroke="#000" stroke-width=".265" id="glyphs">
${char_svgs.join("\n")}
    </g>`,
        x_max: max_x_until * width,
        y_max: max_y_until * height,
        x_min: -width / 2,
        y_min: -height / 2
    }
}

const io = () => {
    const raw_input = (document.getElementById("raw_input")! as HTMLTextAreaElement).value;
    const column_spacing_percentage = (document.getElementById("column_spacing_percentage")! as HTMLInputElement).value;
    const interpret_as_horizontal = (document.getElementById("horizontal")! as HTMLInputElement).checked;
    const chars = interpret_cells(raw_input.split("\n").map(row => row.split("\t")));
    const { svg, x_max, y_max, x_min, y_min } = typeset(chars,
        Number(column_spacing_percentage) / 100,
        interpret_as_horizontal
    );

    (document.getElementById("raw_output")! as HTMLTextAreaElement).value = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${x_max - x_min}mm" height="${y_max - y_min}mm" version="1.1" viewBox="${x_min} ${y_min} ${x_max - x_min} ${y_max - y_min}" xmlns="http://www.w3.org/2000/svg">
${svg}
</svg>`;
    document.getElementById("svg_output")!.innerHTML = svg;
    document.getElementById("svg_output")!.setAttributeNS(null, "width", `${x_max - x_min}mm`);
    document.getElementById("svg_output")!.setAttributeNS(null, "height", `${y_max - y_min}mm`);
    document.getElementById("svg_output")!.setAttributeNS(null, "viewBox", `${x_min} ${y_min} ${x_max - x_min} ${y_max - y_min}`);
}

document.getElementById('convert')!.onclick = io;
