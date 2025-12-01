import {useEffect, useState} from "react";
// import {useForm} from 'react-hook-form'
import {Toast} from "./ToastContainer";



const imagesHelpers = [
    'https://i.imgur.com/Oe6RgTe.png',
    'https://i.imgur.com/m9kBcou.png',
    'https://i.imgur.com/srnnMSJ.png',
    'https://i.imgur.com/9kfacd2.png',

];

const devicetype = [
    {value: "2", label: "Servicio Macbook"},
    {value: "1", label: "Servicio Iphone"},
    {value: "3", label: "Servicio Ipad"},
    {value: "4", label: "Servicio Apple Watch"},
    {value: "5", label: "Otras reparaciones"}
]

const iphonesModels = [
    { value: "1", label: "Iphone 15 Pro Max" },
    { value: "2", label: "Iphone 15 Pro" },
    { value: "3", label: "Iphone 15 Plus" },
    { value: "4", label: "Iphone 15" },
    { value: "5", label: "Iphone 14 Pro Max" },
    { value: "6", label: "Iphone 14 Pro" },
    { value: "7", label: "Iphone 14 Plus" },
    { value: "8", label: "Iphone 14" },
    { value: "9", label: "Iphone 13 Pro Max" },
    { value: "10", label: "Iphone 13 Pro" },
    { value: "11", label: "Iphone 13" },
    { value: "12", label: "Iphone 12 Pro Max" },
    { value: "13", label: "Iphone 12 Pro" },
    { value: "14", label: "Iphone 12" },
    { value: "15", label: "Iphone 11 Pro Max" },
    { value: "16", label: "Iphone 11 Pro" },
    { value: "17", label: "Iphone 11" },
    { value: "18", label: "Iphone Xs Max" },
    { value: "19", label: "Iphone Xs" },
    { value: "20", label: "Iphone X" },
    { value: "21", label: "Iphone 8 Plus" },
    { value: "22", label: "Iphone 8" },
    { value: "23", label: "Iphone 7 Plus" },
    { value: "24", label: "Iphone 7" },
    { value: "25", label: "Iphone 6s Plus" },
    { value: "26", label: "Iphone 6s" },
    { value: "27", label: "Iphone 6 Plus" },
    { value: "28", label: "Iphone 6" },
    { value: "29", label: "Iphone SE Tercera Generacion" },
    { value: "30", label: "Iphone SE Segunda Generacion" },
    { value: "31", label: "Iphone SE Primera Generacion" }
];

const deviceMacB = [
    {
        value: 'A',
        label: 'Macbook Air'
    },
    {
        value: 'B',
        label: 'Macbook Pro'
    },
    {
        value: 'C',
        label: 'Macbook'
    }
];

const macbookModels = [
    {
        value: '1',
        label: 'Macbook 12" Retina 2017'
    },
    {
        value: '2',
        label: 'Macbook 12" Retina 2016'
    },
    {
        value: '3',
        label: 'Macbook 12" Retina 2015'
    },
    {
        value: '4',
        label: 'Macbook 13" Mid-2010'
    },
    {
        value: '5',
        label: 'Macbook 13" Late-2009'
    },
    {
        value: '6',
        label: 'Macbook 13" Early-2009'
    }

];

const macbookAirModels = [
    {
        value: '1',
        label: 'Macbook Air 15" 2023'
    },
    {
        value: '2',
        label: 'Macbook Air 13.6" m2-2022'
    },
    {
        value: '3',
        label: 'Macbook Air 13.3" m1-2020'
    },
    {
        value: '4',
        label: 'Macbook Air 13" Retina 2020'
    },
    {
        value: '5',
        label: 'Macbook Air 13" Retina 2019'
    },
    {
        value: '6',
        label: 'Macbook Air 13" Retina 2018'
    },
    {
        value: '7',
        label: 'Macbook Air 13" 2017'
    },
    {
        value: '8',
        label: 'Macbook Air 13" Early-2015'
    },
    {
        value: '9',
        label: 'Macbook Air 11" Early-2015'
    },
    {
        value: '10',
        label: 'Macbook Air 13" Early-2014'
    },
    {
        value: '11',
        label: 'Macbook Air 11" Early-2014'
    },
    {
        value: '12',
        label: 'Macbook Air 13" Mid-2013'
    },
    {
        value: '13',
        label: 'Macbook Air 11" Mid-2013'
    },
    {
        value: '14',
        label: 'Macbook Air 13" Mid-2012'
    },
    {
        value: '15',
        label: 'Macbook Air 11" Mid-2012'
    },
    {
        value: '16',
        label: 'Macbook Air 13" Mid-2011'
    },
    {
        value: '17',
        label: 'Macbook Air 11" Mid-2011'
    },
    {
        value: '18',
        label: 'Macbook Air 13" Late-2010'
    },
    {
        value: '19',
        label: 'Macbook Air 11" Late-2010'
    },
    {
        value: '20',
        label: 'Macbook Air 13" Mid-2009'
    }
];

