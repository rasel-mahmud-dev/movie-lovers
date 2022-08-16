import React from 'react'
import { api, getApi } from 'src/api';
import InputGroup from 'src/components/inputs/InputGroup';

import  errorMessage from 'src/utils/errorResponse';
import ResponseAlert from 'src/components/ResponseAlert';


function AddQuality(props) {

  const { setModal, onSave } = props

  const [state, setState] = React.useState({
    name: { value: "", errorMessage: "" },
    httpResponse: "",
    httpStatus: 0
  })

  function handleSubmit(e){
    e.preventDefault();

    setState({
      ...state,
      httpResponse: ""
    })

    if(!state.name.value){
      setState({
        ...state,
        name: {
          value:  "", 
          errorMessage: "quality Name Required"
        },
        errorMessage: "quality Name Required"
      })
      return;
    }

    setState({
      ...state,
      httpResponse: "pending",

    })

    getApi().post("/api/add-quality", {name: state.name.value})
    .then(response=>{
      if(response.status === 201){
        onSave && onSave(response.data)
        setModal("")
      }
      setState({
        ...state,
        httpResponse: ""
      })
    })
    .catch(err=>{
      setState({
        ...state,
        httpResponse: errorMessage(err),
        httpStatus: 500
      })
    })

  }
 
  return (
    <div>
      <h1 className="font-bold text-3xl text-gray-200 text-center">New Quality Label</h1>
      <form onSubmit={handleSubmit}>

      <ResponseAlert
            className="mt-2"
            message={state.httpResponse}
            statusCode={state.httpStatus}
        />

        <div className="div">
          <InputGroup 
            className="!flex-col gap-y-2"
            name="quality" 
            type="text" 
            label="Quality" 
            placeholder="Enter quality label" 
            onChange={(e)=>setState({...state, name: {value: e.target.value}})}
            value={state.name.value}
            errorMessage={state.name.errorMessage}
          />
        </div>
      
        <div className="mt-8">
          { state.loading 
            ? <progress className="progress w-full"></progress>
            : <button type='submit' className="btn cursor-pointer text-white">Save</button> 
          }
        </div>
      </form>     
    </div>
  )
}


export default AddQuality;