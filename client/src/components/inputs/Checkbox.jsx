import React from 'react'

function CheckboxGroup({ name, label, value, options, inputClass, errorMessage, onChange, className }) {
    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name} className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label>
            <div className="w-full">
                <div className="w-full flex gap-x-4">
                { options && options.map((option, i)=>(
                     <div className="flex items-center" key={i}>
                        <input
                            type="radio"
                            name={name}
                            className={`${inputClass} mr-2 radio radio-primary`}
                            id={option}
                            checked={value === option}
                            onChange={() => onChange({ target: { name: name, value: option } })}
                        />
                        <label htmlFor={option}>{option.toLowerCase()}</label>
                    </div>
                )) }
                </div>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span>}
                </div>
            </div>
        </div>
    )
}

export default CheckboxGroup

