# linzklar-typesetting
燐字の等幅組版（等倍サイズ・二倍サイズ対応）

## このリポジトリの使い方
いじるのは `sans_serif` フォルダ。この中では `transform="translate(-.16 .15)"` を使っていい。translate以外は対応していない。

## convert.ts
1. `sans_serif/` に svg を書く
2. `tsc convert.ts` して `node convert.js` する

これをやると、以下のことが起きる。

1. パスが埋め込まれたファイルである `src/sans_serif.ts` が生成される（`src/glyphs.ts` は `src/index.ts` とともに webpack の対象であるので、 webpack されてサイトに反映される）。 
2. 10度の剪断変形が掛かり、`#ff7f27` 色のオレンジ斜線がついたスラブセリフが `sheared_slab_serif_draft` に出力される

ここで出力された `sheared_slab_serif_draft` は下書きであって、人のぬくもりを元に手動訂正が必要である。訂正後のものが `sheared_slab_serif` に置かれるはずである。がんばれ。

## 手動訂正
![](https://github.com/sozysozbot/linzklar-typesetting/blob/master/slab_serif.png)

こんな感じに手動訂正を行う。

## 肉付け（未実装）
このスラブセリフに肉付けをすることで、筆っぽいフォントを作る予定である。

![](https://github.com/sozysozbot/linzklar-typesetting/blob/master/肉付け.png)

予定：
* 元のストロークが直線である場合は、平行四辺形や三角形にすればよい。
* 元のストロークが曲線であり、両側に平行なオレンジ斜線がある場合は、元のストロークをそのまま並進移動させて輪郭とする。
* 元のストロークが曲線であり、片側にオレンジ斜線がある場合には、オレンジ斜線のない側の端点を中心とし、ストロークを回転 + 拡縮させることでオレンジ斜線の両端に載せる。
