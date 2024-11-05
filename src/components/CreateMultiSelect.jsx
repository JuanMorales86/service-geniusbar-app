import React from 'react'

const CustomMultiSelect = ({options, value, onChange}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState(value);

    React.useEffect(() => {
        setSelectedOptions(value);
    }, [value])

    
    const toggleOption = (option) => {
        const updatedSelection = selectedOptions.includes(option) 
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(updatedSelection);
        onChange(updatedSelection.join(', '));
    }

  return (
    <div className='container-create-multi-select '>
        <label htmlFor="phonedetails" className='labelinput-custom'>
            Detalles del equipo
        </label>
        <div className={`custom-multi-select ${isOpen ? 'open' : ''}`}>
            <div className='select-header' onClick={() => setIsOpen(!isOpen)}>
                {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Seleccionar opciones'}
            </div>
            {isOpen && (
                <div className='options-container rounded-b-md'>
                    {options.map((detail, index) => (
                        <div
                        key={index}
                        className={`option ${selectedOptions.includes(detail.description) ? 'bg-sky-700' : ''}`}
                        onClick={() => toggleOption(detail.description)}
                        >
                            {detail.description}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default CustomMultiSelect;

//className={`option ${selectedOptions.includes(detail.description) ? 'selected' : ''}`}