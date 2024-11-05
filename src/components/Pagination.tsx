import React from 'react'


interface PaginationProps {//Esta interfaz define la estructura de las propiedades que el componente de Paginación espera recibir:
    currentPage: number;//1. currentPage: number: Representa el número de la página actual que se está mostrando.
    totalPages: number;//2. totalPages: number: Indica el número total de páginas disponibles.
    onPageChange: (page: number) => void;//3. onPageChange: (page: number) => void: Es una función que se llamará cuando se solicite un cambio de página. Recibe como argumento el número de la nueva página y no devuelve nada (void).
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-x-4'>
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='btn-pagination bg-arrow-left bg-no-repeat bg-center'
        >
            <span className='w-5 h-5'></span>
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='btn-pagination bg-arrow-right bg-no-repeat bg-center'
        >
            <span className='w-5 h-5'></span>
        </button>
    </div>
)
}

export default Pagination