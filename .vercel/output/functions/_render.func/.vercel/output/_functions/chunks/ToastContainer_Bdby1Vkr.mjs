import { jsx, jsxs } from 'react/jsx-runtime';

const Toast = ({ message, type, positionH, positionV, onClose }) => {
  return /* @__PURE__ */ jsx("div", { className: `toast toast-${positionV} toast-${positionH} z-10`, children: /* @__PURE__ */ jsxs("div", { className: `alert alert-${type} backdrop-opacity-10 backdrop-invert bg-transparent`, children: [
    /* @__PURE__ */ jsx("span", { className: "font-bold font-sans text-base text-lime-500/90", children: message }),
    /* @__PURE__ */ jsx("button", { className: "btn btn-ghost btn-sm", onClick: onClose, children: "Cerrar" })
  ] }) });
};

export { Toast as T };
