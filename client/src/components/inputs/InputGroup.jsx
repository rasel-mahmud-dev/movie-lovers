import React from 'react'

function InputGroup({name, type, label, value, errorMessage, placeholder, onChange, className}) {
  return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label>
            <div className="w-full">
                <input 
                    name={name}
                    value={value} 
                    type={type} 
                    id={name}
                    placeholder={placeholder} 
                    onChange={onChange}
                    className="input input-bordered input-primary w-full text-gray-300"
                />
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span> }
                </div>
            </div>
        </div>
    )
}

export default InputGroup