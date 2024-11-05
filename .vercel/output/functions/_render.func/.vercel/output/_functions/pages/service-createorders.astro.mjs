/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_BgmmEVtV.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import React from 'react';
import { T as Toast } from '../chunks/ToastContainer_Bdby1Vkr.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
export { renderers } from '../renderers.mjs';

const cl = console.log.bind(console);
cl("Service create orders form component loaded");
const initialFormState = {
  clientname: "",
  clientdni: "",
  email: "",
  phone: "",
  deviceType: "",
  model: "",
  serial: "",
  phonedetails: "",
  issue: "",
  devicepassword: ""
};
const equipmentDetails = [
  { description: "Rayaduras en la carcaza" },
  { description: "Rayaduras en la pantalla" },
  { description: "Pantalla rota" },
  { description: "Pantalla presenta lineas de colores fijas verticales anormales" },
  { description: "Pantalla presenta lineas de colores fijas horizontales anormales" },
  { description: "Pantalla con marcas" },
  { description: "Pantalla astillada" },
  { description: "Pantalla cambiada" },
  { description: "Tapa trasera del equipo esta rota o astillada" },
  { description: "Equipo no toma señal de operadora" },
  { description: "Equipo no toma WiFi" },
  { description: "Equipo no toma carga" },
  { description: "Equipo no toma BlueTooth" },
  { description: "Golpes en los bordes" },
  { description: "Faltan boton Home" },
  { description: "Faltan boton Power" },
  { description: "Faltan botones de Volumen" },
  { description: "Boton de silencio no funciona" },
  { description: "Chip de la bateria sin funcionar o perdido" },
  { description: "Chip de la pantalla no reconocido o sin TrueTone" },
  { description: "Bateria cambiada" },
  { description: "Batería no esta en el equipo" },
  { description: "Bateria esta inchada" },
  { description: "Bateria esta gastada" },
  { description: "Bateria esta dañada" },
  { description: "Face ID no funciona" },
  { description: "Equipo Mojado" },
  { description: "Equipo se recibe parcialmente abierto" },
  { description: "Equipo se recibe abierto por bateria inchada" },
  { description: "Equipo ya ha sido revisado por otro servicio tecnico" },
  { description: "Equipo con fallas en el sistema operativo" },
  { description: "Bandeja SIM perdida" },
  { description: "Bandeja SIM rota" },
  { description: "Equipo enciende y se cuelga en la manzana" },
  { description: "Equipo no enciende" },
  { description: "Equipo se reinicia constantemente" },
  { description: "Equipo con numero de error" },
  { description: "Equipo vuelve por garantia" }
];
function CreateOrderForm() {
  const [formData, setFormData] = React.useState(initialFormState);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastType, setToastType] = React.useState("");
  const [toastPositionV, setToastPositionV] = React.useState("");
  const [toastPositionH, setToastPositionH] = React.useState("");
  const resetForm = () => {
    setFormData(initialFormState);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleMultipleSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => {
      const currentSelections = prevData.phonedetails.split(",").map((item) => item.trim()).filter(Boolean);
      const updateSelections = currentSelections.filter((item) => !selectedOptions.includes(item)).concat(selectedOptions.filter((item) => !currentSelections.includes(item)));
      return {
        ...formData,
        phonedetails: [...new Set(updateSelections)].join(", ")
      };
    });
  };
  cl(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage("Enviando Orden.....");
    setToastType("info");
    setToastPositionH("top");
    setToastPositionV("end");
    setShowToast(true);
    console.log("HandleSubmit function called", formData);
    try {
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      console.log("Response received:", response);
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok && data.success) {
        setToastMessage("Orden Creada Sastisfactoriamente");
        setToastType("success");
        resetForm();
      } else {
        setToastMessage("Error al crear la orden");
        setToastType("error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      setToastMessage("Error al crear la orden");
      setToastType("error");
    }
    setToastPositionH("top");
    setToastPositionV("end");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5e3);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen bg-blend-lighten", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-sweep animate-gradient-sweep text-light-text dark:text-dark-text p-8 rounded-lg dark:border dark:border-light-bg shadow-lg w-full max-w-4xl", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-center", children: "Hoja de Servicio Técnico" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "clientname", className: "labelinput-custom", children: "Nombre Cliente" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "clientname",
              id: "clientname",
              value: formData.clientname,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "clientdni",
              className: "labelinput-custom",
              children: "DNI"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "clientdni",
              id: "clientdni",
              value: formData.clientdni,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "email",
              className: "labelinput-custom",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              name: "email",
              id: "email",
              value: formData.email,
              onChange: handleChange,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "phone",
              className: "labelinput-custom",
              children: "Teléfono"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "phone",
              id: "phone",
              value: formData.phone,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "deviceType",
              className: "labelinput-custom",
              children: "Tipo de dispositivo"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "deviceType",
              id: "deviceType",
              value: formData.deviceType,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "model",
              className: "labelinput-custom",
              children: "Modelo del equipo"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "model",
              id: "model",
              value: formData.model,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "serial",
              className: "labelinput-custom",
              children: "Número de serie"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "serial",
              id: "serial",
              value: formData.serial,
              onChange: handleChange,
              className: "form-inputbox"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "devicepassword",
              className: "labelinput-custom",
              children: "Contraseña del dispositivo"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "devicepassword",
              id: "devicepassword",
              value: formData.devicepassword,
              onChange: handleChange,
              required: true,
              className: "form-inputbox"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "issue",
            className: "labelinput-custom",
            children: "Problemas"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "issue",
            id: "issue",
            value: formData.issue,
            onChange: handleChange,
            required: true,
            className: "textarea-custom",
            rows: "3"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 transition-all duration-300 hover:transform hover:scale-105", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "phonedetails",
            className: "labelinput-custom",
            children: "Detalles del equipo"
          }
        ),
        /* @__PURE__ */ jsx(
          "select",
          {
            name: "phonedetails",
            id: "phonedetails",
            value: formData.phonedetails.split(",").map((item) => item.trim()).filter(Boolean),
            onChange: handleMultipleSelect,
            required: true,
            className: "select-custom",
            multiple: true,
            children: equipmentDetails.map((detail, index) => /* @__PURE__ */ jsx(
              "option",
              {
                value: detail.description,
                children: detail.description
              },
              index
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-custom", children: "Crear Orden" }) })
    ] }),
    showToast && /* @__PURE__ */ jsx(
      Toast,
      {
        message: toastMessage,
        type: toastType,
        positionV: toastPositionV,
        positionH: toastPositionH,
        onClose: () => setShowToast(false)
      }
    )
  ] }) });
}

const $$ServiceCreateorders = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Creacion de Ordenes" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CreateOrderForm", CreateOrderForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/service-createorders-form", "client:component-export": "default" })}  ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-createorders.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-createorders.astro";
const $$url = "/service-createorders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ServiceCreateorders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
