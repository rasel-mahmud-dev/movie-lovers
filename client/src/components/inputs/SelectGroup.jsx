import React from 'react'

function SelectGroup({name, value, label, placeholder, onChange, options}) {
    return (
        <div className="mt-4 flex items-start" >
            <label htmlFor=""  className="block w-40 font-medium text-gray-200" >{label}</label>
            <select class="select select-primary shrink w-full text-gray-300"
                name={name}
                value={value} 
                placeholder={placeholder} 
                onChange={onChange}>
                { options() }
            </select>
        </div>
    )

    
}

export default SelectGroup