import * as React from 'react';
import { Component } from 'react';
import type { SaledDevice } from '../types/database';
import Pagination from './Pagination';
import LoadingSpinerAtom from './LoadingIcon';
import { ConfirmationToast, Toast } from './ToastContainer';

interface Props {
    user: {
        isAdmin: boolean;
    };
}

interface State {
    devicesData: {
        devices: SaledDevice[];
        actualPage: number;
        totalPages: number;
    } | null;
    isLoading: boolean;
    error: string | null;
    editingDeviceId: string | null;
    editFormData: Partial<SaledDevice> | null;
    expandedCards: Set<string>;
    showToast: boolean;
    toastMessage: string;
    toastType: string;
    toastColor?: string;
    deviceToDelete: string | null;
    showGenericToast: boolean;
    genericToastMessage: string;
    genericToastType: string;
    searchQuery: string;
}

class SaledDevicesShowCase extends Component<Props, State> {
    state: State = {
        devicesData: null,
        isLoading: true,
        error: null,
        editingDeviceId: null,
        editFormData: null,
        expandedCards: new Set(),
        showToast: false,
        toastMessage: '',
        toastType: '',
        toastColor: 'text-white',
        deviceToDelete: null,
        showGenericToast: false,
        genericToastMessage: '',
        genericToastType: 'info',
        searchQuery: '',
    };

    componentDidMount() {
        this.fetchDevices(1, this.state.searchQuery);
    }

