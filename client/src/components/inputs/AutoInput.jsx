import React from 'react';


const AutoInput = (props) => {

    const {
        type="input",
        name,
        itemName=name,
        placeholder,
        buttonText="Add",
        label,
        value,
        inputClass,
        labelClass,
        errorMessage,
        onChange,
        className
    } = props;

    const [state, setState] = React.useState({
        items: [
            {name: itemName + " 1", value: "", language: "English", id: 1, quality: "HD"}
        ]
    })


    // it should be own state

    // ********** store default value ********
    React.useEffect(()=>{
        if(value && Array.isArray(value)){
            let items = []
            let id = 1
            for (let item of value){
                if(item.value){
                    items.push({
                        value: item.value,
                        id: id,
                        language: item.language,
                        quality: item.quality,
                        name: itemName +" "+ id
                    })
                    id++
                }
            }
            if(items.length) {
                setState({ ...state, items: items })
            }
        }
    }, [value])


    // ********** add new field ********
    function handleMoreInput(e){
        setState({
            ...state,
            items: [
                ...state.items, {
                    name: itemName + " " + (state.items.length + 1),
                    value: "",
                    quality: "",
                    id: state.items.length + 1
                }
            ]
        })
    }


    // ********** handle store change value ********
    function handleChangeField(e, ite, field){

        // field = value | quality | "language"
        let updateState = {...state}
        let inputIndex = updateState.items.findIndex(item=>item.name === ite.name);

        ite[field] = e.target.value;
        updateState.items[inputIndex] = ite;
        

   
        onChange && onChange({target: {value: updateState.items, name: name}})
       
    }


    return (
        <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            { label && (
                <label
                    htmlFor={`${itemName}-1`}
                    className={`${labelClass} block w-40 font-medium text-gray-200 mb-2 md:mb-0`} >{label}
                </label>
            ) }
            <div className="w-full">
                { state.items.map((item, index)=>(
                    <div key={index} className="flex justify-between">
                        <div className="w-full">
                            <label htmlFor={`${itemName}-${index + 1}`}>{`${itemName}-${index + 1}`}</label>
                            <input
                                className={`${inputClass} input input-bordered input-primary w-full text-gray-300 mb-2`}
                                name={name}
                                value={item.value}
                                type={type}
                                id={`${itemName}-${index + 1}`}
                                placeholder={`${placeholder} ${index + 1}`}
                                onChange={(e)=>handleChangeField(e, item, "value")}
                            />
                        </div>
                        <div className="ml-4">
                            <label htmlFor={`languange-${index + 1}`}>{`Languange`}</label>
                            <input
                                className={`${inputClass} input input-bordered input-primary w-full text-gray-300 mb-2`}
                                value={item.language}
                                type={type}
                                id={`languange-${index + 1}`}
                                placeholder={`Languange ${index + 1}`}
                                onChange={(e)=>handleChangeField(e, item, "language")}
                            />
                        </div>
                        <div className="ml-4">
                            <label htmlFor={`Quality-${index + 1}`}>{`Quality`}</label>
                            <input
                                className={`${inputClass} input input-bordered input-primary w-full text-gray-300 mb-2`}
                                value={item.quality}
                                type={type}
                                id={`Quality-${index + 1}`}
                                placeholder={`Quality ${index + 1}`}
                                onChange={(e)=>handleChangeField(e, item, "quality")}
                            />
                        </div>
                    </div>
                )) }
                <button onClick={handleMoreInput} type="button" className="bg-neutral-focus px-3 py-1 rounded-md">{buttonText}</button>
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span> }
                </div>
            </div>
        </div>
    );
};

export default AutoInput;