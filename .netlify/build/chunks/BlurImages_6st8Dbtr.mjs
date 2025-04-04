import { jsx } from 'react/jsx-runtime';
import 'react';

function BlurImages({
  src,
  alt,
  className = "",
  width,
  height
}) {
  return /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt,
      className,
      width,
      height,
      loading: "lazy"
    }
  ) });
}

export { BlurImages as B };
