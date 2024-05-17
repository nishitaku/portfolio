//@ts-check
import nodeHtmlToImage from "node-html-to-image";
import Path from "path";

const html = `
<html>
  <head>
    <style>
      body {
        width: 1200px;
        height: 630px;
      }
    </style>

    <!-- Include external CSS, JavaScript or Fonts! -->
    <link
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />

    <link
      href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
      rel="stylesheet"
    />
  </head>
  <body>
    <div
      style="
        font-family: 'Noto Sans JP';
        font-size: 28px;
        width: 1200px;
        height: 630px;
        padding: 2rem;
        background-color: #4b6bfb;
      "
    >
      <div
        style="
          height: 100%;
          width: 100%;
          border-radius: 20px;
          padding: 2rem 6rem;
          background: white;
          display: flex;
          align-items: center;
          position: relative;
        "
      >
        <span
          style="
            width: 100%;
            font-size: 60px;
            font-weight: bold;
            word-break: keep-all;
            overflow-wrap: break-word;
          "
        >
          {title}
        </span>

        <div
          style="
            position: absolute;
            right: 0;
            bottom: 0;
            margin-bottom: 2rem;
            margin-right: 2rem;
          "
        >
          <img
            src="https://nishitaku.github.io/portfolio/_astro/icon.0e424ac4_Z1woQbt.webp"
            width="40px"
            style="border-radius: 50%"
          />
          <span style="color: gray">nishitaku</span>
        </div>
      </div>
    </div>
  </body>
</html>
`;

const aarguments = process.argv;

if (aarguments && aarguments.length > 0 && aarguments[2]) {
  const workspaceArg = aarguments[2];
  const fileArg = aarguments[3];
  const postFileName = Path.parse(fileArg).name;
  const dataArg = aarguments[4];
  const data =
    dataArg && typeof dataArg === "string" ? JSON.parse(dataArg) : null;

  if (data.title) {
    const parsedHtml = html.replace(`{title}`, data.title);
    const fileName = `${postFileName}.png`;

    // @ts-ignore
    nodeHtmlToImage({
      output: `${workspaceArg}/public/social/ogp/${fileName}`,
      html: parsedHtml,
    })
      .then(() => console.log(`preview: "/social/ogp/${fileName}"`))
      .catch((e) => console.log(e?.message || e));
  }
}
