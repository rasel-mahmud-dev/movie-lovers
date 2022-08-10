import React from 'react'
import { api } from '../../api'
import ResponseAlert from '../../components/ResponseAlert';
import errorMessage from './../../utils/errorResponse';
import { logOutAction } from 'src/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AiFillDelete } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import { useSelector } from 'react-redux';

function UserSettings() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const auth = useSelector(state => state.auth)

    const [confirmMessage, setConfirmMessage] = React.useState("")

    const [state, setState] = React.useState({
        httpResponse: "",
        httpStatus: 0,
    })

    function deleteUserPopup() {
        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0
        })
        setConfirmMessage("open")
    }

    function deleteUser() {
        if (auth && auth.auth) {
            setState({
                ...state,
                httpResponse: "",
                httpStatus: 0
            })

            setState({ ...state, httpResponse: "pending" })
            api.post("/api/user/remove", {email: auth.auth.email}).then(response => {
                if (response.status === 201) {
                    dispatch(logOutAction())
                    setState({
                        ...state,
                        httpResponse: "",
                        httpStatus: 0
                    })
                    navigate("/")
                }
            }).catch(ex => {
                setState({
                    ...state,
                    httpResponse: errorMessage(ex),
                    httpStatus: 500
                })
            })
            setConfirmMessage("")
        }
    }

    return (
        <div className="min-h-[50vh]">
            <h1 className="text-3xl text-gray-100 font-medium mb-4 text-center">
                User Setting
            </h1>

            <ResponseAlert message={state.httpResponse} statusCode={state.httpStatus} />

            <DialogBox isOpen={confirmMessage === "open"}>
                <>
                    <h3 class="font-bold text-3xl">Are your sure to delete account?</h3>
                    <div class="modal-action">
                        <label for="my-modal-6" onClick={() => setConfirmMessage("")} class="btn  text-white">No!</label>
                        <label for="my-modal-6" onClick={deleteUser} class="btn btn-error text-white">Yay!</label>
                    </div>
                </>
            </DialogBox>


            <button className='btn btn-error text-white' onClick={deleteUserPopup} >
                <AiFillDelete class="mr-2" />
                Delete User</button>
        </div>
    )
}

export default UserSettings