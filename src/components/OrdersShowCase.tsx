import React, { Component } from 'react';
import type { ServiceOrder } from '../types/database';//import type { ServiceOrder } ... tells TypeScript that you are only importing the ServiceOrder type and not any values from the '../types/database' module.
import Pagination from './Pagination';
import LoadingSpinerAtom from './LoadingIcon';
import ReactToPrint from 'react-to-print';
import {PrintableOrder} from './printableOrder';
const cl = console.log.bind(console)

interface Props {}

interface State {
    ordersData: {
      ordenes: ServiceOrder[];
      actualPage: number;
      totalPages: number;
    } | null;
    isLoading: boolean;
    error: string | null;
    editingOrderId: null;
    editFormData: Partial<ServiceOrder> | null;
}



class OrdersShowCase extends Component<Props, State> {
  state: State = {
    ordersData: null,
    isLoading: true,
    error: null,
    editingOrderId: null,
    editFormData: null,
  }

  componentRef: React.RefObject<HTMLDivElement> = React.createRef();


  handleDelete = async (orderId: string) => {
    if (confirm('Estas seguro de querer borrar la orden?')){
      try {
        const response = await fetch('api/deleteOrders', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: orderId}),
        });
        if (response.ok) {
          this.setState(prevState => ({
            ordersData: prevState.ordersData ? {
              ...prevState.ordersData,
              ordenes: prevState.ordersData.ordenes.filter(order => order.id !== orderId)
            } : null
          }));
        } else {
          throw new Error('Error al borrar la orden');
        }
      } catch (error) {
        console.error('Error borrando la orden:', error);

      }
    }
  }

  handleEdit = (order: ServiceOrder) => {
    cl('orden editando:', order)
    this.setState({
      editingOrderId: order.id,
      editFormData: {
        ...order,
        aditionalObservation: order.aditionalObservation || '',
        donerepairments: order.donerepairments || '',
        topay: order.topay || 0,
        payed: order.payed || 0,
      },
    });
  }

  handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    cl('edit change:', name, value)
    this.setState(prevState => ({
      editFormData: prevState.editFormData ? {
        ...prevState.editFormData,
        [name]: value,
      } : { [name]: value }
    }));
  }

  handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cl('summiting edit:', this.state.editFormData)
    const response = await fetch('api/getOrders', {
      method: 'PUT',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.editFormData)
    });


    if (response.ok) {
      const updatedOrder = await response.json();
      cl('updated Order:', updatedOrder)
      this.setState(prevState => ({
        ordersData: prevState.ordersData ? {
          ...prevState.ordersData,
          ordenes: prevState.ordersData.ordenes.map(order => order.id === updatedOrder.id ? updatedOrder : order)
        } : null,
        editingOrderId: null, //Resetaer el estado editingOrderId
        editFormData: null, // Borrar form data
      }));
     
  }
}

  componentDidMount() {
    this.fetchOrders();
  }


  async fetchOrders(page: number = 1)
/*Al definir fetchOrders(page: number = 1), estás estableciendo un valor predeterminado para el parámetro page. Esto significa que si se llama a fetchOrders() sin ningún argumento, automáticamente usará 1 como valor para page.

  Este enfoque tiene dos beneficios principales:
  
  Garantiza que siempre haya un número de página válido, incluso si no se proporciona uno explícitamente.
  Permite que la primera carga de datos (que generalmente es la página 1) se pueda hacer simplemente llamando a fetchOrders() sin argumentos.
  Es una práctica común en la implementación de paginación, ya que proporciona un comportamiento predecible y fácil de manejar tanto para la carga inicial como para las navegaciones subsiguientes entre páginas.*/ 
  {
    try {
        const response = await fetch(`api/getOrders?pagina=${page}`)//This change allows fetchOrders to accept a page number and use it in the API request. The default value of 1 ensures it works as before when called without arguments. Now your changePage method will work correctly with the updated fetchOrders.
        if (!response.ok) {
            throw new Error('Fallo al cargar las ordenes');
        }
        const data = await response.json();
        this.setState({ ordersData: data, isLoading: false });
    } catch (err: unknown) {
        if (err instanceof Error) {
            this.setState({ error: err.message, isLoading: false });
        }
    }
  }

