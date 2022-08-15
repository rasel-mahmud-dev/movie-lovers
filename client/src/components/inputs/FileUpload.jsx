import React from 'react'
import fullPath  from 'src/utils/fullPath';

function FileUpload({name, label, preview=true, defaultValue, errorMessage, placeholder, onChange, className}) {

    const [base64, setBase64] = React.useState("")


    function handleChange(e){
        let file = e.target.files[0];

        let reader = new FileReader()
        reader.onload = function(event){
            setBase64(event.target.result);
            onChange({target: { name, value: file, base64: event.target.result }});
        }
        reader.readAsDataURL(file)
    }

    function handleCompress(e) {

    }


  return (
        <div>
            <div className={["mt-4 flex items-start flex-col md:flex-row", className].join(" ")} >
            <label htmlFor={name}  className="block w-40 font-medium text-gray-200 mb-2 md:mb-0" >{label}</label>

            <div className="w-full">
                <input 
                    name={name}
                    type="file" 
                    id={name}
                    placeholder={placeholder} 
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full text-gray-300"
                />
                <div className="mt-1">
                    {errorMessage && <span className="rounded-md text-error">{errorMessage}</span> }
                </div>

                { preview && base64 && (
                    <img onLoad={handleCompress} src={base64} className=""  alt="" />
                ) }
                { defaultValue && typeof defaultValue === "string" && !base64 && (
                    <img src={fullPath(defaultValue)} className="" />
                ) }

            </div>
        </div>

            
        

        </div>
    )
}

export default FileUpload