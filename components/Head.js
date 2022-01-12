import React from "react";
import NextHead from "next/head";

const defaultTitle = "Know your gitstats";
const defaultDescription =
  "A web application to 🔍inspect your GitHub Profile Stats📊 in a lucid way. Visualization made easy with Charts💡🚀.";
const defaultOGURL = "https://know-your-gitstats.vercel.app";
const defaultOGImage = "https://know-your-gitstats.vercel.app/view.png";

const Head = props => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || defaultTitle}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.svg" />
      <meta name="theme-color" content="#743ad5" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || defaultTitle} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
    </NextHead>
  );
};

export default Head;
