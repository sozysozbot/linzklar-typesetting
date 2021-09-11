# linzklar-typesetting
燐字の等幅組版（等倍サイズ・二倍サイズ対応）

## convert

`glyphs/` に svg を書き、それを `tsc convert.ts` して `node convert.js` すると `src/glyphs.ts` にパスが焼かれ、それが webpack されてサイトに反映される。 