const macbookProModels = [
    {
        value: '1',
        label: 'Macbook Pro 14" M3 Pro - M3 Max Nov-2023'
    },
    {
        value: '2',
        label: 'Macbook Pro 14" M3 Nov-2023'
    },
    {
        value: '3',
        label: 'Macbook Pro 16" M3 Pro - M3 Max Late-2022'
    },
    {
        value: '4',
        label: 'Macbook Pro 14" 2023'
    },
    {
        value: '5',
        label: 'Macbook Pro 16" 2023'
    },
    {
        value: '6',
        label: 'Macbook Pro 13" M2 2022'
    },
    {
        value: '7',
        label: 'Macbook Pro 14" 2021'
    },
    {
        value: '8',
        label: 'Macbook Pro 16" 2021'
    },
    {
        value: '9',
        label: 'Macbook Pro 13" M1 2020'
    },
    {
        value: '10',
        label: 'Macbook Pro 13" 2-Port Thunderbolt 3 2020'
    },
    {
        value: '11',
        label: 'Macbook Pro 13" 4-Port Thunderbolt 3 2020'
    },
    {
        value: '12',
        label: 'Macbook Pro 16" 2019'
    },
    {
        value: '13',
        label: 'Macbook Pro 13" 2-Port Thunderbolt 3 2019'
    },
    {
        value: '14',
        label: 'Macbook Pro 15" 2019'
    },
    {
        value: '15',
        label: 'Macbook Pro 13" 4-Port Thunderbolt 3 2019'
    },
    {
        value: '16',
        label: 'Macbook Pro 15" 2018'
    },
    {
        value: '17',
        label: 'Macbook Pro 13" 4-Port Thunderbolt 3 2018'
    },
    {
        value: '18',
        label: 'Macbook Pro 15" 2017'
    },
    {
        value: '19',
        label: 'Macbook Pro 13" 4-Port Thunderbolt 3 2017'
    },
    {
        value: '20',
        label: 'Macbook Pro 13" 2-Port Thunderbolt 3 2016'
    },
    {
        value: '21',
        label: 'Macbook Pro 15" 2016'
    },
    {
        value: '22',
        label: 'Macbook Pro 13" 4-Port Thunderbolt 3 2016'
    },
    {
        value: '23',
        label: 'Macbook Pro 13" 2-Port Thunderbolt 3 2016'
    },
    {
        value: '24',
        label: 'Macbook Pro 15" Retina Mid-2015'
    },
    {
        value: '25',
        label: 'Macbook Pro 13" Retina Early-2015'
    },
    {
        value: '26',
        label: 'Macbook Pro 15" Retina Mid-2014'
    },
    {
        value: '27',
        label: 'Macbook Pro 13" Retina Mid-2014'
    },
    {
        value: '28',
        label: 'Macbook Pro 15" Retina Late-2013'
    },
    {
        value: '29',
        label: 'Macbook Pro 13" Retina Late-2013'
    },
    {
        value: '30',
        label: 'Macbook Pro 15" Retina Early-2013'
    },
    {
        value: '31',
        label: 'Macbook Pro 13" Retina Early-2013'
    },
    {
        value: '32',
        label: 'Macbook Pro 13" Retina Late-2012'
    },
    {
        value: '33',
        label: 'Macbook Pro 15" Mid-2012'
    },
    {
        value: '34',
        label: 'Macbook Pro 13" Mid-2012'
    },
    {
        value: '35',
        label: 'Macbook Pro 17" Late-2011'
    },
    {
        value: '36',
        label: 'Macbook Pro 15" Late-2011'
    },
    {
        value: '37',
        label: 'Macbook Pro 13" Late-2011'
    },
    {
        value: '38',
        label: 'Macbook Pro 17" Early-2011'
    },
    {
        value: '39',
        label: 'Macbook Pro 15" Early-2011'
    },
    {
        value: '40',
        label: 'Macbook Pro 13" Early-2011'
    },
    {
        value: '41',
        label: 'Macbook Pro 17" Mid-2010'
    },
    {
        value: '42',
        label: 'Macbook Pro 15" Mid-2010'
    },
    {
        value: '43',
        label: 'Macbook Pro 13" Mid-2010'
    },
    {
        value: '44',
        label: 'Macbook Pro 17" Mid-2009'
    },
    {
        value: '45',
        label: 'Macbook Pro 15" Mid-2009'
    },
    {
        value: '46',
        label: 'Macbook Pro 15" 2.53Ghz Mid-2009'
    },
    {
        value: '47',
        label: 'Macbook Pro 13" Mid-2009'
    },
    {
        value: '48',
        label: 'Macbook Pro 17" Early-2009'
    },
    {
        value: '49',
        label: 'Macbook Pro 15" Late-2008'
    },
    {
        value: '50',
        label: 'Macbook Pro 17" Early-2008'
    },
    {
        value: '51',
        label: 'Macbook Pro 15" Early-2008'
    }
];

