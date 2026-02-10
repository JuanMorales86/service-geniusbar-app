import {useState} from "react";
// import {useForm} from 'react-hook-form'
import {Toast, useToast} from "./ToastContainer";
import {
    imagesHelpers,
    devicetype,
    iphonesModels,
    deviceMacB,
    macbookModels,
    macbookAirModels,
    macbookProModels,
    deviceIPad,
    ipadsModels,
    ipadsPro,
    ipadsAir,
    ipadsMini,
    deviceWatch
} from "@/data/layout/serviceOptions";

export default function FormServices({})  {
    // const [render, setRender] = useState(false)
    const [nombre, setNombre] = useState('')
    const [modelo, setModelo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [email, setEmail] = useState('')
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('Ninguna escogida')//state capturar tipo de servicio principal
    const [opcionDispositivo, setOpcionDispositivo] = useState('Ninguna escogida')//state capturar tipo de dispositivo
    const [opcionMacbook, setOpcionMacbook] = useState('Ninguna escogida')//state tipo de macbook
    const [selectedMacbook, setSelectedMacbook] = useState('Ninguna escogida')//state modelo de macbook

    const [opcionIpad, setOpcionIpad] = useState('Ninguna escogida')//state tipo de Ipads
    const [selectedIpad, setSelectedIpad] = useState('Ninguna escogida')//state modelo de Ipads

    const [opcionWatch, setOpcionWatch] = useState('Ninguno escogido')//state modelos apple watch

    const [selectedOptionsD, setSelectedOptionsD] = useState('')//state captura texto del tipo de servicio principal
    const [selectedOptionsT, setSelectedOptionsT] = useState('')//state captura texto del tipo de dispositivo
    
    const { toast, showToast, closeToast } = useToast();
    const [isSubmit, setIsSubmit] = useState(false)// Estado para controlar el boton de envio
    const [currentImageIndex, setCurrentImageIndex] = useState(0)// Estado para correr las imagenes helpers

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true)//Deshabilitar el boton de envio

        showToast('Enviando consulta.....', { type: 'info', positionH: 'end', positionV: 'top' });

        const formData = new FormData();//estoy creando un objeto de tipo FormData para enviar los datos del formulario al servidor. FormData es una clase nativa de JavaScript que se utiliza para representar los datos de formulario en formato de clave-valor.
        formData.append('nombre', nombre);//append donde se agrega un par clave-valor al objeto FormData.
        formData.append('modelo', modelo);
        formData.append('telefono', telefono);
        formData.append('email', email);
        formData.append('mensaje', mensaje);
        if (opcionSeleccionada != "Ninguna escogida") {
            formData.append('opcionSeleccionada', selectedOptionsT);
            formData.append('opcionDispositivo', selectedOptionsD);
        } else {
            formData.append('opcion', "5");
            formData.append('opcionSeleccionada', "Ninguna escogida");
            formData.append('opcionDispositivo', "Ninguna escogida");
        }
        try { 
            
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                if(result.success){
                    showToast('Consulta enviada con exito', { type: 'success', positionH: 'end', positionV: 'top' });
                    resetForm()
                } else {
                    showToast('Error al enviar la Consulta', { type: 'error', positionH: 'end', positionV: 'top' });
                }
              
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
             
                //Manejar errores 
            } 
        } catch (error) {
                console.error('Error al enviar el formulario', error);
                showToast('Error al enviar el formulario', { type: 'error', positionH: 'center', positionV: 'top' });
             
        } finally {
            setIsSubmit(false)//habilitar el boton de envio
        }
    };



    /* se encarga de manejar el cambio de la opción principal (opcionSeleccionada). Esta función también restablece los estados de los selects dependientes, se activa e el oChange del select correspondiente */
    const handleOpcionSeleccionadaChange = (e) => {
        const selectedOptionT = e.target.options[e.target.selectedIndex]
        setSelectedOptionsT(selectedOptionT.text)
        setOpcionSeleccionada(selectedOptionT.value)

        //Restablecer estados dependientes
        setOpcionDispositivo('Ninguna escogida')
        setOpcionMacbook('Ninguna escogida')
        setSelectedMacbook('Ninguna escoggida')
        setOpcionIpad('Ninguno escogido')
        setSelectedIpad('Ninguno escogido')
        setOpcionWatch('Ningua escogida')
        setSelectedOptionsD('')
    }

    const resetForm = () => {
        setNombre('');
        setModelo('');
        setTelefono('');
        setMensaje('');
        setEmail('');
        setOpcionSeleccionada('Ninguna escogida');
        setOpcionDispositivo('Ninguna escogida');
        setOpcionMacbook('Ninguna escogida');
        setSelectedMacbook('Ninguna escogida');
        setOpcionIpad('Ninguno escogido');
        setSelectedIpad('Ninguno escogido');
        setOpcionWatch('Ninguna escogida')
        setSelectedOptionsD('');
        setSelectedOptionsT('');
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesHelpers.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imagesHelpers.length - 1 ? 0 : prevIndex + 1));

    };
    return (
        <div className="flex items-center justify-center py-8 mx-auto rounded-lg w-4/6 sm:w-4/6 md:w-3/6 lg:w-3/6 border-accent-dark border-2 border-solid shadow-sm dark:border bg-light-bg dark:bg-dark-bg dark:border-black">
        <form className="flex flex-col gap-3 w-full px-4 sm:px-6" onSubmit={handleSubmit}>
            <div className="w-full flex  justify-center">
                <h2 className=" mb-4 text-2xl font-bold text-gray-900 dark:text-white">Formulario de Consultas</h2>
            </div>
            <div className='mb-2'>
                <label htmlFor="nombre" className="labelinput-custom">Nombre:</label>
                
                <input type="text" 
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Nombre"
                className="form-inputbox"
                />
            </div>
          
            <div className='mb-2'>
                <label className="labelinput-custom" htmlFor="telefono">Telefono:</label>
                <input type="text"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                placeholder="(+54) 9 xx-xxxxxxxx"
                className="form-inputbox"
                />
            </div>
            <div className='mb-2'>
                <label className="labelinput-custom" htmlFor="email">Email:</label>
                <input type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@hotmail.com"
                className="form-inputbox"
                />
            </div>
        
            <div className='mb-2'>
                <label className="labelinput-custom" htmlFor="opcion">De que tipo de servicio es la consulta?</label>
                <select
                id="opcion"
                value={opcionSeleccionada}
                onChange={handleOpcionSeleccionadaChange}
                className="form-inputbox text-center"
                >
                <optgroup label="Seleccione un tipo de reparación">
                    {
                        devicetype.map((device) => {
                            return (
                                <option key={device.value} value={device.value}>{device.label}</option>
                            )
                        })
                    }
                </optgroup>
               
                </select>
            </div>
            {
                opcionSeleccionada === "1" && (
                    <div className='mb-2 text-center'>
                        <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué modelo de Iphone desea consultar?</label>
                        <select
                        id="opcionDispositivo"
                        
                        value={opcionDispositivo}
                        onChange={(e) => {
                        const selectedOptionD = e.target.options[e.target.selectedIndex]
                        setSelectedOptionsD(selectedOptionD.text)
                        setOpcionDispositivo(selectedOptionD.value)}}
                        className="form-inputbox text-center"
                        >
                        <optgroup label="Seleccione un Servicio">
                            {
                                iphonesModels.map((model) => {
                                    return (
                                        <option value={model.value} key={model.value}>{model.label}</option>
                                    )
                                })
                            }
                        </optgroup>
                        </select>
                    </div>
                )
            }
            {
                opcionSeleccionada === '2' && (
                    <div className='mb-2 text-center'>
                        <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Macbook desea consultar?</label>
                        <select
                        id="opcionDispositivo"
                        
                        value={opcionMacbook}
                        onChange={(e) => {
                        const selectedOptionM = e.target.options[e.target.selectedIndex]
                        // setSelectedOptionsD(selectedOptionD.text)
                        setOpcionMacbook(selectedOptionM.value)}}
                        className="form-inputbox text-center p-"
                        >
                        <optgroup label="Seleccione un Servicio">
                            {
                                deviceMacB.map((model) => {
                                    return (
                                        <option value={model.value} key={model.value}>{model.label}</option>
                                    )
                                })
                            }
                        </optgroup>
                        </select>
                    </div>
                )
            }
            {
                opcionMacbook === 'A' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Macbook desea consultar?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedMacbook}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedMacbook(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            macbookAirModels.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
            {
                opcionMacbook === 'B' && (
                    <div className='mb-2 text-center black'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Macbook desea consultar?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedMacbook}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedMacbook(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            macbookProModels.map((model) => {
                                return (
                                    <option className="text-center" value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
             {
                opcionMacbook === 'C' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Macbook desea consultar?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedMacbook}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedMacbook(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup  label="Seleccione su modelo">
                        {
                            macbookModels.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
             {
                opcionSeleccionada === '3' && (
                    <div className='mb-2 text-center'>
                        <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Ipad desea consultar?</label>
                        <select
                        id="opcionDispositivo"
                        
                        value={opcionIpad}
                        onChange={(e) => {
                        const selectedOptionM = e.target.options[e.target.selectedIndex]
                        // setSelectedOptionsD(selectedOptionD.text)
                        setOpcionIpad(selectedOptionM.value)}}
                        className="form-inputbox text-center p-"
                        >
                        <optgroup label="Seleccione un Servicio">
                            {
                                deviceIPad.map((model) => {
                                    return (
                                        <option value={model.value} key={model.value}>{model.label}</option>
                                    )
                                })
                            }
                        </optgroup>
                        </select>
                    </div>
                )
            }
             {
                opcionIpad === 'A' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Ipad  posee?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedIpad}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedIpad(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            ipadsModels.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
            {
                opcionIpad === 'B' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Ipad  posee?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedIpad}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedIpad(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            ipadsPro.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
             {
                opcionIpad === 'C' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Ipad  posee?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedIpad}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedIpad(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            ipadsAir.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
             {
                opcionIpad === 'D' && (
                    <div className='mb-2 text-center'>
                    <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Ipad  posee?</label>
                    <select
                    id="opcionDispositivo"
                    
                    value={selectedIpad}
                    onChange={(e) => {
                    const selectedOptionM = e.target.options[e.target.selectedIndex]
                    setOpcionDispositivo(selectedOptionM.value)
                    setSelectedOptionsD(selectedOptionM.text)
                    setSelectedIpad(selectedOptionM.value)}}
                    className="form-inputbox text-center"
                    >
                    <optgroup label="Seleccione su modelo">
                        {
                            ipadsMini.map((model) => {
                                return (
                                    <option value={model.value} key={model.value}>{model.label}</option>
                                )
                            })
                        }
                    </optgroup>
                    </select>
                </div>
                )
            }
            {
                opcionSeleccionada === '4' && (
                    <div className='mb-2 text-center'>
                        <label className="labelinput-custom" htmlFor="opcionDispositivo">¿Qué version de Watch desea consultar?</label>
                        <select
                        id="opcionDispositivo"
                        
                        value={opcionWatch}
                        onChange={(e) => {
                        const selectedOptionM = e.target.options[e.target.selectedIndex]
                        // setSelectedOptionsD(selectedOptionD.text)
                        setOpcionDispositivo(selectedOptionM.value)
                        setSelectedOptionsD(selectedOptionM.text)
                        setOpcionWatch(selectedOptionM.value)}}
                        
                        className="form-inputbox text-center p-"
                        >
                        <optgroup label="Seleccione un Servicio">
                            {
                                deviceWatch.map((model) => {
                                    return (
                                        <option value={model.value} key={model.value}>{model.label}</option>
                                    )
                                })
                            }
                        </optgroup>
                        </select>
                    </div>
                )
            }
              <div className='mb-2'>
                <label className="labelinput-custom" htmlFor="modelo">Modelo:</label>
                <div className="flex flex-col md:flex-row items-center gap-x-4">
                <input type="text" 
                id="modelo"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
                placeholder="A2124"
                className="form-inputbox"
                />
                <div
                className="hover-image-container"
                >
                    <span className="text-light-text dark:text-dark-text cursor-pointer">¿Dónde encontrar Model?</span>
                    <div className="hover-image">
                        <button
                        className="slider-button prev-button"
                        onClick={handlePrevImage}
                        type="button"
                        >
                            &#8249;
                        </button>
                        <img src={imagesHelpers[currentImageIndex]} alt="Modelo del equipo" 
                        className="slider-image"
                        />
                        <button
                        className="slider-button next-button"
                        onClick={handleNextImage}
                        type="button"
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
                </div>
            </div>
                <div className='mb-2'>
                <label className="labelinput-custom text-center" htmlFor="mensaje">Mensaje:</label>
                <textarea 
                name="mensaje" 
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="textarea-custom"
                required
                placeholder="Descripcion detallada o parcial del caso"
                >
                </textarea>
                </div>
            <button className="btn-custom" type="submit" disabled={isSubmit}>Enviar Consulta</button>
            
        </form>
        
            {
                toast.show && (
                    <Toast
                    message={toast.message}
                    type={toast.type}
                    positionV={toast.positionV}
                    positionH={toast.positionH}
                    onClose={closeToast}
                    />
                )
            }

        </div>
    )

}
