import React from 'react'
import { api } from '../../api'
import ResponseAlert from '../../components/ResponseAlert';
import errorMessage from './../../utils/errorResponse';
import { logOutAction } from 'src/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

function UserSettings() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [confirmMessage, setConfirmMessage] = React.useState("")

    const [state, setState] = React.useState({
        httpResponse: "",
        httpStatus: 0,
    })

    function deleteUserPopup(){
        setConfirmMessage("open")
    }

    function deleteUser(){
        setState({ ...state, httpResponse: "pending" })
        api.post("/api/user/remove").then(response=>{
            if(response.status === 201){
                dispatch(logOutAction())
                setState({
                    ...state,
                    httpResponse: "",
                    httpStatus:0
                }) 
                navigate("/")
            }
        }).catch(ex=>{
            setState({
                ...state,
                httpResponse: errorMessage(ex),
                httpStatus: 500
            })
        })
    }

  return (
    <div>
        <h1 className="text-3xl text-gray-100 font-medium mb-4 text-center">
            User Setting
        </h1>

        <ResponseAlert message={state.httpResponse} statusCode={state.httpStatus} />

        <div>
            <div class={`${confirmMessage === "open" ? "visible opacity-100 pointer-events-auto" : "" } modal modal-bottom sm:modal-middle`}>
            <div class="modal-box">
                <h3 class="font-bold text-3xl">Are your sure to delete account?</h3>
                <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <div class="modal-action">
                    <label for="my-modal-6" onClick={()=>setConfirmMessage("")} class="btn  text-white">No!</label>
                    <label for="my-modal-6" onClick={deleteUser} class="btn btn-error text-white">Yay!</label>
                </div>
            </div>
            </div>
        </div>

             
        <button className='btn btn-error text-white' onClick={deleteUserPopup} >
        <AiFillDelete class="mr-2" />
            Delete User</button>
    </div>
  )
}

export default UserSettings