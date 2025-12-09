import { useRef } from "react"; //Se importa React y el hook useRef
import type { ServiceOrder, SaledDevice } from "@/types/database"; //Se importa el tipo ServiceOrder para tipar los datos de la orden
import { PrintableOrder } from "./printableOrder"; //Se importa el componente PrintableOrder que contiene el diseño a imprimir
import * as reactToPrint from "react-to-print"; //Se importa todo el módulo react-to-print como reactToPrint



//Este componente actúa como un envoltorio que conecta el botón de impresión con el contenido imprimible.
function PrinterWrapper({ order }: { order: ServiceOrder | SaledDevice }) { //Recibe una prop 'order' de tipo ServiceOrder o SaledDevice
    const contentRef = useRef<HTMLDivElement>(null); // Crea una referencia contentRef usando useRef para el div que contiene el contenido imprimible
    const reactToPrintFn = reactToPrint.useReactToPrint({ //Utiliza useReactToPrint pasándole la referencia para manejar la impresión
        contentRef
    });    
    return (
        /**Un contenedor principal con el botón de impresión
            Un div oculto (display: none) que contiene el componente PrintableOrder
            El botón ejecuta la función de impresión cuando se hace clic
            PrintableOrder recibe la orden y la referencia para poder acceder al contenido desde react-to-print**/
        <div className="w-full flex justify-center mt-2"> 
            <button onClick={() => reactToPrintFn()} className="btn-custom">
                Imprimir Orden
            </button>
            <div style={{ display: "none"}}>
                <PrintableOrder order={order} innerRef={contentRef}/>
            </div>
        </div>
    )
}   

export default PrinterWrapper;