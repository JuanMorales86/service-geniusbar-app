import React from "react";
import type { ServiceOrder } from "@/types/database";

export class PrintableOrder extends React.PureComponent<{
  order?: ServiceOrder;
  innerRef?: React.Ref<HTMLDivElement>;
}> {
  
  render() {
    const { order } = this.props;
    return (
      <>
      <div ref={this.props.innerRef} className="printable-order-container font-apple text-black">
        <div className="page first-page">
        <div className="printable-order border-2">
        <div className="flex flex-row justify-around items-center">
        <picture>
          <img src="https://imgur.com/rrUbj7z.png" alt="logo atomo" className="block m-auto mb-5 max-w-32 h-auto" />
        </picture>
        <span className="genius-bar-title text-center  mb-2 text-blk-gray-dark text-xl font-bold">Servicio Tecnico Especializado <br/> Reparación y soporte Apple/Samsung <br/>¡Soluciones rápidas y garantizadas!</span>
        </div>
       
        <div className="text-center text-2xl border-2 border-blk-gray-dark p-2 mb-6 mx-2 shadow-lg font-bold">Orden Comprobante</div>

        <div className="text-end text-md border-blk-gray-dark p-2 mb-2 font-semibold">Buenos Aires, 02 de Octubre de 2024</div>

        <table className="order-details ">
          <tbody>
            <tr><th>Numero de Orden:</th><td>{order.ordernumber || 'No Disponible'}</td></tr>
            <tr><th>Status:</th><td>{order.status || 'No Especificado'}</td></tr>
            <tr><th>Cliente:</th><td>{order.clientname || 'Anonimo'}</td></tr>
            <tr><th>Dni:</th><td>{order.clientdni || 'No Resgristrado'}</td></tr>
            <tr><th>Email:</th><td>{order.email || 'Vacio' }</td></tr>
            <tr><th>Telefono:</th><td>{order.phone || 'Vacio'}</td></tr>
            <tr><th>Modelo:</th><td>{order.model || 'No Informado'}</td></tr>
            <tr><th>Serial Equipo:</th><td>{order.serial || "Vacio"}</td></tr>
            <tr><th>Detalles de Visuales del Equipo:</th><td>{order.phonedetails || 'Vacio'}</td></tr>
            <tr><th>Problema:</th><td>{order.issue || 'No Especificado'}</td></tr>
           
          </tbody>
        </table>
        <div className="mt-12 left-10 right-10 text-right border-t-2 border-blk-gray-light text-blk-gray-dark pt-2"><span>Cordialmente:<span className="block text-blk-gray-dark font-bold">Juan Morales</span> </span>
        </div>
            <div className="flex flex-col items-center justify-center w-full  text-center text-lg font-semibold my-8">
            <h1>OnThePointService</h1>
            <p>Division Servicio Tecnologia</p>
            <p>Florida 537, PB, Loc. 366, CABA</p>
            <p>Lunes a Viernes: 10 a 19 hs, Sabados: 11 a 16 hs</p>
            <p>Telefono: +54-9-1123560959</p>
            </div>            
      </div>
        </div>
      
        <div className="page second-page border-2 border-blackEerie">
        <div className="flex flex-row justify-center items-center">
        <picture>
          <img src="https://imgur.com/rrUbj7z.png" alt="logo atomo" className="block mt-2 max-w-32" />
        </picture>
        </div>
          <div className="order-legals text-base font-aux font-semibold text-black flex flex-col">
            <div className="flex flex-col justify-center items-center mb-2">
                <h1 className="text-lg">Términos y Condiciones</h1>
                <p className="font-bold text-lg">▶️ Por favor, leer la revisión de los términos y probar bien el equipo antes de su retiro de la tienda:</p>
            </div>
                <div className="flex flex-col  text-justify">
                <p>•	Los diagnósticos internos pueden variar y se hacen entre 24 y 48 horas sin embargo pueden durar hasta 96 horas “hábiles”.</p>
                <p>•	Los equipos y componentes se consideran sin funcionamiento hasta ser diagnosticados en nuestro laboratorio.</p>
                <p>•	TODO TRABAJO EN PLACA corre el riesgo de perder funcionalidades o en su defecto de que no encienda más.</p>
                <p>•	Todo equipo humedecido o mojado podrá presentar fallas progresivas inclusive luego de ser reparado.</p>
                <p>•	Cambio de Pantallas y Baterías (garantía de 90 días), cumpliendo con los términos y condiciones.</p>
                <p>•	GARANTIA: LA GARANTIA COMIENZA A SER EFECTIVA DESDE EL MOMENTO EN EL QUE SE LE NOTIFICA AL CLIENTE. Para que sea válida se debe de presentar la factura u orden, el equipo se recibirá para ser diagnosticado y verificar la falla, el equipo no puede presentar (caídas, golpes o ralladuras, humedad o agua), (exceso de calor sobre la placa), (haber sido abierto por otro servicio técnico), (NO pueden haber sido violados los sellos de seguridad), la garantía solo ampara la zona o componentes reparados, OnthePointService no se hace responsable de desperfectos por alteraciones ó actualizaciones a nivel de software. La garantía tiene una duración de 30 a 90 días (de acuerdo a la reparación realizada) </p>
                <p>•	GARANTIA DE CAMBIO DE PANTALLAS: Por ningún motivo será válida la garantía si está partido el táctil ó display, mojado o humedecido o fractura interna por mala manipulación. </p>
                <p>•	Al pasar 90 días luego de ser reparado, el equipo se considera abandonado, en este caso OnthePointService, obtendrá el dominio del equipo y dispondrá del mismo perdiendo el cliente todo el derecho a reclamo sobre él (código civil, art.2525/2526).</p>
                <p>•	No nos hacemos responsables si el IMEI del equipo queda bloqueado por ENACOM en el tiempo que permanezca en nuestro laboratorio, “LA RESPONSABILIDAD LEGAL DEL EQUIPO POR ESTATUS DUDOSOS (POR EJEMPLO, ROBO Ó EXTRAVIO) ES TOTALMENTE DEL CLIENTE QUE LE DA INGRESO AL MISMO EN NUESTRO LOCAL”.</p>
                </div>
          </div>
        </div>
      </div>
      </>
      
    );
  }
}

{/* 
  border-2 border-black w-full h-48 box-border

  <tfoot className="absolute bottom-10 left-10 right-10 text-right border-t border-gray-300 pt-5">Cordialmente:Juan Morales</tfoot>
</tbody> */}