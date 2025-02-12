// src/components/service-createorders-form.jsx
import React from "react";
import {Toast} from "./ToastContainer";
import CustomMultiSelect from "./CreateMultiSelect";

const cl = console.log.bind(console)
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
  devicepassword: "",
};



const equipmentDetails = [
  {description:'Rayaduras en la carcaza'},
  {description:'Rayaduras en la pantalla'},
  {description:'No muestra imagen'},
  {description:'Enciende pero no muestra video o imagen'},
  {description:'Pantalla rota'},
  {description:'Pantalla presenta lineas de colores fijas verticales anormales'},
  {description:'Pantalla presenta lineas de colores fijas horizontales anormales'},
  {description:'Pantalla con marcas'},
  {description:'Pantalla astillada'},
  {description:'Pantalla cambiada'},
  {description:'Tapa trasera del equipo esta rota o astillada'},
  {description:'Equipo no toma señal de operadora'},
  {description:'Equipo no toma WiFi'},
  {description:'Equipo no toma carga'},
  {description:'Equipo no toma BlueTooth'},
  {description:'Golpes en los bordes'},
  {description:'Faltan boton Home'},
  {description:'Faltan boton Power'},
  {description:'Faltan botones de Volumen'},
  {description:'Faltan botones en las teclas'},
  {description:'Boton de silencio no funciona'},
  {description:'Chip de la bateria sin funcionar o perdido'},
  {description:'Chip de la pantalla no reconocido o sin TrueTone'},
  {description:'Bateria cambiada'},
  {description:'Batería no esta en el equipo'},
  {description:'Bateria esta inchada'},
  {description:'Bateria esta gastada'},
  {description:'Bateria esta dañada'},
  {description:'Face ID no funciona'},
  {description:'Placa madre en corto'},
  {description:'Equipo Mojado'},
  {description:'Equipo se recibe parcialmente abierto'},
  {description:'Equipo se recibe abierto por bateria inchada'},
  {description:'Equipo ya ha sido revisado por otro servicio tecnico'},
  {description:'Equipo con fallas en el sistema operativo'},
  {description:'Bandeja SIM perdida'},
  {description:'Bandeja SIM rota'},
  {description:'Equipo enciende y se cuelga en la manzana'},
  {description:'Equipo no enciende'},
  {description:'Equipo se reinicia constantemente'},
  {description:'Equipo con numero de error'},
  {description:'Equipo vuelve por garantia'},
  {description:'Otros detalles'},
]

