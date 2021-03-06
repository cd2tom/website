import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface IProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Page({ children, title, description }: IProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ? `${title} | ` : ""}tom's website</title>
        <meta
          name="description"
          content={description ? description : "Personal website of Tom Finney"}
        />
        <link rel="icon" type="image/png" href="/static/images/fav.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-133286888-1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-133286888-1");`,
          }}
        />
      </Head>
      <Header />
      {children}
      <Footer />
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap");

          * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            color: #111111;
            margin: 0;
            font-size: 100%;
            font-family: Inter, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
          }

          main {
            min-height: calc(100vh - 114px);
          }

          a {
            text-decoration: none;
          }

          img {
            max-width: 100%;
            display: block;
          }

          svg {
            display: block;
          }

          button {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
