import { useState } from "react";
import { Toast } from "./ToastContainer";

const paymentMethods = ["Efectivo", "Transferencia", "Tarjeta de Débito", "Tarjeta de Crédito", "Mercado Pago"];

export default function FormSaledDevice() {
    const [formData, setFormData] = useState({
        clientname: '',
        clientdni: '',
        clientphone: '',
        devicename: '',
        deliverydate: '',
        currency: 'ARS',
        brand: '',
        model: '',
        serial: '',
        imei1: '',
        imei2: '',
        condition_details: '',
        price: '',
        paymentmethod: '',
        description: ''
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            clientname: '', clientdni: '', clientphone: '', devicename: '', deliverydate: '', currency: 'ARS',
            brand: '', model: '',
            serial: '', imei1: '', imei2: '', condition_details: '', price: '',
            paymentmethod: '', description: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setShowToast(true);
        setToastMessage('Creando registro...');
        setToastType('info');

        try {
            const response = await fetch('/api/createSaledDevice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setToastMessage('Registro creado con éxito');
                setToastType('success');
                resetForm();
            } else {
                throw new Error('Error al crear el registro');
            }
        } catch (error) {
            console.error('Error en el formulario:', error);
            setToastMessage(error.message || 'Error al crear el registro');
            setToastType('error');
        } finally {
            setTimeout(() => setShowToast(false), 5000);
            setIsSubmitting(false);
        }
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    const navigateToSaledDevices = () => {
        window.location.href = '/saled-devices';
    };

    const renderInput = (name, label, placeholder, type = "text", required = false) => (
        <div className='mb-2'>
            <label htmlFor={name} className="labelinput-custom">{label}:</label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                placeholder={placeholder}
                className="form-inputbox"
            />
        </div>
    );

    return (
        <div className="flex items-center justify-center py-8 mx-auto rounded-lg w-full md:w-4/6 lg:w-3/6 border-accent-dark border-2 border-solid shadow-sm dark:border bg-light-bg dark:bg-dark-bg dark:border-black">
            <form className="flex flex-col gap-3 w-full px-4 sm:px-6" onSubmit={handleSubmit}>
                <div className="w-full flex justify-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Registrar Dispositivo Vendido</h2>
                </div>

                {renderInput("clientname", "Nombre Completo Cliente", "Juan Pérez", "text", true)}
                {renderInput("clientdni", "DNI Cliente", "12.345.678", "text")}
                {renderInput("clientphone", "Teléfono Cliente", "11 2345-6789", "text")}
                {renderInput("devicename", "Nombre del Dispositivo", "Ej: iPhone 14 Pro 256GB", "text", true)}
                {renderInput("deliverydate", "Fecha de Entrega", "", "date")}

                <div className='mb-2'>
                    <label htmlFor="currency" className="labelinput-custom">Moneda:</label>
                    <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="form-inputbox text-center"
                    >
                        <option value="ARS">Pesos (ARS)</option>
                        <option value="USD">Dólares (USD)</option>
                    </select>
                </div>

                {renderInput("brand", "Marca", "Ej: Apple, Samsung", "text")}
                {renderInput("model", "Modelo", "Ej: SM-../A2694", "text")}
                {renderInput("serial", "Serial", "R5CY...", "text")}
                {renderInput("imei1", "IMEI 1", "35...", "text")}
                {renderInput("imei2", "IMEI 2", "35...", "text")}
                {renderInput("condition_details", "Detalles de Condición", "Ej: Nuevo en caja, Usado con marcas", "text")}
                {renderInput("price", "Precio de Venta", "0.00", "number")}

                <div className='mb-2'>
                    <label htmlFor="paymentmethod" className="labelinput-custom">Método de Pago:</label>
                    <select
                        id="paymentmethod"
                        name="paymentmethod"
                        value={formData.paymentmethod}
                        onChange={handleChange}
                        className="form-inputbox text-center"
                    >
                        <option value="">-- Seleccione un método --</option>
                        {paymentMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-2'>
                    <label className="labelinput-custom text-center" htmlFor="description">Descripción Adicional:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea-custom"
                        placeholder="Cualquier otra información relevante..."
                    ></textarea>
                </div>

                <div className="flex justify-center gap-4">
                    <button className="btn-custom" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
                    </button>
                    <button type="button" onClick={() => {
                        resetForm();
                        setToastMessage("Formulario limpiado");
                        setToastType('warning');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                    }} className="btn-custom">
                        Limpiar Formulario
                    </button>
                </div>

                <div className="flex justify-center mt-4">
                    <button type="button" onClick={navigateToSaledDevices} className="btn-custom">
                        Mostrar Dispositivos Vendidos
                    </button>
                </div>
            </form>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    positionV="top"
                    positionH="end"
                    onClose={handleToastClose}
                />
            )}
        </div>
    );
}
