import React from "react";
import Page from "../../src/components/Page";
import Markdown from "../../src/components/Markdown";
import {
  fetchAndProcessMarkdown,
  fetchMarkdownMeta,
} from "../../src/utils/markdown";
import { PostLink } from "../../src/components/PostLink";

function Post({ content, meta, sidemenuMeta }) {
  const types = ["blog", "project"];
  return (
    <Page title={meta.title} description={meta.summary}>
      <main>
        <article className="articleText">
          {content && <Markdown content={content} />}
        </article>
        {types.map((type) => (
          <div key={type} className="articleAside">
            <h2>More {type}s</h2>
            {sidemenuMeta
              .filter((meta) => meta.type === type)
              .map((meta) => (
                <PostLink handle={meta.handle} key={meta.handle}>
                  {meta.title}
                </PostLink>
              ))}
            {sidemenuMeta.length < 1 && <p>Sorry, no other {type} :(</p>}
          </div>
        ))}
      </main>
      <style jsx>
        {`
          main {
            max-width: 700px;
            margin: 0 auto;
            padding: 4em 1em 2em;
          }
          h1 {
            margin: 0 0 0.5em;
          }
        `}
      </style>
    </Page>
  );
}

Post.getInitialProps = async ({ query }) => {
  const { content, meta } = await fetchAndProcessMarkdown(
    `/static/markdown/posts/${query.handle}.md`
  );

  const sidemenuMeta = await fetchMarkdownMeta({ order: "desc" });
  return { content, meta, sidemenuMeta };
};

export default Post;
