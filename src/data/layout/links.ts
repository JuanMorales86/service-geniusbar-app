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
        userRedirectUrl: '/'//Redirecciona a la pagina de muestreo de ordenes ordenes para usuarios regulares
    },
    {
        title: 'Ordenes Venta Telefonos',
        url: '/create-saled-device',
        requiresAuth: true,
        adminOnly: true,
        userRedirectUrl: '/'//Redirecciona a la pagina de muestreo de ordenes ordenes para usuarios regulares
    },
    {
        title: 'Contacto',
        url: '/formservice',
        requiresAuth: false
    },
]

export const linksData2: Links[] = [//Array linksData: Es un array de objetos que implementan la interfaz Links. Cada objeto en el array representa un enlace con un título y una URL correspondiente.
    {
        title: 'Reparación iPhone',
        url: '/serviceiphone',
        requiresAuth: false
    },
    {
        title: 'Reparación MacBook',
        url: '/servicemac',
        requiresAuth: false
    },
    {
        title: 'Reparación iMac',
        url: '/serviceimac',
        requiresAuth: false
    },
    {
        title: 'Reparación iPad',
        url: '/serviceipad',
        requiresAuth: false
    },
    
    {
        title: 'Reparación Watch',
        url: '/servicewatch',
        requiresAuth: false
    },
    {
        title: 'Reparación Placas',
        url: '/serviceplacas',
        requiresAuth: false
    },
    {
        title: 'Reparación MagSafe',
        url: '/servicemagsafe',
        requiresAuth: false
    },
    {
        title: 'Reparación TV',
        url: '/servicetvs',
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

export const IphoneCarouselTexts = {
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

export const TelevisionTexts = {
    firstRow: [
        "Pantalla (LCD/QLED)",
        "Fuente de Alimentación",
        "Placa T-Con",
        "Placa Principal",
        "Puertos HDMI/USB",
        "Leds Apagados",
        "Problemas de Audio",
        "Problemas de Imagen",
        "Problemas de Encendido",
    ],

    secondRow: [
        "Problemas de Software",
        "Conectividad WiFi",
        "Control Remoto",
        "Soporte y Base",
        "Diagnóstico de Líquidos",
        "Mantenimiento Preventivo",
        "Entre Otros"
      ]
}

export const MacCarouselTexts ={
    firstRow: [
    "SSD / Disco Duro",
    "Memoria RAM",
    "Teclado y Trackpad",
    "Placa Lógica",
    "Pantalla LCD/OLED",
    "Cámara Web",
    "Puertos USB-C/Thunderbolt",
    "Cargador MagSafe",
    "Ventilador y Cooling",
    "Altavoces",
    "Micrófono",
    "Bisagras y Chasis"
  ],
  secondRow: [
    "WiFi y Bluetooth",
    "Batería y Autonomía",
    "Diagnóstico de Líquidos",
    "Reinstalación macOS",
    "Touch Bar (MacBook Pro)",
    "Sensor Touch ID",
    "Chip T2/M1/M2/M3 Problemas",
    "Data Recovery",
    "Mantenimiento Preventivo",
    "Actualización de Hardware",
    "Entre Otros"
  ]
}

export const macBookModels = [
{ name: "MacBook Air M3", year: "2024", support: "Completo" },
  { name: "MacBook Pro M3", year: "2023-2024", support: "Completo" },
  { name: "MacBook Air M2", year: "2022-2023", support: "Completo" },
  { name: "MacBook Pro M2", year: "2022-2023", support: "Completo" },
  { name: "MacBook Air M1", year: "2020-2022", support: "Completo" },
  { name: "MacBook Pro M1", year: "2020-2021", support: "Completo" },
  { name: "MacBook Pro Intel", year: "2010-2020", support: "Completo" },
  { name: "MacBook Air Intel", year: "2010-2020", support: "Completo" }
]

export const macServiceInfo = [
  {
    service: "Cambio de SSD",
    time: "2-4 horas",
    price: "Presupuesto",
    description: "Upgrade o reemplazo de almacenamiento con mejores velocidades, hay modelos que no permiten el cambio"
  },
  {
    service: "Reparación de Teclado",
    time: "1-2 días",
    price: "Presupuesto",
    description: "Cambio completo de teclado, incluye backlight"
  },
  {
    service: "Cambio de Pantalla",
    time: "1-2 días",
    price: "Desde Presupuestar segun el año",
    description: "Pantalla original con garantía, todos los tamaños"
  },
  {
    service: "Reparación Lógica",
    time: "3-7 días",
    price: "Presupuesto",
    description: "Diagnóstico avanzado y reparación a nivel componente"
  }
]

export const iMacCarouselTexts = {
  firstRow: [
    "SSD / Disco Duro",
    "Memoria RAM",
    "Placa Lógica",
    "Pantallas",
    "Cámara Web",
    "Puertos USB-C/Thunderbolt",
    "Fuente Interna",
    "Ventilacion y Cooling",
    "Altavoces",
    "Micrófono",
    "Chasis"
  ],
  secondRow: [
    "WiFi y Bluetooth",
    "Diagnóstico de Líquidos",
    "Reinstalación macOS",
    "Data Recovery",
    "Mantenimiento Preventivo",
    "Actualización de Hardware",
    "Entre Otros"
  ]
}

export const iMacModels = [
  { name: "iMac Pro", year: "2017-2021", support: "Completo" },
  { name: "iMac Retina 5K (Intel)", year: "2014-2020", support: "Completo" },
  { name: "iMac Retina 4K (Intel)", year: "2015-2019", support: "Completo" },
  { name: "iMac (Intel)", year: "2012-2015", support: "Completo" },
  { name: "iMac (Intel)", year: "2009-2011", support: "Completo" },
  { name: "Todo En Uno MultiMarca", year: "Todos", support: "Completo" }
];

export const iMacserviceInfo = [
  {
    service: "Cambio de SSD",
    time: "2-4 horas",
    price: "Presupuesto",
    description: "Upgrade o reemplazo de almacenamiento con mejores velocidades, hay modelos que no permiten el cambio"
  },
  {
    service: "Reparación Fuente de Alimentación",
    time: "2-4 días",
    price: "Presupuesto",
    description: "Cambio completo de teclado, incluye backlight"
  },
  {
    service: "Cambio de Pantalla",
    time: "1-2 días",
    price: "Desde Presupuestar segun el año",
    description: "Pantalla original con garantía, todos los tamaños"
  },
  {
    service: "Reparación Placa Lógica",
    time: "5-10 días",
    price: "Presupuesto",
    description: "Diagnóstico avanzado y reparación a nivel componente"
  }
]

export const MotherboardCarouselTexts = {
  firstRow: [
    "Microsoldadura",
    "Reballing de Chipset",
    "Reemplazo de Componentes",
    "Diagnóstico Avanzado",
    "Cortocircuitos",
    "Reparación de pistas",
    "Reflow",
  ],
  secondRow: [
    "iPhone",
    "Macbook",
    "iPad",
    "Samsung",
    "Xiaomi",
    "Huawei",
    "Otras Marcas"
  ]
}

export const MotherboardModels = [
  { name: "iPhone", year: "Todos", support: "Completo" },
  { name: "iPad", year: "Todos", support: "Completo" },
  { name: "Macbook", year: "Todos", support: "Completo" },
  { name: "Samsung", year: "Todos", support: "Parcial" },
  { name: "Xiaomi", year: "Todos", support: "Parcial" },
   { name: "Huawei", year: "Todos", support: "Parcial" },
  { name: "Otras Marcas", year: "Consultar", support: "Limitado" }
];

export const MotherboardserviceInfo = [
  {
    service: "Reparación de Cortocircuitos",
    time: "3-7 días",
    price: "Presupuesto",
    description: "Solución de cortocircuitos en la placa madre"
  },
  {
    service: "Reballing y Reemplazo de Chipset",
    time: "5-12 días",
    price: "Presupuesto",
    description: "Reemplazo de Chipset o Reballing"
  }
]

export const iPadCarouselTexts = {
  firstRow: [
    "Pantalla (Tactil y LCD)",
    "Batería",
    "Placa Lógica",
    "Cámara (Frontal/Trasera)",
    "Botones (Encendido/Volumen)",
    "Puerto de Carga",
    "Altavoces",
    "Micrófono",
    "Chasis/Carcasa",
    "Conectividad (Wi-Fi/Bluetooth)"
  ],
  secondRow: [
    "Diagnóstico de Líquidos",
    "Reinstalación iPadOS",
    "Recuperación de Datos",
    "Mantenimiento Preventivo",
    "Solución de Software",
    "Entre Otros"
  ]
};

export const iPadModels = [
  { name: "iPad Pro (M4)", year: "2024", support: "Completo" },
  { name: "iPad Air (M2)", year: "2024", support: "Completo" },
  { name: "iPad Pro (M2)", year: "2022-2023", support: "Completo" },
  { name: "iPad Air (M1)", year: "2022-2023", "support": "Completo" },
  { name: "iPad (10ª Gen)", year: "2022-2023", support: "Completo" },
  { name: "iPad Mini (6ª Gen)", year: "2021-2023", support: "Completo" },
  { name: "iPad Pro (M1)", year: "2021-2022", support: "Completo" },
  { name: "iPad (9ª Gen)", year: "2021-2022", support: "Completo" },
  { name: "iPad (Antiguos)", year: "2010-2020", support: "Limitado/Completo" }
];

export const iPadServiceInfo = [
  {
    service: "Cambio de Pantalla",
    time: "Mismo dia",
    price: "Presupuesto",
    description: "Reemplazo de la pantalla completa (cristal y LCD) o solo el cristal, según el modelo y el daño."
  },
  {
    service: "Cambio de Batería",
    time: "1-2 días",
    price: "Presupuesto",
    description: "Sustitución de la batería para problemas de autonomía o encendido."
  },
  {
    service: "Reparación Puerto de Carga",
    time: "Mismo dia",
    price: "Presupuesto",
    description: "Solución a problemas de carga o reconocimiento de accesorios por el puerto."
  },
  {
    service: "Reparación Placa Lógica",
    time: "5-10 días",
    price: "Presupuesto",
    description: "Diagnóstico y reparación a nivel de componente para fallos complejos del iPad."
  }
];

export const AppleWatchCarouselTexts = {
  firstRow: [
    "Pantalla (Cristal y/o LCD)",
    "Batería",
    "Digital Crown",
    "Botón Lateral",
    "Sensor de Ritmo Cardíaco",
    "Micrófono",
    "Altavoz",
    "Taptic Engine (Vibración)",
    "Correa (Conexión)",
    "Resistencia al Agua (Re-sellado)"
  ],
  secondRow: [
    "Diagnóstico de Hardware",
    "Reinstalación watchOS",
    "Sincronización y Configuración",
    "Limpieza Interna",
    "Solución de Problemas de Conectividad",
    "Entre Otros"
  ]
};

export const AppleWatchModels = [
  { name: "Apple Watch Series 10/Ultra 3", year: "2024-2025", support: "Completo" },
  { name: "Apple Watch Series 9/Ultra 2", year: "2023-2024", support: "Completo" },
  { name: "Apple Watch Series 8/Ultra", year: "2022-2023", support: "Completo" },
  { name: "Apple Watch SE (2ª Gen)", year: "2022-2023", support: "Completo" },
  { name: "Apple Watch Series 7", year: "2021-2022", support: "Completo" },
  { name: "Apple Watch SE (1ª Gen)", year: "2020-2022", support: "Completo" },
  { name: "Apple Watch Series 6", year: "2020-2021", support: "Completo" },
  { name: "Apple Watch Series 5", year: "2019-2020", support: "Completo" },
  { name: "Apple Watch Series 4", year: "2018-2019", support: "Completo" },
  { name: "Apple Watch Series 3 y Anteriores", year: "2017 y Anteriores", support: "Limitado/Básico" }
];

export const AppleWatchServiceInfo = [
  {
    service: "Cambio de Pantalla",
    time: "1-3 días",
    price: "Presupuesto",
    description: "Reemplazo del cristal roto o la pantalla completa (cristal y LCD) por daños."
  },
  {
    service: "Cambio de Batería",
    time: "1-2 días",
    price: "Presupuesto",
    description: "Sustitución de la batería para mejorar la autonomía o solucionar problemas de encendido."
  },
  {
    service: "Reparación/Reemplazo Digital Crown o Botón Lateral",
    time: "2-4 días",
    price: "Presupuesto",
    description: "Solución a problemas con la Digital Crown que no gira o presiona, o el botón lateral."
  },
  {
    service: "Reparación de Humedad/Líquidos",
    time: "3-7 días",
    price: "Presupuesto",
    description: "Diagnóstico y limpieza interna por exposición a líquidos, intentando restaurar la funcionalidad."
  }
];

export const MagsafeCarouselTexts = {
  firstRow: [
    "Reemplazo de Cable (MagSafe 1/2/USB-C)",
    "Reparación de Placa Lógica Interna",
    "Diagnóstico de Cortocircuitos",
    "Reparación por Sobrecalentamiento",
    "Fallo de Conexión (Imán/Pines)",
    "Reemplazo de Conector de Pared",
    "Fallos Intermitentes de Carga"
  ],
  secondRow: [
    "Diagnóstico General de Carga",
    "Mantenimiento de Conexión",
    "Evaluación de Componentes",
    "Solución de Problemas de Alimentación",
    "Entre Otros"
  ]
};

export const MagsafeModels = [
  { name: "MagSafe 1 (L-tip)", year: "2006-2012", compatibility: "MacBook/Pro/Air Antiguos" },
  { name: "MagSafe 2 (T-tip)", year: "2012-2015", compatibility: "MacBook/Pro/Air Más Recientes" },
  { name: "USB-C Power Adapter (con Cable)", year: "2015-Actual", compatibility: "MacBook/Pro/Air Actuales" }
];

export const MagsafeServiceInfo = [
  {
    service: "Cambio de Cable de Carga",
    time: "1-2 horas",
    price: "Presupuesto",
    description: "Reemplazo del cable dañado o deshilachado, la causa más común de fallo de Magsafe."
  },
  {
    service: "Reparación de Placa Lógica Interna",
    time: "1-2 días",
    price: "Presupuesto",
    description: "Diagnóstico y reparación de componentes electrónicos quemados o en cortocircuito dentro del cargador."
  },
  {
    service: "Diagnóstico de Cortocircuito/Fallo de Carga",
    time: "1-2 horas",
    price: "Presupuesto",
    description: "Identificación de la causa raíz de que el Magsafe no funcione o cargue intermitentemente."
  },
  {
    service: "Reemplazo de Conector de Pared (si aplica)",
    time: "Inmediato",
    price: "Presupuesto",
    description: "Sustitución de la parte del enchufe de pared si está dañada o doblada."
  }
];