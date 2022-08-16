import React from 'react'

function MultiSelect({ name, value, label, placeholder, className, onChange, options, errorMessage }) {

    const [isOpen, setOpen] = React.useState(false)

    function onClick(item, e){
        e.stopPropagation();
        let updateState = []
        if(value && Array.isArray(value)){
            updateState = [...value]
        }
        let index = updateState.findIndex(v=>v._id === item._id);
        if(index === -1){
            updateState.push(item)
        } else {
            updateState.splice(index, 1)
        }
        setOpen(false)
        onChange && onChange({target: {value: updateState, name: name}})

    }

    function deleteSelectedInput(item){
        let newState = value && value.filter(v=>v._id !== item._id)
        onChange && onChange({target: {value: newState, name: name}})
    }

    function handleToggleSelect(e){
        setOpen(!isOpen)
    }

    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name} className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label>
            <div className="w-full">

                <div className="flex flex-wrap gap-x-1 gap-y-1 mb-1">
                    {value && value.map((v, i) => (
                        <li key={i} className="list-none flex items-center px-2 bg-primary rounded ">
                            <span className="mr-2 text-white">{v.name}</span>
                            <svg
                                onClick={() => deleteSelectedInput(v)}
                                className="w-2 fill-white cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" /></svg>
                        </li>
                    ))}
                </div>

                <div className="select select-primary shrink w-full text-gray-300 relative flex items-center"
                     placeholder={placeholder}
                    onClick={handleToggleSelect}
                >
                    {placeholder}
                    {isOpen && <ul className="absolute top-12 left-0 bg-neutral w-full p-4 shadow-11xl">
                        {options(onClick)}
                    </ul>}
                </div>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span>}
                </div>
            </div>
        </div>
    )
}

export default MultiSelect