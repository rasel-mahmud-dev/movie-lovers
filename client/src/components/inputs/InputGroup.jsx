import React from 'react'

function InputGroup({name, type, label, value, errorMessage, placeholder, onChange, className}) {
  return (
        <div className={["mt-4 flex items-start", className].join(" ")} >
            <label htmlFor=""  className="block w-40 font-medium text-gray-200" >{label}</label>
            <input 
                name={name}
                value={value} 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange}
                class="input input-bordered input-primary w-full text-gray-300"
            />
            {errorMessage && <span className="rounded-md text-error bg-white/10 px-4 py-1">{errorMessage}</span> }
        </div>
    )
}

export default InputGroup