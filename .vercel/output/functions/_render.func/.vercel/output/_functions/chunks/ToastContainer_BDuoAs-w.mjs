import { jsx, jsxs } from 'react/jsx-runtime';

const Toast = ({ message, type, positionH, positionV, onClose, color }) => {
  return /* @__PURE__ */ jsx("div", { className: `toast toast-${positionV} toast-${positionH} z-10 transition-all duration-100 ease-in-out`, children: /* @__PURE__ */ jsxs("div", { className: `alert alert-${type} backdrop-opacity-10 backdrop-invert bg-transparent`, children: [
    /* @__PURE__ */ jsx("span", { className: `font-bold font-sans text-base ${color || "text-lime-500/90"}`, children: message }),
    /* @__PURE__ */ jsx("button", { className: "btn btn-ghost btn-sm", onClick: onClose, children: "Cerrar" })
  ] }) });
};

export { Toast as T };
