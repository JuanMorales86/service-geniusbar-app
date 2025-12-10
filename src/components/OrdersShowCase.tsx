import * as React from 'react';
import { Component } from 'react';
import type { ServiceOrder } from '../types/database';//import type { ServiceOrder } ... tells TypeScript that you are only importing the ServiceOrder type and not any values from the '../types/database' module.
import Pagination from './Pagination';
import LoadingSpinerAtom from './LoadingIcon';
import PrinterWrapper from './PrinterWrapper';
import {ConfirmationToast, Toast} from './ToastContainer';
const cl = console.log.bind(console)
interface Props {
  user: {
    isAdmin: boolean;
  };
}

const statuslabels = [
  {value: 0, label: "Pendiente"},
  {value: 1, label: "En Proceso"},
  {value: 2, label: "Reparado"},
  {value: 3, label: "Reparacion Anulado por el Cliente"},
  {value: 4, label: "Sin Reparación en Devolucion"},
  {value: 5, label: "Reparacion Pospuesta a Espera del Cliente"},
  {value: 6, label: "Entregado y Retirado por el Cliente"},
  {value: 7, label: "Devolución a Pedido del Cliente"},
  {value: 8, label: "Devolución sin Reparacion"},
  {value: 9, label: "Reparación Exitosa a Espera del Cliente"},
  {value: 10, label: "En Diagnostico"},
  {value: 11, label: "En reparacion con Terceros"},
  {value: 12, label: "Reparación Anulada por Terceros"},
  {value: 13, label: "Reparación Fallida"},
]


interface State {//Agregar estados de inteface
    ordersData: {
      ordenes: ServiceOrder[];
      actualPage: number;
      totalPages: number;
    } | null;
    isLoading: boolean;
    error: string | null;
    editingOrderId: null;
    editFormData: Partial<ServiceOrder> | null;
    selectedOrderForModal: ServiceOrder | null;
    showToast: boolean;
    toastMessage: string;
    toastType: string;
    toastColor: string;
    orderToDelete: string | null;
    showGenericToast: boolean;
    genericToastMessage: string;
    genericToastType: string;
    searchQuery: string;
}




class OrdersShowCase extends Component<Props, State> {
  state: State = {//Agregar estados de inteface iniciales
    ordersData: null,
    isLoading: true,
    error: null,
    editingOrderId: null,
    editFormData: null,
    selectedOrderForModal: null,
    showToast: false,
    toastMessage: '',
    toastType: '',
    toastColor: 'text-white',
    orderToDelete: null,
    showGenericToast: false,
    genericToastMessage: '',
    genericToastType: 'info',
    searchQuery: '',
    
  }


  componentRef = React.createRef<HTMLDivElement>();

  handleDeleteClick = (orderId: string) => {
    this.setState({
      showToast: true,
      toastMessage: 'CONFIRMA LA ELIMINACION DE LA ORDEN',
      toastType: 'warning',
      orderToDelete: orderId,
    });
  }

  handleConfirmDelete = () => {
    if (this.state.orderToDelete) {
       this.setState({ showToast: false, orderToDelete: null });
       this.handleDelete(this.state.orderToDelete);
    }
  }

