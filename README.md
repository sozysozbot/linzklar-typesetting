# linzklar-typesetting
燐字の等幅組版（等倍サイズ・二倍サイズ対応）

## convert

`sans_serif/` に svg を書き、それを `tsc convert.ts` して `node convert.js` すると `src/glyphs.ts` にパスが焼かれる。`src/glyphs.ts` は `src/index.ts` とともに webpack の対象であるので、 webpack されてサイトに反映される。 