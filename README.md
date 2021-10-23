# linzklar-typesetting
燐字の等幅組版（等倍サイズ・二倍サイズ対応）

## convert

`sans_serif/` に svg を書き、それを `tsc sans_serif_svg_to_typescript.ts` して `node sans_serif_svg_to_typescript.js` すると、パスが埋め込まれたファイルである `src/sans_serif.ts` が生成される。`src/glyphs.ts` は `src/index.ts` とともに webpack の対象であるので、 webpack されてサイトに反映される。 