const deviceIPad = [
    {
        value: 'A',
        label: 'Ipad'
    },
    {
        value: 'B',
        label: 'Ipad Pro'
    },
    {
        value: 'C',
        label: 'Ipad Air'
    },
    {
        value: 'D',
        label: 'Ipad Mini'
    }
];

const ipadsModels = [
    {value: '1', label: 'iPad 10ma Gen 2022'},
    {value: '2', label: 'iPad 9na Gen 2021'},
    {value: '3', label: 'iPad 8va Gen 2020'},
    {value: '4', label: 'iPad 7ma Gen 2019'},
    {value: '5', label: 'iPad 6ta Gen 2018'},
    {value: '6', label: 'iPad 5ta Gen 2017'},
    {value: '7', label: 'iPad 4ta Gen Late-2012'},
    {value: '8', label: 'iPad 3ra Gen Early-2012'},
    {value: '9', label: 'iPad 2 2021'},
];

const ipadsPro = [
    {value: '1', label:'iPad Pro 13" M4 2024'},
    {value: '2', label:'iPad Pro 11" M4 2024'},
    {value: '3', label:'iPad Pro 12.9" 6ta Gen M4 2022'},
    {value: '4', label:'iPad Pro 11" 4ta Gen 2022'},
    {value: '5', label:'iPad Pro 12.9" 5ta Gen 2021'},
    {value: '6', label:'iPad Pro 11" 3ra Gen 2021'},
    {value: '7', label:'iPad Pro 12.9" 4ta Gen 2020'},
    {value: '8', label:'iPad Pro 11" 2da Gen 2020'},
    {value: '9', label:'iPad Pro 12.9" 3ra Gen 2018'},
    {value: '10', label:'iPad Pro 11" 2018'},
    {value: '11', label:'iPad Pro 12.9" 2da Gen 2017'},
    {value: '12', label:'iPad Pro 10.5" 2017'},
    {value: '13', label:'iPad Pro 9.7" 2016'},
    {value: '14', label:'iPad Pro 12.9" 2015'},
]

const ipadsAir = [
    {value: '1', label:'iPad Air 13" M2 2024'},
    {value: '2', label:'iPad Air 11" M2 2024'},
    {value: '3', label:'iPad Air 5ta Gen 2022'},
    {value: '4', label:'iPad Air 4ta Gen 2020'},
    {value: '5', label:'iPad Air 3ra Gen 2019'},
    {value: '6', label:'iPad Air 2 2014'},
    {value: '7', label:'iPad Air Late-2014 Early-2014'},
];

const ipadsMini = [
    {value: '1', label:'iPad Mini 6ta Gen 2021'},
    {value: '2', label:'iPad Mini 5ta Gen 2019'},
    {value: '3', label:'iPad Mini 4 2015'},
    {value: '4', label:'iPad Mini 3 Late-2014'},
    {value: '5', label:'iPad Mini 2 Late-2013 Early-2014'},
];

const deviceWatch = [
    {
        'value': 1,
        'label': 'Apple Watch Series 8 41mm/45mm'
    },
    {
        'value': 2,
        'label': 'Apple Watch Series 7 41mm/45mm'
    },
    {
        'value': 3,
        'label': 'Apple Watch Series 6 40mm/44mm'
    },
    {
        'value': 4,
        'label': 'Apple Watch Series 5 40mm/44mm'
    },
    {
        'value': 5,
        'label': 'Apple Watch Series 4 40mm//44mm'
    },
    {
        'value': 6,
        'label': 'Apple Watch Series 3 38mm/42mm'
    },
    {
        'value': 7,
        'label': 'Apple Watch Series 2 38mm/42mm'
    },
    {
        'value': 8,
        'label': 'Apple Watch Series 1 38mm/42mm'
    },
    {
        'value': 9,
        'label': 'Apple Watch Primera Generación 38mm/42mm'
    },
    {
        'value': 10,
        'label': 'Apple Watch SE Segunda Generación 40mm/44mm'
    },
    {
        'value': 11,
        'label': 'Apple Watch SE 40mm/44mm'
    }
]



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
    
    const [isMobile, setIsMobile] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('')
    const [toastPositionV, setToastPositionV] = useState('')
    const [toastPositionH, setToastPositionH] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)// Estado para controlar el boton de envio
    const [isHover, setIsHover] = useState(false)//Estado Hover images helpers
    const [currentImageIndex, setCurrentImageIndex] = useState(0)// Estado para correr las imagenes helpers
    // const {register} = useForm()

    
