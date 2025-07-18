export interface Links {//Interfaz Links: Define la estructura de un objeto que representa un enlace, con dos propiedades:
    title: string;
    url: string;
    requiresAuth?: boolean;//authentificacion verificador
    adminOnly?: boolean;//Solo admin
    userRedirectUrl?: string;//Redieccion de usuario
}

export interface Linkservice {
    title: string;
    path: string;
    icon: string;
}

export const linksData: Links[] = [//Array linksData: Es un array de objetos que implementan la interfaz Links. Cada objeto en el array representa un enlace con un título y una URL correspondiente.
    {
        title: 'Home',
        url: '/',
        requiresAuth: false
    },
    {
        title: 'Servicios',
        url: '/serviciosm',
        requiresAuth: false
    },
    {
        title: 'Ordenes y Reparaciones',
        url: '/service-createorders',
        requiresAuth: true,
        adminOnly: true,
        userRedirectUrl: '/ordershow-page'//Redirecciona a la pagina de muestreo de ordenes ordenes para usuarios regulares
    },
    {
        title: 'Contacto',
        url: '/formservice',
        requiresAuth: false
    },
]

export const linksServices: Linkservice[] = [
    {
        title: 'No carga',
        path: '/formservice',
        icon: 'IcoChargeFail'
    },
    {
        title: 'Pantalla rota',
        path: '/formservice',
        icon: 'IcoScreenBroken'
    },
    {
        title: 'Touch dañado ',
        path: '/formservice',
        icon: 'IcoScreenTouchFail'
    },
    {
        title: 'No enciende',
        path: '/formservice',
        icon: 'IcoMobileTurnOff'
    }

]


export const CarouselTexts = {
    firstRow: [
        "Pantalla",
        "Bateria",
        "Puerto de Carga",
        "Cámara Principal",
        "Cámara Selfie",
        "Face ID",
        "Boton Home",
        "Botones Volumen",
        "Boton Silenciar",
        "Botón de Power",
        "Altavoz",
        "Microfono",
    ],
    secondRow: [
        "Antena Wifi",
        "Antena Bluetooth",
        "Señal de Red Celular",
        "Bandeja Sim",
        "Sensor de Proximidad",
        "Plaquitas y Tornillos",
        "Sistema Software",
        "Codigos de Error de Software",
        "Liquido en el Equipo",
        "Cambio de Vidrio Pantalla",
        "Entre Otros"
    ]
}