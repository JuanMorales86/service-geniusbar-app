/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C3fX89Zu.mjs';
import { G as GET } from '../chunks/getOrders_DGelRm1g.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { a as $$Icon, $ as $$Layout } from '../chunks/Layout_BIGIKqIB.mjs';
export { renderers } from '../renderers.mjs';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center items-center gap-x-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        className: "btn-pagination bg-arrow-left bg-no-repeat bg-center",
        children: /* @__PURE__ */ jsx("span", { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxs("span", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        className: "btn-pagination bg-arrow-right bg-no-repeat bg-center",
        children: /* @__PURE__ */ jsx("span", { className: "w-5 h-5" })
      }
    )
  ] });
};

const LoadingSpinerAtom = () => {
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-dark-input bg-opacity-95 z-50", children: [
    /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: 100, height: 100, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", className: "icon icon-tabler icons-tabler-outline icon-tabler-atom text-sky-600 animate-spin-fast", children: [
      /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M12 12v.01" }),
      /* @__PURE__ */ jsx("path", { d: "M19.071 4.929c-1.562 -1.562 -6 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 6 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9" }),
      /* @__PURE__ */ jsx("path", { d: "M4.929 4.929c-1.562 1.562 .337 6 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -6 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242" })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "font-sans text-dark-text text-customtext2", children: "Cargando..." }) })
  ] });
};

