import React from 'react'
import { api, getApi } from 'src/api';
import InputGroup from 'src/components/inputs/InputGroup';

function AddQuality(props) {

  const { setModal, onSave } = props

  const [state, setState] = React.useState({
    name: { value: "", errorMessage: "" },
    errorMessage: "",
    loading: false
  })

  function handleSubmit(e){
    e.preventDefault();

    setState({
      ...state,
      loading: true
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

    getApi().post("/api/add-quality", {name: state.name.value})
    .then(response=>{
      if(response.status === 201){
        onSave && onSave(response.data)
        setModal("")
      }
      setState({
        ...state,
        loading: false
      })
      
    })
    .catch(err=>{
      setState({
        ...state,
        loading: false
      })
    })

  }
 
  return (
    <div>
      <h1 class="font-bold text-3xl text-gray-200 text-center">New Quality Label</h1>
      <form onSubmit={handleSubmit}>
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
            ? <progress class="progress w-full"></progress>
            : <button type='submit' className="btn cursor-pointer text-white">Save</button> 
          }
        </div>
      </form>     
    </div>
  )
}


export default AddQuality;