  handleDelete = async (orderId: string) => {
      try {
        const orderToDelete = this.state.ordersData?.ordenes.find(o => o.id === orderId);

        const response = await fetch('api/deleteOrders', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: orderId}),
        });
        if (response.ok) {
          this.setState({
            showGenericToast: true,
            genericToastMessage: `Orden N° ${orderToDelete?.ordernumber || ''} eliminada con éxito.`,
            genericToastType: 'success',
          });
          setTimeout(() => this.setState({ showGenericToast: false }), 5000);

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
        this.setState({
          showGenericToast: true,
          genericToastMessage: 'Error al eliminar la orden.',
          genericToastType: 'error',
        });
        setTimeout(() => this.setState({ showGenericToast: false }), 5000);
      }
  }

  handleEdit = (order: ServiceOrder) => {
    //cl('orden editando:', order)
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


  handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const {name} = e.target;
    let value

    //condicional que verifica el tipo de elemento del formulario que esta siendo modificado
    //si es un menu, desplegable (select), obtiene el texto mostrado de la opcion seleccionada
    //si es input normal, obtiene su valor directo
    if (e.target instanceof HTMLSelectElement) {
      const selectedIndex = e.target.selectedIndex;// Obtiene la posición de la opción seleccionada
      value = e.target.options[selectedIndex].text;// Obtiene el texto de esa opción
    } else {
      value = e.target.value; // Para inputs normales, solo obtiene el valor del input
    } 

    //cl('edit change:', name, value)
    this.setState(prevState => ({
      editFormData: prevState.editFormData ? {
        ...prevState.editFormData,
        [name]: value,
      } : { [name]: value }
    }));
  }

  handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //cl('summiting edit:', this.state.editFormData)
    const response = await fetch('api/getOrders', {
      method: 'PUT',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.editFormData)
    });


    if (response.ok) {
      const updatedOrder = await response.json();
      //cl('updated Order:', updatedOrder)
      this.setState(prevState => ({
        ordersData: prevState.ordersData ? {
          ...prevState.ordersData,
          ordenes: prevState.ordersData.ordenes.map(order => order.id === updatedOrder.id ? updatedOrder : order)
        } : null,
        editingOrderId: null, //Resetaer el estado editingOrderId
        editFormData: null, // Borrar form data
      }));
     
      this.setState({
        showGenericToast: true,
        genericToastMessage: `Orden N° ${updatedOrder.ordernumber} actualizada con éxito.`,
        genericToastType: 'success',
      });
      setTimeout(() => this.setState({ showGenericToast: false }), 5000);
  } else {
    this.setState({
        showGenericToast: true,
        genericToastMessage: 'Error al actualizar la orden.',
        genericToastType: 'error',
      });
    setTimeout(() => this.setState({ showGenericToast: false }), 5000);
  }
}

  componentDidMount() {  
    this.fetchOrders(1, this.state.searchQuery);
  }


  async fetchOrders(page: number = 1, searchQuery: string = '')
/*Al definir fetchOrders(page: number = 1), estás estableciendo un valor predeterminado para el parámetro page. Esto significa que si se llama a fetchOrders() sin ningún argumento, automáticamente usará 1 como valor para page.

  Este enfoque tiene dos beneficios principales:
  
  Garantiza que siempre haya un número de página válido, incluso si no se proporciona uno explícitamente.
  Permite que la primera carga de datos (que generalmente es la página 1) se pueda hacer simplemente llamando a fetchOrders() sin argumentos.
  Es una práctica común en la implementación de paginación, ya que proporciona un comportamiento predecible y fácil de manejar tanto para la carga inicial como para las navegaciones subsiguientes entre páginas.*/ 
  {
    try {
        const response = await fetch(`api/getOrders?pagina=${page}&search=${encodeURIComponent(searchQuery)}`)//This change allows fetchOrders to accept a page number and use it in the API request. The default value of 1 ensures it works as before when called without arguments. Now your changePage method will work correctly with the updated fetchOrders.
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
    this.fetchOrders(newPage, this.state.searchQuery)
  }
}

handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchQuery = e.target.value;
  this.setState({ searchQuery }, () => {
    // Esta función se ejecuta después de que el estado se haya actualizado.
    this.fetchOrders(1, this.state.searchQuery); // Reinicia a la página 1 en cada nueva búsqueda.
  });
}