class PrintableOrder extends React.PureComponent {
  containeRef = React.createRef();
  render() {
    const { order } = this.props;
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { ref: this.containeRef, className: "printable-order-container font-apple text-black", children: [
      /* @__PURE__ */ jsx("div", { className: "page first-page", children: /* @__PURE__ */ jsxs("div", { className: "printable-order border-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-around items-center", children: [
          /* @__PURE__ */ jsx("picture", { children: /* @__PURE__ */ jsx("img", { src: "https://imgur.com/rrUbj7z.png", alt: "logo atomo", className: "block m-auto mb-5 max-w-32 h-auto" }) }),
          /* @__PURE__ */ jsxs("span", { className: "genius-bar-title text-center  mb-2 text-blk-gray-dark text-xl font-bold", children: [
            "Servicio Tecnico Especializado ",
            /* @__PURE__ */ jsx("br", {}),
            " Reparación y soporte Apple/Samsung ",
            /* @__PURE__ */ jsx("br", {}),
            "¡Soluciones rápidas y garantizadas!"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center text-2xl border-2 border-blk-gray-dark p-2 mb-6 mx-2 shadow-lg font-bold", children: "Orden Comprobante" }),
        /* @__PURE__ */ jsx("div", { className: "text-end text-md border-blk-gray-dark p-2 mb-2 font-semibold", children: "Buenos Aires, 02 de Octubre de 2024" }),
        /* @__PURE__ */ jsx("table", { className: "order-details ", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Numero de Orden:" }),
            /* @__PURE__ */ jsx("td", { children: order.ordernumber || "No Disponible" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Status:" }),
            /* @__PURE__ */ jsx("td", { children: order.status || "No Especificado" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Cliente:" }),
            /* @__PURE__ */ jsx("td", { children: order.clientname || "Anonimo" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Dni:" }),
            /* @__PURE__ */ jsx("td", { children: order.clientdni || "No Resgristrado" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Email:" }),
            /* @__PURE__ */ jsx("td", { children: order.email || "Vacio" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Telefono:" }),
            /* @__PURE__ */ jsx("td", { children: order.phone || "Vacio" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Modelo:" }),
            /* @__PURE__ */ jsx("td", { children: order.model || "No Informado" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Serial Equipo:" }),
            /* @__PURE__ */ jsx("td", { children: order.serial || "Vacio" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Detalles de Visuales del Equipo:" }),
            /* @__PURE__ */ jsx("td", { children: order.phonedetails || "Vacio" })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Problema:" }),
            /* @__PURE__ */ jsx("td", { children: order.issue || "No Especificado" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 left-10 right-10 text-right border-t-2 border-blk-gray-light text-blk-gray-dark pt-2", children: /* @__PURE__ */ jsxs("span", { children: [
          "Cordialmente:",
          /* @__PURE__ */ jsx("span", { className: "block text-blk-gray-dark font-bold", children: "Juan Morales" }),
          " "
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full  text-center text-lg font-semibold my-8", children: [
          /* @__PURE__ */ jsx("h1", { children: "Genius Bar" }),
          /* @__PURE__ */ jsx("p", { children: "Division Servicio Tecnologia" }),
          /* @__PURE__ */ jsx("p", { children: "Florida 537, PB, Loc. 366, CABA" }),
          /* @__PURE__ */ jsx("p", { children: "Lunes a Viernes: 10 a 19 hs, Sabados: 11 a 16 hs" }),
          /* @__PURE__ */ jsx("p", { children: "Telefono: +54-9-1123560959" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "page second-page border-2 border-blackEerie", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-center items-center", children: /* @__PURE__ */ jsx("picture", { children: /* @__PURE__ */ jsx("img", { src: "https://imgur.com/rrUbj7z.png", alt: "logo atomo", className: "block mt-2 max-w-32" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "order-legals text-base font-aux font-semibold text-black flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center mb-2", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-lg", children: "Términos y Condiciones" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-lg", children: "▶️ Por favor, leer la revisión de los términos y probar bien el equipo antes de su retiro de la tienda:" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col  text-justify", children: [
            /* @__PURE__ */ jsx("p", { children: "•	Los diagnósticos internos pueden variar y se hacen entre 24 y 48 horas sin embargo pueden durar hasta 96 horas “hábiles”." }),
            /* @__PURE__ */ jsx("p", { children: "•	Los equipos y componentes se consideran sin funcionamiento hasta ser diagnosticados en nuestro laboratorio." }),
            /* @__PURE__ */ jsx("p", { children: "•	TODO TRABAJO EN PLACA corre el riesgo de perder funcionalidades o en su defecto de que no encienda más." }),
            /* @__PURE__ */ jsx("p", { children: "•	Todo equipo humedecido o mojado podrá presentar fallas progresivas inclusive luego de ser reparado." }),
            /* @__PURE__ */ jsx("p", { children: "•	Cambio de Pantallas y Baterías (garantía de 90 días), cumpliendo con los términos y condiciones." }),
            /* @__PURE__ */ jsx("p", { children: "•	GARANTIA: LA GARANTIA COMIENZA A SER EFECTIVA DESDE EL MOMENTO EN EL QUE SE LE NOTIFICA AL CLIENTE. Para que sea válida se debe de presentar la factura u orden, el equipo se recibirá para ser diagnosticado y verificar la falla, el equipo no puede presentar (caídas, golpes o ralladuras, humedad o agua), (exceso de calor sobre la placa), (haber sido abierto por otro servicio técnico), (NO pueden haber sido violados los sellos de seguridad), la garantía solo ampara la zona o componentes reparados, GENIUS BAR no se hace responsable de desperfectos por alteraciones ó actualizaciones a nivel de software. La garantía tiene una duración de 30 a 90 días (de acuerdo a la reparación realizada) " }),
            /* @__PURE__ */ jsx("p", { children: "•	GARANTIA DE CAMBIO DE PANTALLAS: Por ningún motivo será válida la garantía si está partido el táctil ó display, mojado o humedecido o fractura interna por mala manipulación. " }),
            /* @__PURE__ */ jsx("p", { children: "•	Al pasar 90 días luego de ser reparado, el equipo se considera abandonado, en este caso GENIUS BAR, obtendrá el dominio del equipo y dispondrá del mismo perdiendo el cliente todo el derecho a reclamo sobre él (código civil, art.2525/2526)." }),
            /* @__PURE__ */ jsx("p", { children: "•	No nos hacemos responsables si el IMEI del equipo queda bloqueado por ENACOM en el tiempo que permanezca en nuestro laboratorio, “LA RESPONSABILIDAD LEGAL DEL EQUIPO POR ESTATUS DUDOSOS (POR EJEMPLO, ROBO Ó EXTRAVIO) ES TOTALMENTE DEL CLIENTE QUE LE DA INGRESO AL MISMO EN NUESTRO LOCAL”." })
          ] })
        ] })
      ] })
    ] }) });
  }
}

const cl = console.log.bind(console);
class OrdersShowCase extends Component {
  state = {
    ordersData: null,
    isLoading: true,
    error: null,
    editingOrderId: null,
    editFormData: null
  };
  //componentRef: React.RefObject<HTMLDivElement> = React.createRef();
  componentRef = React.createRef();
  handleDelete = async (orderId) => {
    if (confirm("Estas seguro de querer borrar la orden?")) {
      try {
        const response = await fetch("api/deleteOrders", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: orderId })
        });
        if (response.ok) {
          this.setState((prevState) => ({
            ordersData: prevState.ordersData ? {
              ...prevState.ordersData,
              ordenes: prevState.ordersData.ordenes.filter((order) => order.id !== orderId)
            } : null
          }));
        } else {
          throw new Error("Error al borrar la orden");
        }
      } catch (error) {
        console.error("Error borrando la orden:", error);
      }
    }
  };
  handleEdit = (order) => {
    cl("orden editando:", order);
    this.setState({
      editingOrderId: order.id,
      editFormData: {
        ...order,
        aditionalObservation: order.aditionalObservation || "",
        donerepairments: order.donerepairments || "",
        topay: order.topay || 0,
        payed: order.payed || 0
      }
    });
  };
  handleEditChange = (e) => {
    const { name, value } = e.target;
    cl("edit change:", name, value);
    this.setState((prevState) => ({
      editFormData: prevState.editFormData ? {
        ...prevState.editFormData,
        [name]: value
      } : { [name]: value }
    }));
  };
  handleEditSubmit = async (e) => {
    e.preventDefault();
    cl("summiting edit:", this.state.editFormData);
    const response = await fetch("api/getOrders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.editFormData)
    });
    if (response.ok) {
      const updatedOrder = await response.json();
      cl("updated Order:", updatedOrder);
      this.setState((prevState) => ({
        ordersData: prevState.ordersData ? {
          ...prevState.ordersData,
          ordenes: prevState.ordersData.ordenes.map((order) => order.id === updatedOrder.id ? updatedOrder : order)
        } : null,
        editingOrderId: null,
        //Resetaer el estado editingOrderId
        editFormData: null
        // Borrar form data
      }));
    }
  };
  componentDidMount() {
    this.fetchOrders();
  }
  async fetchOrders(page = 1) {
    try {
      const response = await fetch(`api/getOrders?pagina=${page}`);
      if (!response.ok) {
        throw new Error("Fallo al cargar las ordenes");
      }
      const data = await response.json();
      this.setState({ ordersData: data, isLoading: false });
    } catch (err) {
      if (err instanceof Error) {
        this.setState({ error: err.message, isLoading: false });
      }
    }
  }
  changePage = (newPage) => {
    if (this.state.ordersData && newPage >= 1 && newPage <= this.state.ordersData.totalPages) {
      this.fetchOrders(newPage);
    }
  };
  render() {
    const { ordersData, isLoading, error, editFormData, editingOrderId } = this.state;
    if (isLoading) {
      return /* @__PURE__ */ jsx(LoadingSpinerAtom, {});
    }
    if (error) {
      return /* @__PURE__ */ jsxs("div", { children: [
        "Error: ",
        error
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Orders" }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-row flex-wrap", children: ordersData?.ordenes.map((order) => /* @__PURE__ */ jsxs("li", { className: " border p-4 mb-2 rounded-md shadow-md", children: [
        /* @__PURE__ */ jsxs("h3", { children: [
          "Numero de Orden: ",
          order.ordernumber
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Status: ",
          order.status
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "ID: ",
          order.id
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Cliente: ",
          order.clientname
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Dni: ",
          order.clientdni
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Email: ",
          order.email
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Telefono: ",
          order.phone
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Tipo de Dispositivo: ",
          order.deviceType
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Modelo: ",
          order.model
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Serial Equipo: ",
          order.serial || "Vacio"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Detalles del Telefono: ",
          order.phonedetails
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Contraseña del Dispositivo: ",
          order.devicepassword
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Problema: ",
          order.issue
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Fecha de Creacion: ",
          order.createdAt || 0
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Fecha de Actualizacion: ",
          order.updatedAt || 0
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Observaciones Adicionales: ",
          order.aditionalObservation
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Reparaciones Realizadas: ",
          order.donerepairments
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Por pagar: ",
          order.topay || "0.00"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Pagado: ",
          order.payed || "0.00"
        ] }),
        editingOrderId === order.id ? /* @__PURE__ */ jsxs("form", { className: "flex flex-row flex-wrap gap-2 justify-around", onSubmit: this.handleEditSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full sm:w-full md:w-full lg:w-full mb-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "status", className: "labelinput-custom", children: "Status:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "status",
                id: "clientname",
                value: editFormData.status,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "clientname", className: "labelinput-custom", children: "Cliente:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "clientname",
                id: "clientname",
                value: editFormData.clientname,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "clientdni", className: "labelinput-custom", children: "Dni:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "clientdni",
                id: "clientdni",
                value: editFormData.clientdni,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "labelinput-custom", children: "Email:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "email",
                id: "email",
                value: editFormData.email,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "labelinput-custom", children: "Telefono:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "phone",
                id: "phone",
                value: editFormData.phone,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "deviceType", className: "labelinput-custom", children: "Tipo de Dispositivo:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "deviceType",
                id: "deviceType",
                value: editFormData.deviceType,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "model", className: "labelinput-custom", children: "Modelo:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "model",
                id: "model",
                value: editFormData.model,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "serial", className: "labelinput-custom", children: "Serial:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "serial",
                id: "serial",
                value: editFormData.serial,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "phonedetails", className: "labelinput-custom", children: "Detalles Telefono:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "phonedetails",
                id: "phonedetails",
                value: editFormData.phonedetails,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "devicepassword", className: "labelinput-custom", children: "Clave Equipo:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "devicepassword",
                id: "devicepassword",
                value: editFormData.devicepassword,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "issue", className: "labelinput-custom", children: "Problema:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "issue",
                id: "issue",
                value: editFormData.issue,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "aditionalObservation", className: "labelinput-custom", children: "Observaciones Adicionales:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "aditionalObservation",
                id: "aditionalObservation",
                value: editFormData.aditionalObservation,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "donerepairments", className: "labelinput-custom", children: "Reparaciones Hechas:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "donerepairments",
                id: "donerepairments",
                value: editFormData.donerepairments,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "topay", className: "labelinput-custom", children: "A Pagar:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "topay",
                id: "topay",
                value: editFormData.topay,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "payed", className: "labelinput-custom", children: "Pagado:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "payed",
                id: "payed",
                value: editFormData.payed,
                onChange: this.handleEditChange,
                className: "form-inputbox"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { className: "btn-custom", type: "submit", children: "Guardar" })
        ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center mt-4", children: /* @__PURE__ */ jsx("button", { className: "btn-custom", onClick: () => this.handleEdit(order), children: "Editar" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center mt-4", children: /* @__PURE__ */ jsx("button", { className: "btn-custom", onClick: () => this.handleDelete(order.id), children: "Eliminar" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center mt-4", children: /* @__PURE__ */ jsx(
          ReactToPrint,
          {
            trigger: () => /* @__PURE__ */ jsx("button", { className: "btn-custom", children: "Imprimir Orden" }),
            content: () => this.componentRef.current
          }
        ) }),
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: /* @__PURE__ */ jsx(PrintableOrder, { order }) })
      ] }, order.id)) }),
      ordersData && /* @__PURE__ */ jsx(
        Pagination,
        {
          currentPage: ordersData.actualPage,
          totalPages: ordersData.totalPages,
          onPageChange: this.changePage
        }
      )
    ] });
  }
}

const $$MyLoadingIcon = createComponent(async ($$result, $$props, $$slots) => {
  const orders = await GET;
  console.log(orders);
  if (orders.length < 1) {
    setTimeout(() => {
      window.location.href = "/home";
    }, 3e3);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "spiner" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-100 z-50"> <div class="flex flex-col items-center justify-center"> ${renderComponent($$result2, "Icon", $$Icon, { "size": 50, "class": " text-sky-600 custom:text-4xl text-5xl animate-spin-slow hover:animate-none origin-center drop-shadow-xl", "name": "lucide:atom", "title": "logo de carga atomo...." })} <span class="custom:text-2xl">Cargando...</span> </div> </div> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/MyLoadingIcon.astro", void 0);

const $$OrdershowPage = createComponent(($$result, $$props, $$slots) => {
  const orders = GET;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lista de Ordenes \u{1F4F1}" }, { "default": ($$result2) => renderTemplate`${orders.length > 0 ? renderTemplate`${renderComponent($$result2, "OrdersShowCase", OrdersShowCase, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/OrdersShowCase", "client:component-export": "default" })}` : renderTemplate`${renderComponent($$result2, "MyLoadingIcon", $$MyLoadingIcon, {})}`}` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/ordershow-page.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/ordershow-page.astro";
const $$url = "/ordershow-page";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OrdershowPage,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
