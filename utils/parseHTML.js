import parse from "html-react-parser";
import DOMPurify from "dompurify";

const isBrowser = typeof window !== "undefined" && window;

export default function parseHtml(html) {
  if (isBrowser) {
    return parse(
      DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe", "script", "meta"],
        ADD_ATTR: [
          "allow",
          "allowfullscreen",
          "frameborder",
          "scrolling",
          "target",
        ],
      })
    );
  }
}
