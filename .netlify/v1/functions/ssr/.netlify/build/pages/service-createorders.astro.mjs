/* empty css                                     */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_Ci2NsHh-.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import React__default from 'react';
import { T as Toast } from '../chunks/ToastContainer_BNDuhfT2.mjs';
import { $ as $$Layout } from '../chunks/Layout_O39vwCA1.mjs';
export { renderers } from '../renderers.mjs';

const CustomMultiSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = React__default.useState(false);
  const [selectedOptions, setSelectedOptions] = React__default.useState(value);
  React__default.useEffect(() => {
    setSelectedOptions(value);
  }, [value]);
  const toggleOption = (option) => {
    const updatedSelection = selectedOptions.includes(option) ? selectedOptions.filter((item) => item !== option) : [...selectedOptions, option];
    setSelectedOptions(updatedSelection);
    onChange(updatedSelection.join(", "));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container-create-multi-select ", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "phonedetails", className: "labelinput-custom", children: "Detalles del equipo" }),
    /* @__PURE__ */ jsxs("div", { className: `custom-multi-select ${isOpen ? "open" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "select-header", onClick: () => setIsOpen(!isOpen), children: selectedOptions.length > 0 ? selectedOptions.join(", ") : "Seleccionar opciones" }),
      isOpen && /* @__PURE__ */ jsx("div", { className: "options-container rounded-b-md", children: options.map((detail, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `option ${selectedOptions.includes(detail.description) ? "bg-sky-700" : ""}`,
          onClick: () => toggleOption(detail.description),
          children: detail.description
        },
        index
      )) })
    ] })
  ] });
};

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
  { description: "No muestra imagen" },
  { description: "Enciende pero no muestra video o imagen" },
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
  { description: "Faltan botones en las teclas" },
  { description: "Boton de silencio no funciona" },
  { description: "Chip de la bateria sin funcionar o perdido" },
  { description: "Chip de la pantalla no reconocido o sin TrueTone" },
  { description: "Bateria cambiada" },
  { description: "Batería no esta en el equipo" },
  { description: "Bateria esta inchada" },
  { description: "Bateria esta gastada" },
  { description: "Bateria esta dañada" },
  { description: "Face ID no funciona" },
  { description: "Placa madre en corto" },
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
  { description: "Equipo vuelve por garantia" },
  { description: "Otros detalles" }
];
function CreateOrderForm() {
  const [formData, setFormData] = React__default.useState(initialFormState);
  const [showToast, setShowToast] = React__default.useState(false);
  const [toastMessage, setToastMessage] = React__default.useState("");
  const [toastType, setToastType] = React__default.useState("");
  const [colorToast, setColorToast] = React__default.useState("text-lime-500/90");
  const [toastPositionV, setToastPositionV] = React__default.useState("");
  const [toastPositionH, setToastPositionH] = React__default.useState("");
  const [emailStatus, setEmailStatus] = React__default.useState({
    isValid: true,
    isChecking: false,
    wasChecked: false
  });
  let timeoutId;
  const resetForm = () => {
    setFormData(initialFormState);
    setEmailStatus({
      isValid: true,
      isChecking: false,
      wasChecked: false
    });
  };
  const verifyEmail = async (email) => {
    setEmailStatus((prev) => ({ ...prev, isChecking: true }));
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      ;
      setEmailStatus({
        isValid: data.isValid,
        isChecking: false,
        wasChecked: true
      });
      if (!data.isValid && !emailStatus.isChecking) {
        setTimeout(() => {
          setToastMessage("Email no válido o dominino inexistente ");
          setToastType("error");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2e3);
        }, 1e3);
      }
    } catch (error) {
      console.error("Error varificando el email:", error);
      setEmailStatus({
        isValid: false,
        isChecking: false,
        wasChecked: true
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email" && value) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => verifyEmail(value), 1e3);
    }
  };
  const navigateTo = () => {
    window.location.href = "/ordershow-page";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage("Enviando Orden.....");
    setToastType("info");
    setToastPositionH("top");
    setToastPositionV("end");
    setShowToast(true);
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
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen bg-blend-lighten", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-sweep animate-gradient-sweep text-mainbrand-light dark:text-mainbrand-light p-8 rounded-lg dark:border dark:border-light-bg shadow-lg w-full max-w-4xl", children: [
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
              placeholder: "Carlos",
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
              minLength: 8,
              placeholder: "29115230",
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
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                id: "email",
                value: formData.email,
                onChange: handleChange,
                placeholder: "cliente@mail.com",
                className: `form-inputbox ${emailStatus.wasChecked && !emailStatus.isValid ? "border-redCrayola" : ""}
                ${emailStatus.wasChecked && emailStatus.isValid ? "border-lime-500" : ""}`
              }
            ),
            emailStatus.isChecking && /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-1/2 -translate-y-1/2 text-sky-500 text-sm animate-pulse", children: "Verificando email..." }),
            emailStatus.wasChecked && !emailStatus.isChecking && /* @__PURE__ */ jsx("span", { className: `asolute right-2 top-1/2 -translate-y-1/2 ${emailStatus.isValid ? "text-lime-500" : "text-redCrayola"}`, children: emailStatus.isValid ? "🆗" : "❌" })
          ] })
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
              minLength: 10,
              placeholder: "1130561068",
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
              placeholder: "Celular/Laptop/Otro",
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
              placeholder: "Iphone 15",
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
              placeholder: "A1708",
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
              placeholder: "123456",
              minLength: 4,
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
            placeholder: "Descripcion del caso",
            className: "textarea-custom",
            rows: "3"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        CustomMultiSelect,
        {
          options: equipmentDetails,
          value: formData.phonedetails ? formData.phonedetails.split(",").map((item) => item.trim()).filter(Boolean) : [],
          onChange: (selectedOptions) => {
            setFormData((prevData) => ({
              ...prevData,
              phonedetails: selectedOptions
            }));
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-custom-orders", children: "Crear Orden" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          resetForm(), setToastMessage("Fomluario Borrado");
          setToastPositionH("middle");
          setToastPositionV("bottom");
          setShowToast(true);
          setToastType("warning");
          setTimeout(() => setShowToast(false), 5e3);
          setColorToast("text-redCrayola");
        }, className: "btn-custom-orders", children: "Borrar Formulario" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("button", { onClick: navigateTo, className: "btn-custom-orders", children: "Mostrar Ordenes" }) })
    ] }),
    showToast && /* @__PURE__ */ jsx(
      Toast,
      {
        message: toastMessage,
        type: toastType,
        positionV: toastPositionV,
        positionH: toastPositionH,
        color: colorToast,
        onClose: () => setShowToast(false)
      }
    )
  ] }) });
}

const $$Astro = createAstro();
const $$ServiceCreateorders = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceCreateorders;
  if (!Astro2.locals.user) {
    return Astro2.redirect("/odershow-page");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ordernes de Servicios \u{1F9D1}\u200D\u{1F4BB}", "showWhatsAppButton": false }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CreateOrderForm", CreateOrderForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/service-createorders-form", "client:component-export": "default" })} ` })}`;
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
