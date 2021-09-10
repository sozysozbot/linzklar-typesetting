const excelColumnName = require('excel-column-name');

// 文字は [x_from, x_until) × [y_from, y_until) を埋める。
// 半開区間なので、 x_until - x_from が文字のサイズを表す。
type PositionedChar = { char: string, x_from: number, x_until: number, y_from: number, y_until: number }

type CellContent = { is_special: true, char: "topleft" | "bottomleft" | "bottomright" }
    | { is_special: false, char: string }

const interpret_cell_content = (content: string): CellContent => {
    if ("┌┏「".includes(content)) {
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
    const cells: Readonly<CellContent[][]> = text.map(row => row.map(interpret_cell_content));
    const positioned_chars: PositionedChar[] = [];
    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[y].length; x++) {
            const cell = cells[y][x];
            if (!cell.is_special) {
                // 左に topleft、下にbottomright、左下にbottomleftがあるかもしれない
                const left_cell: CellContent | undefined = cells[y]?.[x - 1];
                const bottom_cell: CellContent | undefined = cells[y + 1]?.[x];
                const bottom_left_cell: CellContent | undefined = cells[y + 1]?.[x - 1];

                if (left_cell.is_special && left_cell.char === "topleft"
                    && bottom_cell.is_special && bottom_cell.char === "bottomright"
                    && bottom_left_cell.is_special && bottom_left_cell.char === "bottomleft") {
                    // 君はでかい文字だ
                    positioned_chars.push({ char: cell.char, x_from: x - 1, x_until: x + 1, y_from: y, y_until: y + 2 });
                } else if (left_cell.is_special && left_cell.char === "topleft"
                    || bottom_cell.is_special && bottom_cell.char === "bottomright"
                    || bottom_left_cell.is_special && bottom_left_cell.char === "bottomleft"
                ) {
                    // でかい文字を構成する枠線が不完全だ
                    throw new Error(`二倍サイズの文字を構成する枠線が不完全です。文字の場所：${excelColumnName.intToExcelCol(x)}${y + 1}`)
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
}

const io = () => {
    const raw_input = (document.getElementById("raw_input")! as HTMLTextAreaElement).value;
    const column_spacing_percentage = (document.getElementById("column_spacing_percentage")! as HTMLInputElement).value;
    const interpret_as_horizontal = (document.getElementById("horizontal")! as HTMLInputElement).checked;
    const chars = interpret_cells(raw_input.split("\n").map(row => row.split("\t")));
    const resulting_svg = typeset(chars,
        Number(column_spacing_percentage) / 100,
        interpret_as_horizontal
    );
}
