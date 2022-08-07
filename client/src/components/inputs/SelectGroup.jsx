import React from 'react'

function SelectGroup({ name, value, label, placeholder, className, onChange, options, errorMessage }) {
    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name} className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label>
            <div className="w-full">
                <select className="select select-primary shrink w-full text-gray-300"
                    name={name}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}>
                    {options()}
                </select>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span>}
                </div>
            </div>
        </div>
    )
}

export default SelectGroup