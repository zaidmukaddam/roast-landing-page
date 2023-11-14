import { Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <head >
        <script async src='https://cdn.splitbee.io/sb.js'></script>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
