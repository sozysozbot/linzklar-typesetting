# linzklar-typesetting
燐字の等幅組版（等倍サイズ・二倍サイズ対応）

## このリポジトリの使い方
いじるのは `sans_serif` フォルダ。この中では `transform="translate(-.16 .15)"` を使っていい。translate以外は対応していない。

## convert.ts
1. `sans_serif/` に svg を書く
2. `tsc convert.ts` して `node convert.js` する

これをやると、以下のことが起きる。

1. パスが埋め込まれたファイルである `src/sans_serif.ts` が生成される（`src/glyphs.ts` は `src/index.ts` とともに webpack の対象であるので、 webpack されてサイトに反映される）。 
2. 10度の剪断変形が掛かり、`#ff7f27` 色のオレンジ斜線がついたスラブセリフが `sheared_slab_serif` に出力される
