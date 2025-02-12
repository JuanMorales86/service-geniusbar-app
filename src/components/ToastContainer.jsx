
const Toast = ({ message, type, positionH, positionV, onClose, color }) => {
    return (
       <div  className={`toast toast-${positionV} toast-${positionH} z-10 transition-all duration-100 ease-in-out`}>
        <div className={`alert alert-${type} backdrop-opacity-10 backdrop-invert bg-transparent`}>
            <span className={`font-bold font-sans text-base ${color || 'text-lime-500/90'}`}>{message}</span>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>Cerrar</button>
        </div>
       </div>
    );
};

const ConfirmationToast = ({ message, type, positionH, positionV, onConfirm, onCancel, color }) => {
    return (
        <div className={`toast toast-${positionV} toast-${positionH} z-10 transition-all duration-300 ease-in-out`}>
            <div className={`alert alert-${type} backdrop-opacity-70  bg-dark-input`}>
              <span className={`font-bold font-apple text-base ${color || 'text-lime-500/90'}`}>{message}</span>
              <div className="flex gap-2">
                <button className="btn btn-success btn-sm" onClick={onConfirm}>Sí</button>
                <button className="btn btn-error btn-sm" onClick={onCancel}>No</button>
              </div>
            </div>
        </div>
    )
}


export {Toast, ConfirmationToast};




/*
dependencia: daisyui

toast	Component	Container element that sticks to the corner of page
toast-start	Responsive	align horizontally to the left
toast-center	Responsive	align horizontally to the center
toast-end	Responsive	align horizontally to the right (default)
toast-top	Responsive	align vertically to top
toast-middle	Responsive	align vertically to middle
toast-bottom	Responsive	align vertically to bottom (default)

 */