import React from 'react'
import { api, getApi } from 'src/api';
import InputGroup from 'src/components/inputs/InputGroup';
import  errorMessage from 'src/utils/errorResponse';
import ResponseAlert from 'src/components/ResponseAlert';



function AddGenre(props) {

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
          errorMessage: "Genre Name Required"
        },
        errorMessage: "Genre Name Required"
      })
      return;
    }


    setState({
      ...state,
      httpResponse: "pending",

    })

    getApi().post("/api/add-genre", {name: state.name.value})
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
      <h1 class="font-bold text-3xl text-gray-200 text-center">Add New Genre</h1>
      <form onSubmit={handleSubmit}>

        <ResponseAlert
            className="mt-2"
            message={state.httpResponse}
            statusCode={state.httpStatus}
        />


        <div className="div">
          <InputGroup 
            className="!flex-col gap-y-2"
            name="genre" 
            type="text" 
            label="Genre" 
            placeholder="Enter Genre Name" 
            onChange={(e)=>setState({...state, name: {value: e.target.value}})}
            value={state.name.value}
            errorMessage={state.name.errorMessage}
          />
        </div>
      
        <div className="mt-8">
          { state.httpResponse !== "pending" && <button type='submit' className="btn cursor-pointer text-white">Save</button> }
        </div>
      </form>     
    </div>
  )
}


export default AddGenre;