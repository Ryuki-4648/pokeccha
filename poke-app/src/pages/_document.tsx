import { Html, Head, Main, NextScript } from 'next/document'

/**
 * 注意点
 * Html や Head は Next.js のコンポーネントなので、先頭を大文字にする
 * <Head>がないとTailWindCssが動作しないので、１つ以上の要素を指定する
 * 
 */

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>pokeccha | お気に入りのポケモンを見つけよう</title>
        <meta name="description" content="pokeccha | React.js, TypeScript, Next.js, PokeAPIでポケモンリスト作成" />
        <meta property="og:title" content="pokeccha | お気に入りのポケモンを見つけよう" />
      </Head>
      <body className="bg-main-color01">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
