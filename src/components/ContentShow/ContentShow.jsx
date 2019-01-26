import React, { useEffect, useState, useRef } from "react";
import useContent from "../ContentProvider/useContent";
import PageWrapper from "../PageWrapper/PageWrapper";
import ReactMarkdown from "react-markdown";

import "./contentsShow.scss";

export default function ContentShow({ match }) {
  const contents = useContent();
  const [content, setContent] = useState(null);
  const mounted = useRef(false);
  const handle = match.params.handle;
  const type = match.path.split("/").filter(Boolean)[0];
  const contentObjects = contents[type];

  useEffect(
    function() {
      const loadedContent = Object.values(contentObjects).find(
        contentObject => contentObject.meta.handle === handle
      );

      if (loadedContent) {
        document.title = `${loadedContent.meta.title} | tom's website`;
      }

      mounted.current = true;
      setContent(loadedContent);

      return function() {
        document.title = "tom's website";
        mounted.current = false;
      };
    },
    [handle, type, contents]
  );

  return (
    <PageWrapper>
      <div className="contentsShow">
        <div>
          {!mounted.current && !content && <p>Loading...</p>}
          {mounted.current && !content && (
            <p>No content found for handle: {handle}</p>
          )}
          {content && <ReactMarkdown source={content.content} />}
        </div>
      </div>
    </PageWrapper>
  );
}