const styles = {
    hoverImageContainer:{
        position: 'relative',
        display:'inline-block'
    },
    hoverImage:{
        display: 'none',
        position: 'absolute',
        top: '0',
        left: isMobile ? '50%' : '80%',
        transform: isMobile ? 'translateX(-50%)' : 'none',
        marginTop: isMobile ? '20px' : '0',
        width:'200px',
        height:'200px',  //  altura fija
        border:'1px solid #ccc',
        borderRadius:'10px',
        backgroundColor:'#ccc',
        boxShadow:'0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex:'10',
        overflow: 'hidden', // contenido no se desborde
      
    },
    hoverImageVisible: {
        display: 'block',
    },
    sliderButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        border: 'none',
        padding: '5px',
        cursor: 'pointer',
        zIndex: '20',
    },
    prevButton: {
        left: '0',
    },
    nextButton: {
        right: '0',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
}

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1006);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('rezise', handleResize);
        }; 
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true)//Deshabilitar el boton de envio

        setToastMessage('Enviando consulta.....')
        setToastType('info')
        setToastPositionH('top')
        setToastPositionV('end')
        setShowToast(true)

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
            
            const response = await fetch('/api/submitForm', {//preguntamos al api submitForm es un archivo servidor, la pregunta es un POST y el body es el formData
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();//response.json() convierte la respuesta en un objeto JSON que puede ser leida por JavaScript.
                // console.log('Formulario enviado con exito', result);
                if(result.success){//si el resultado es exitoso 
                    setToastMessage('Consulta enviada con exito')
                    setToastType('success')
                    setToastPositionV('top')
                    setToastPositionH('end')
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 5000)
                    resetForm()//restablecer formulario
                     // Aquí puedes realizar otras acciones después de enviar el formulario exitosamente
                } else {
                    setToastMessage('Error al enviar la Consulta')
                    setToastType('error')
                    setToastPositionV('top')
                    setToastPositionH('end')
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 5000)
                    //Manejar errores
                }
              
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
             
                //Manejar errores 
            } 
        } catch (error) {
                console.error('Error al enviar el formulario', error);
                setToastMessage('Error al enviar el formulario')
                setToastType('error')
                setToastPositionV('top')
                setToastPositionH('center')
                setShowToast(true)
             
        } finally {
            setIsSubmit(false)//habilitar el boton de envio
        }
    };


    const handleToastClose = () => {
        setShowToast(false)
    }

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

    /*prevIndex: Este es el valor actual del índice de la imagen antes de que se actualice.
    - prevIndex === 0: Si el índice actual es 0 (es decir, estamos en la primera imagen), entonces queremos ir a la última imagen. Esto se hace estableciendo el índice a 
    - imagesHelpers.length - 1.
    prevIndex - 1: Si el índice actual no es 0, simplemente restamos 1 al índice para ir a la imagen anterior.
    */
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagesHelpers.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imagesHelpers.length - 1 ? 0 : prevIndex + 1));

        /*prevIndex === imagesHelpers.length - 1: Si el índice actual es el último índice (es decir, estamos en la última imagen), entonces queremos ir a la primera imagen. Esto se hace estableciendo el índice a 0.
        - prevIndex + 1: Si el índice actual no es el último, simplemente sumamos 1 al índice para ir a la imagen siguiente.   */
    };

    //dark:border dark:bg-gray-800 dark:border-gray-700
    return (
        <div className="flex items-center justify-center py-8 mx-auto rounded-lg w-4/6 sm:w-4/6 md:w-3/6 lg:w-3/6 border-accent-light border-2 border-solid shadow-sm dark:border bg-light-bg dark:bg-dark-bg dark:border-black">
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
                style={styles.hoverImageContainer}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                >
                    <span className="text-light-text dark:text-dark-text cursor-pointer">¿Dónde encontrar Model?</span>
                    <div  style={{ ...styles.hoverImage, ...(isHover ? styles.hoverImageVisible : {}) }}>
                        <button
                        style={{ ...styles.sliderButton, ...styles.prevButton}}
                        onClick={handlePrevImage}
                        type="button"
                        >
                            &#8249;
                        </button>
                        <img src={imagesHelpers[currentImageIndex]} alt="Modelo del equipo" 
                        style={styles.sliderImage}
                        />
                        <button
                        style={{...styles.sliderButton, ...styles.nextButton}}
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
                showToast && (
                    <Toast
                    message={toastMessage}
                    type={toastType}
                    positionV={toastPositionV}
                    positionH={toastPositionH}
                    onClose={handleToastClose}
                    />
                )
            }

        </div>
    )

}