changePage = (newPage: number) => {
  if(this.state.ordersData && newPage >= 1 && newPage <= this.state.ordersData.totalPages) {
    this.fetchOrders(newPage)
  }
}



  render() {
      const { ordersData, isLoading, error, editFormData, editingOrderId } = this.state;

      if (isLoading) {
        return <LoadingSpinerAtom/>;
      }

      if (error) {
        return <div>Error: {error}</div>
      }

      return (
        <div>
            <h2>Orders</h2>
            <ul className='flex flex-row flex-wrap'>
                {ordersData?.ordenes.map((order) => (
                    <li key={order.id} className=" border p-4 mb-2 rounded-md shadow-md">
                        <h3>Numero de Orden: {order.ordernumber}</h3>
                        <p>Status: {order.status}</p>
                        <p>ID: {order.id}</p>
                        <p>Cliente: {order.clientname}</p>
                        <p>Dni: {order.clientdni}</p>
                        <p>Email: {order.email}</p>
                        <p>Telefono: {order.phone}</p>
                        <p>Tipo de Dispositivo: {order.deviceType}</p>
                        <p>Modelo: {order.model}</p>
                        <p>Serial Equipo: { order.serial || "Vacio"}</p>
                        <p>Detalles del Telefono: {order.phonedetails}</p>
                        <p>Contraseña del Dispositivo: {order.devicepassword}</p>
                        <p>Problema: {order.issue}</p>
                        <p>Fecha de Creacion: {order.createdAt}</p>
                        <p>Fecha de Actualizacion: {order.updatedAt}</p>
                        <p>Observaciones Adicionales: {order.aditionalObservation}</p>
                        <p>Reparaciones Realizadas: {order.donerepairments}</p>
                        <p>Por pagar: {order.topay}</p>
                        <p>Pagado: {order.payed}</p>
                       {editingOrderId === order.id ? (
                         
                          <form  className="flex flex-row flex-wrap gap-2 justify-around" onSubmit={this.handleEditSubmit}>
                            
                            <div className='flex flex-col w-full sm:w-full md:w-full lg:w-full mb-2'>
                            <label htmlFor="status"  className='labelinput-custom'>Status:</label>
                            <input name="status"
                            id='clientname' 
                            value={editFormData.status}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />

                            <label htmlFor="clientname"  className='labelinput-custom'>Cliente:</label>
                            <input name="clientname"
                            id='clientname' 
                            value={editFormData.clientname}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />

                            <label htmlFor="clientdni"  className='labelinput-custom'>Dni:</label>
                            <input name="clientdni"
                            id='clientdni' 
                            value={editFormData.clientdni}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="email"  className='labelinput-custom'>Email:</label>
                            <input name="email"
                            id='email' 
                            value={editFormData.email}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="phone"  className='labelinput-custom'>Telefono:</label>
                            <input name="phone"
                            id='phone' 
                            value={editFormData.phone}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="deviceType"  className='labelinput-custom'>Tipo de Dispositivo:</label>
                            <input name="deviceType"
                            id='deviceType' 
                            value={editFormData.deviceType}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="model"  className='labelinput-custom'>Modelo:</label>
                            <input name="model"
                            id='model' 
                            value={editFormData.model}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="serial"  className='labelinput-custom'>Serial:</label>
                            <input name="serial"
                            id='serial' 
                            value={editFormData.serial}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="phonedetails"  className='labelinput-custom'>Detalles Telefono:</label>
                            <input name="phonedetails"
                            id='phonedetails' 
                            value={editFormData.phonedetails}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="devicepassword"  className='labelinput-custom'>Clave Equipo:</label>
                            <input name="devicepassword"
                            id='devicepassword' 
                            value={editFormData.devicepassword}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 
                            <label htmlFor="issue"  className='labelinput-custom'>Problema:</label>
                            <input name="issue"
                            id='issue' 
                            value={editFormData.issue}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            /> 

                            <label htmlFor="aditionalObservation"  className='labelinput-custom'>Observaciones Adicionales:</label>
                            <input name="aditionalObservation"
                            id='aditionalObservation' 
                            value={editFormData.aditionalObservation}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />
                            <label htmlFor="donerepairments" className='labelinput-custom'>Reparaciones Hechas:</label>
                            <input 
                            name='donerepairments'
                            id='donerepairments'
                            value={editFormData.donerepairments}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />
                            <label htmlFor="topay" className='labelinput-custom'>A Pagar:</label>
                            <input  
                            name='topay'
                            id='topay'
                            value={editFormData.topay}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />
                            <label htmlFor="payed" className='labelinput-custom'>Pagado:</label>
                            <input
                            name='payed'
                            id='payed'
                            value={editFormData.payed}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                            />
                            </div>
                            <button className='btn-custom' type='submit'>Guardar</button>
                          </form>
                        
                        ) : (
                        <>
                        <div className='w-full flex justify-center mt-4'>
                          <button className='btn-custom' onClick={() => this.handleEdit(order)}>Editar</button>
                        </div>
                        </>
                        )}
                        <div className='w-full flex justify-center mt-4'>
                          <button className='btn-custom' onClick={() => this.handleDelete(order.id)}>Eliminar</button>
                        </div>
                        <div className='w-full flex justify-center mt-4'>
                        <ReactToPrint
                        trigger={() => <button className='btn-custom'>Imprimir Orden</button>}
                        content={() => this.componentRef.current}
                        />
                        </div>
                        <div style={{display: 'none'}}>
                          <PrintableOrder ref={this.componentRef} order={order}/>
                        </div>
                    </li>
                ))}
            </ul>
            {ordersData && (
              <Pagination
                currentPage={ordersData.actualPage}
                totalPages={ordersData.totalPages}
                onPageChange={this.changePage}
              />
            )

            }
        </div>
      )
  }
}

export default OrdersShowCase

/*onPageChange={this.changePage.bind(this)}: bind(this) es un método en JavaScript que crea una nueva función donde el valor de this está vinculado al objeto proporcionado como argumento, independientemente de cómo se llame la función. En el contexto de React y componentes de clase, bind(this) se usa comúnmente para asegurar que los métodos de la clase mantengan la referencia correcta a this cuando se pasan como callbacks, como en el caso de los manejadores de eventos. Al usar this.changePage.bind(this), estás creando una nueva función donde this siempre se refiere a la instancia actual del componente, evitando problemas de contexto cuando el método se ejecuta en respuesta a eventos.Esta técnica garantiza que el método changePage tenga acceso al estado y a otros métodos del componente cuando se llama, incluso si se pasa como referencia a otro componente o se usa como callback en un evento.*/