render() {
      //cl('User prop in render:', this.props.user.isAdmin)
      const { ordersData, isLoading, error, editFormData, editingOrderId, selectedOrderForModal } = this.state;

      if (isLoading) {
        return <LoadingSpinerAtom/>;
      }

      if (error) {
        return <div>Error: {error}</div>
      }

      return (
        <div className='order-container'>
            <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center ">
              <label htmlFor="search" className="block font-extrabold text-gray-700 dark:text-gray-200 mb-2">Buscar Orden</label>
              <input
                type="text"
                id="search"
                placeholder="Buscar por N° Orden, Cliente, DNI o Teléfono..."
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
                className="form-inputbox w-full"
              />
            </div>
            <h2 className='titles-styles'>ORDENES</h2>
            <ul className='order-ul-styles'>
                {ordersData?.ordenes.map((order) => (
                    <li key={order.id}>
                
                      <div className='order-card group'>
                       
                        <div className='order-list-item'>
                        <p className='text-center text-xl text-sky-500'><span>{order.ordernumber}</span></p>
                        <p>Status: <span>{order.status}</span></p>
                        <p>Cliente: <span>{order.clientname}</span></p>
                        <p>Dni: <span>{order.clientdni}</span></p>
                        <p>Modelo: <span>{order.model}</span></p>
                        <p>Problema: <span>{order.issue}</span></p>

                        <button onClick={() => this.setState({ selectedOrderForModal: order })} className="btn-custom mt-4">
                          🔽Mostrar Más
                        </button>
                        </div>
                        
                   
                   
                      <div className='order-editing-card-group'>
                      {this.props.user.isAdmin ? (
                        <>
                        {editingOrderId === order.id ? (
                            <form  className="flex flex-row flex-wrap gap-2 justify-around" onSubmit={this.handleEditSubmit}>
                              <p className='order-list-item-detailed'>ID de Sistema: <span>{order.id}</span></p>
                              <div className='flex flex-col w-full sm:w-full md:w-full lg:w-full mb-2'>
                              <label htmlFor="status"  className='labelinput-custom'>Status:</label>

                              <select name="status"
                              id='clientname' 
                              value={editFormData.status}
                              onChange={this.handleEditChange}
                              className='form-inputbox pointer-events-none group-hover:pointer-events-auto'
                              >
                              <optgroup label='Estado del servicio' className='form-inputbox optgroup'>
                              {
                                  statuslabels.map((statuslabel) => (
                                          <option 
                                          value={statuslabel.label} 
                                          key={statuslabel.value}
                                          selected={editFormData.status === statuslabel.label}
                                          >
                                          
                                          {statuslabel.label}
                                          </option>
                                      )
                                  )
                              }
                          </optgroup>
                              </select>
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
                              <button className='btn-custom' type='button' onClick={() => this.setState({
                                editingOrderId: null,
                                editFormData: null,
                                selectedOrderForModal: null,
                              })}>Cancelar</button>
                            </form>
                          
                          ) : (
                          <>
                          <div className='order-buttons-group'>
                            <button className='btn-custom' onClick={() => this.handleEdit(order)}>Editar</button>
                            <button className='btn-custom' onClick={() => this.handleDeleteClick(order.id)}>Eliminar</button>
                            <PrinterWrapper order={order}/>
                          </div>
                          </>
                          )}
                        
                        </>

                      ) : (
                        <div className='order-status-info'>
                        <span className="status-badge">Estado: {order.status}</span>
                        <span className="payment-info">Saldo a pagar: ${Number(order.topay || 0).toLocaleString('es-AR')} Pesos</span>
                        <span className="contact-support">Soporte: +54 11-2356-0959</span>
                      </div>
                        
                      )}

                      </div>
                      
                     
                    </div>
                        {/* Wrap buttons in a container with hover effects */}
                    </li>
                ))}
            </ul>
            {ordersData && (
              <div className='order-pagination-component'>
                <Pagination
                  currentPage={ordersData.actualPage}
                  totalPages={ordersData.totalPages}
                  onPageChange={this.changePage}
                />
              </div>
            )}
            {this.state.showToast && (
              <ConfirmationToast
                message={this.state.toastMessage}
                type={this.state.toastType}
                positionV="middle"
                positionH="center"
                color={this.state.toastColor}
                onConfirm={this.handleConfirmDelete}
                onCancel={() => this.setState({ showToast: false, orderToDelete: null })}
              />
            )}
            {this.state.showGenericToast && (
              <Toast
                message={this.state.genericToastMessage}
                type={this.state.genericToastType}
                positionV="top"
                positionH="end"
                onClose={() => this.setState({ showGenericToast: false })}
                color={this.state.toastColor}
              />
            )}
            {selectedOrderForModal && (
              <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={() => this.setState({ selectedOrderForModal: null })}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Detalles de la Orden N° {selectedOrderForModal.ordernumber}</h3>
                    <button onClick={() => this.setState({ selectedOrderForModal: null })} className="text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl font-bold">&times;</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-200">
                      <p><strong>Status:</strong> <span>{selectedOrderForModal.status}</span></p>
                      <p><strong>Cliente:</strong> <span>{selectedOrderForModal.clientname}</span></p>
                      <p><strong>DNI:</strong> <span>{selectedOrderForModal.clientdni}</span></p>
                      <p><strong>Email:</strong> <span>{selectedOrderForModal.email}</span></p>
                      <p><strong>Teléfono:</strong> <span>{selectedOrderForModal.phone}</span></p>
                      <p><strong>Tipo de Dispositivo:</strong> <span>{selectedOrderForModal.deviceType}</span></p>
                      <p><strong>Modelo:</strong> <span>{selectedOrderForModal.model}</span></p>
                      <p><strong>Serial Equipo:</strong> <span>{ selectedOrderForModal.serial || "Vacio"}</span></p>
                      <p className="md:col-span-2"><strong>Detalles del Teléfono:</strong> <span>{selectedOrderForModal.phonedetails}</span></p>
                      <p><strong>Contraseña del Dispositivo:</strong> <span>{selectedOrderForModal.devicepassword}</span></p>
                      <p className="md:col-span-2"><strong>Problema:</strong> <span>{selectedOrderForModal.issue}</span></p>
                      <p><strong>Fecha de Creación:</strong> <span>{selectedOrderForModal.createdAt || 'N/A'}</span></p>
                      <p><strong>Última Actualización:</strong> <span>{selectedOrderForModal.updatedAt || 'N/A'}</span></p>
                      <p className="md:col-span-2"><strong>Observaciones Adicionales:</strong> <span>{selectedOrderForModal.aditionalObservation}</span></p>
                      <p className="md:col-span-2"><strong>Reparaciones Realizadas:</strong> <span>{selectedOrderForModal.donerepairments}</span></p>
                      <p className="font-bold text-green-600"><strong>A pagar:</strong> <span>${Number(selectedOrderForModal.topay || 0).toLocaleString('es-AR')}</span></p>
                      <p className="font-bold text-blue-600"><strong>Pagado:</strong> <span>${Number(selectedOrderForModal.payed || 0).toLocaleString('es-AR')}</span></p>
                  </div>
                  <div className="mt-6 flex justify-end">
                      <button onClick={() => this.setState({ selectedOrderForModal: null })} className="btn-custom">Cerrar</button>
                  </div>
                </div>
              </div>
            )}
        </div>
      )
  }
}

export default OrdersShowCase

/*onPageChange={this.changePage.bind(this)}: bind(this) es un método en JavaScript que crea una nueva función donde el valor de this está vinculado al objeto proporcionado como argumento, independientemente de cómo se llame la función. En el contexto de React y componentes de clase, bind(this) se usa comúnmente para asegurar que los métodos de la clase mantengan la referencia correcta a this cuando se pasan como callbacks, como en el caso de los manejadores de eventos. Al usar this.changePage.bind(this), estás creando una nueva función donde this siempre se refiere a la instancia actual del componente, evitando problemas de contexto cuando el método se ejecuta en respuesta a eventos.Esta técnica garantiza que el método changePage tenga acceso al estado y a otros métodos del componente cuando se llama, incluso si se pasa como referencia a otro componente o se usa como callback en un evento.*/

//<PrintableOrder ref={this.componentRef} order={order}/>

//!movido para prueba por q reacttoprint no funciona directament en el jsx
{/* <div className='w-full flex justify-center mt-4'>
<ReactToPrint
trigger={() => <button className='btn-custom'>Imprimir Orden</button>}
content={() => this.componentRef.current}
/>
</div>
<div style={{display: 'none'}}>
  <PrintableOrder order={order}/>
</div> */}