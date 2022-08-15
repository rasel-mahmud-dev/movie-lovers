import React from 'react'

function TextArea({name, label, value, inputClass, errorMessage, placeholder, onChange, className}) {
  return (
        <div className={`mt-4 flex items-start flex-col md:flex-row ${className}`} >
            {label && <label htmlFor={name}  className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label> }
            <div className="w-full">
                <textarea 
                    name={name}
                    value={value} 
                    id={name}
                    placeholder={placeholder} 
                    onChange={onChange}
                    className={`textarea textarea-primary w-full h-32 text-gray-300 ${inputClass}`} 
                ></textarea>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error ">{errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default TextArea