export default function CreateOrderForm() {
  const [formData, setFormData] = React.useState(initialFormState);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastType, setToastType] = React.useState("");
  const [colorToast, setColorToast] = React.useState("text-lime-500/90");
  const [toastPositionV, setToastPositionV] = React.useState("");
  const [toastPositionH, setToastPositionH] = React.useState("");
  const [emailStatus, setEmailStatus] = React.useState({
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
    setEmailStatus(prev => ({ ...prev, isChecking: true }));
    try {
      const response = await fetch('/api/verify-email',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();;
      
      setEmailStatus({
        isValid: data.isValid,
        isChecking: false,
        wasChecked: true
      });

      if(!data.isValid && !emailStatus.isChecking){
        setTimeout(() => {
          setToastMessage('Email no válido o dominino inexistente ')
          setToastType('error');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        }, 1000);
      }
    } catch(error){
      console.error('Error varificando el email:', error);
      setEmailStatus({
        isValid: false,
        isChecking: false,
        wasChecked: true
      });
    }
    //setIsCheckingEmail(false);
  }

    // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });

    if(name === 'email' && value){
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => verifyEmail(value), 1000);
    }
  };

  

  // const handleMultipleSelect = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setFormData(prevData => { 
  //     const currentSelections = prevData.phonedetails.split(',').map(item => item.trim()).filter(Boolean);
  //     const updateSelections = selectedOptions.length === 0 ? [] : currentSelections.filter(item => !selectedOptions.includes(item)).concat(selectedOptions.filter(item => !currentSelections.includes(item)));
  //     return {
  //       ...formData, 
  //       phonedetails: [...new Set(updateSelections)].join(', ')
  //     };
  //   });
  // };

  const navigateTo = () => {
    window.location.href = '/ordershow-page';
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setToastMessage("Enviando Orden.....");
    setToastType("info");
    setToastPositionH("top");
    setToastPositionV("end");
    setShowToast(true);

    // console.log("HandleSubmit function called", formData);

    try {
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blend-lighten">
      <div className="bg-gradient-sweep animate-gradient-sweep text-mainbrand-light dark:text-mainbrand-light p-8 rounded-lg dark:border dark:border-light-bg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hoja de Servicio Técnico
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label htmlFor="clientname" className="labelinput-custom">
                Nombre Cliente
              </label>
              <input
                type="text"
                name="clientname"
                id="clientname"
                value={formData.clientname}
                onChange={handleChange}
                required
                placeholder="Carlos"
                className="form-inputbox"
              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="clientdni"
                className="labelinput-custom"
              >
                DNI
              </label>
              <input
                type="text"
                name="clientdni"
                id="clientdni"
                value={formData.clientdni}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="29115230"
                className="form-inputbox"
              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="email"
                className="labelinput-custom"
              >
                Email
              </label>
              <div className="relative">

              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="cliente@mail.com"
                className={`form-inputbox ${emailStatus.wasChecked && !emailStatus.isValid ? 'border-redCrayola' : ''}
                ${emailStatus.wasChecked && emailStatus.isValid ? 'border-lime-500' : ''}`}
              />
              {emailStatus.isChecking && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sky-500 text-sm animate-pulse">
                Verificando email...
                </span>
                )}
                {emailStatus.wasChecked && !emailStatus.isChecking && (
                <span className={`asolute right-2 top-1/2 -translate-y-1/2 ${emailStatus.isValid ? 'text-lime-500' : 'text-redCrayola'}`}>
                  {emailStatus.isValid ? '🆗' : '❌'}
                </span>
              )}
              </div>
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="phone"
                className="labelinput-custom"
              >
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={10}
                placeholder="1130561068"
                className="form-inputbox"
              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="deviceType"
                className="labelinput-custom"
              >
                Tipo de dispositivo
              </label>
              <input
                type="text"
                name="deviceType"
                id="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                required
                placeholder="Celular/Laptop/Otro"
                className="form-inputbox"
              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="model"
                className="labelinput-custom"
              >
                Modelo del equipo
              </label>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Iphone 15"
                value={formData.model}
                onChange={handleChange}
                required
                /**
                 * Applies a set of styles to an input element to create a consistent and visually appealing form input.
                 * The styles include rounded corners, a gray border, a drop shadow, and a blue-themed focus state.
                 */
                className="form-inputbox"

              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="serial"
                className="labelinput-custom"
              >
                Número de serie
              </label>
              <input
                type="text"
                name="serial"
                id="serial"
                value={formData.serial}
                onChange={handleChange}
                placeholder="A1708"
                className="form-inputbox"
              />
            </div>
            <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
              <label
                htmlFor="devicepassword"
                className="labelinput-custom"
              >
                Contraseña del dispositivo
              </label>
              <input
                type="password"
                name="devicepassword"
                id="devicepassword"
                value={formData.devicepassword}
                onChange={handleChange}
                required
                placeholder="123456"
                minLength={4}
                className="form-inputbox"
              />
            </div>
          </div>
          <div className="space-y-2 transition-all duration-300 hover:transform hover:scale-105">
            <label
              htmlFor="issue"
              className="labelinput-custom"
            >
              Problemas
            </label>
            <textarea
              name="issue"
              id="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              placeholder="Descripcion del caso"
              className="textarea-custom"
              rows="3"
            />
          </div>
        
          <CustomMultiSelect 
            options={equipmentDetails}
            value={formData.phonedetails ? formData.phonedetails.split(',').map(item => item.trim()).filter(Boolean) : []}
            onChange={(selectedOptions) => {
              setFormData(prevData => ({
                ...prevData,
                phonedetails: selectedOptions
              }));
            }}
            />

          <div className="flex justify-center gap-4">
            <button type="submit" className="btn-custom-orders">
              Crear Orden
            </button>
            <button type="button" onClick={() => {
              resetForm(), 
              setToastMessage("Fomluario Borrado");
              setToastPositionH('middle');
              setToastPositionV('bottom');
              setShowToast(true);
              setToastType('warning')
              setTimeout(() => setShowToast(false), 5000);
              setColorToast('text-redCrayola')
              }} className="btn-custom-orders">
              Borrar Formulario
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={navigateTo} className="btn-custom-orders">
              Mostrar Ordenes
            </button>
          </div>
        </form>
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            positionV={toastPositionV}
            positionH={toastPositionH}
            color={colorToast}
            onClose={() => setShowToast(false)}
            
          />
        )}
      </div>
    </div>
  );
}

  