    async fetchDevices(page: number = 1, searchQuery: string = '') {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(`api/getSaledDevices?pagina=${page}&search=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) throw new Error('Fallo al cargar los dispositivos');
            const data = await response.json();
            this.setState({ devicesData: data, isLoading: false });
        } catch (err: unknown) {
            if (err instanceof Error) this.setState({ error: err.message, isLoading: false });
        }
    }

    handleToggleCard = (deviceId: string) => {
        this.setState(prevState => {
            const newExpandedCards = new Set(prevState.expandedCards);
            if (newExpandedCards.has(deviceId)) {
                newExpandedCards.delete(deviceId);
            } else {
                newExpandedCards.add(deviceId);
            }
            return { expandedCards: newExpandedCards };
        });
    }

    handleDeleteClick = (deviceId: string) => {
        this.setState({
            showToast: true,
            toastMessage: '¿CONFIRMA LA ELIMINACIÓN DEL REGISTRO?',
            toastType: 'warning',
            deviceToDelete: deviceId,
        });
    }

    handleConfirmDelete = () => {
        if (this.state.deviceToDelete) {
            this.handleDelete(this.state.deviceToDelete);
            this.setState({ showToast: false, deviceToDelete: null });
        }
    }

    handleDelete = async (deviceId: string) => {
        try {
            const response = await fetch('/api/deleteSaledDevice', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: deviceId }),
            });
            if (response.ok) {
                this.setState({
                    showGenericToast: true,
                    genericToastMessage: `Registro eliminado con éxito.`,
                    genericToastType: 'success',
                });
                setTimeout(() => this.setState({ showGenericToast: false }), 5000);
                this.fetchDevices(this.state.devicesData?.actualPage || 1, this.state.searchQuery);
            } else {
                throw new Error('Error al eliminar el registro');
            }
        } catch (error) {
            console.error('Error eliminando:', error);
            this.setState({
                showGenericToast: true,
                genericToastMessage: 'Error al eliminar el registro.',
                genericToastType: 'error',
            });
            setTimeout(() => this.setState({ showGenericToast: false }), 5000);
        }
    }

    handleEdit = (device: SaledDevice) => {
        this.setState({
            editingDeviceId: device.id,
            editFormData: { ...device },
        });
    }

    handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            editFormData: prevState.editFormData ? { ...prevState.editFormData, [name]: value } : { [name]: value }
        }));
    }

    handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('api/updateSaledDevice', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.editFormData),
        });

        if (response.ok) {
            const updatedDevice = await response.json();
            this.setState(prevState => ({
                devicesData: prevState.devicesData ? {
                    ...prevState.devicesData,
                    devices: prevState.devicesData.devices.map(d => d.id === updatedDevice.id ? updatedDevice : d)
                } : null,
                editingDeviceId: null,
                editFormData: null,
            }));
            this.setState({
                showGenericToast: true,
                genericToastMessage: `Registro actualizado con éxito.`,
                genericToastType: 'success',
            });
            setTimeout(() => this.setState({ showGenericToast: false }), 5000);
        } else {
            this.setState({
                showGenericToast: true,
                genericToastMessage: 'Error al actualizar el registro.',
                genericToastType: 'error',
            });
            setTimeout(() => this.setState({ showGenericToast: false }), 5000);
        }
    }

    changePage = (newPage: number) => {
        if (this.state.devicesData && newPage >= 1 && newPage <= this.state.devicesData.totalPages) {
            this.fetchDevices(newPage, this.state.searchQuery);
        }
    }

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        this.setState({ searchQuery }, () => {
            this.fetchDevices(1, this.state.searchQuery);
        });
    }

    render() {
        const { devicesData, isLoading, error, editFormData, editingDeviceId } = this.state;

        if (isLoading) return <LoadingSpinerAtom />;
        if (error) return <div>Error: {error}</div>;

        const renderDeviceFields = (device: SaledDevice) => (
            <>
                <p>Cliente: <span>{device.clientname}</span></p>
                <p>Dispositivo: <span>{device.devicename}</span></p>
                <p>DNI: <span>{device.clientdni}</span></p>
                <p>Teléfono: <span>{device.clientphone}</span></p>
                <p>Fecha Venta: <span>{device.saledate}</span></p>
                <p>Marca: <span>{device.brand}</span></p>
                <p>Modelo: <span>{device.model}</span></p>
                <p>Serial: <span>{device.serial}</span></p>
                <p>IMEI 1: <span>{device.imei1}</span></p>
                <p>IMEI 2: <span>{device.imei2}</span></p>
                <p>Condición: <span>{device.condition_details}</span></p>
                <p>Precio: <span>{device.currency === 'USD' ? 'U$S' : '$'} {Number(device.price || 0).toLocaleString('es-AR')}</span></p>
                <p>Método Pago: <span>{device.paymentmethod}</span></p>
                <p>Moneda: <span>{device.currency === 'USD' ? 'Dólares (USD)' : 'Pesos (ARS)'}</span></p>
                <p>Fecha Entrega: <span>{device.deliverydate}</span></p>
                <p>Descripción: <span>{device.description}</span></p>
            </>
        );

        const renderEditFormFields = (formData: Partial<SaledDevice>) => (
            Object.keys(formData).map(key => {
                if (key === 'id' || key === 'saledate') return null;
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');

                if (key === 'currency') {
                    return (
                        <div key={key} className="w-full">
                            <label htmlFor={key} className='labelinput-custom'>{label}:</label>
                            <select name="currency" value={formData.currency} onChange={this.handleEditChange} className='form-inputbox'>
                                <option value="ARS">Pesos (ARS)</option>
                                <option value="USD">Dólares (USD)</option>
                            </select>
                        </div>
                    );
                }

                return (
                    <div key={key} className="w-full">
                        <label htmlFor={key} className='labelinput-custom'>{label}:</label>
                        <input
                            type={key === 'price' ? 'number' : (key === 'deliverydate' ? 'date' : 'text')}
                            name={key}
                            id={key}
                            value={formData[key as keyof SaledDevice] || ''}
                            onChange={this.handleEditChange}
                            className='form-inputbox'
                        />
                    </div>
                );
            })
        );

        return (
            <div className='order-container'>
                <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center ">
                    <label htmlFor="search" className="block font-extrabold text-gray-700 dark:text-gray-200 mb-2">Buscar Dispositivo Vendido</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Buscar por Cliente, DNI, Serial o IMEI..."
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        className="form-inputbox w-full"
                    />
                </div>
                <h2 className='titles-styles'>DISPOSITIVOS VENDIDOS</h2>
                <ul className='order-ul-styles'>
                    {devicesData?.devices.map((device) => (
                        <li key={device.id}>
                            <div className='order-card group'>
                                <div className='order-list-item'>
                                    {editingDeviceId === device.id && editFormData ? (
                                        <form className="flex flex-col gap-2" onSubmit={this.handleEditSubmit}>
                                            {renderEditFormFields(editFormData)}
                                            <div className="flex gap-2 mt-2">
                                                <button className='btn-custom' type='submit'>Guardar</button>
                                                <button className='btn-custom' type='button' onClick={() => this.setState({ editingDeviceId: null, editFormData: null })}>Cancelar</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            {renderDeviceFields(device)}
                                            {this.props.user.isAdmin && (
                                                <div className='order-buttons-group mt-4'>
                                                    <button className='btn-custom' onClick={() => this.handleEdit(device)}>Editar</button>													
                                                    <button className='btn-custom' onClick={() => this.handleDeleteClick(device.id)}>Eliminar</button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {devicesData && (
                    <div className='order-pagination-component'>
                        <Pagination
                            currentPage={devicesData.actualPage}
                            totalPages={devicesData.totalPages}
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
                        onCancel={() => this.setState({ showToast: false, deviceToDelete: null })}
                    />
                )}
                {this.state.showGenericToast && (
                    <Toast
                        message={this.state.genericToastMessage}
                        type={this.state.genericToastType}
                        positionV="top"
                        positionH="end"
                        color={this.state.toastColor}
                        onClose={() => this.setState({ showGenericToast: false })}
                    />
                )}
            </div>
        )
    }
}

export default SaledDevicesShowCase;