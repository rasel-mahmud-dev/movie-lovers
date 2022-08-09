import React, { useEffect } from 'react';
import InputGroup from 'src/components/inputs/InputGroup';
import FileUpload from 'src/components/inputs/FileUpload';
import { getApi } from 'src/api';
import CheckboxGroup from 'src/components/inputs/Checkbox';
import errorMessage from 'src/utils/errorResponse';
import ResponseAlert from './../../components/ResponseAlert';
import { useDispatch } from 'react-redux';
import { setAuthProfile } from 'src/store/slices/authSlice';

function EditProfile(props) {

    const { setEditProfile, editProfile, auth } = props;

    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        userData: {
            avatar: { value: "", errorMessage: "", tauch: false },
            firstName: { value: "", errorMessage: "", tauch: false },
            lastName: { value: "", errorMessage: "", tauch: false },
            gender: { value: "", errorMessage: "", tauch: false },
        },
        httpResponse: "",
        httpStatus: 0
    })
    const { userData } = state


    useEffect(() => {
        const f = ["avatar", "firstName", "lastName", "gender"]
        let updateUserDate = { ...state.userData }
        f.forEach(item => {
            if (auth.authProfile[item]) {
                updateUserDate[item] = {
                    ...updateUserDate[item],
                    tauch: true,
                    value: auth.authProfile[item],
                    errorMessage: item === "avatar" ? "" : auth.authProfile[item] ? "" : `${item} required`,
                }
            } else {
                updateUserDate[item] = {
                    ...updateUserDate[item],
                    errorMessage:  item === "avatar" ? "" : `${item} required`,
                }
            }
        })

        setState({
            ...state,
            userData: updateUserDate
        })

    }, [])



    function handleChange(e) {
        const { name, value } = e.target
        let updateUserData = {
            ...userData,
            [name]: {
                ...state.userData[name],
                value: value,
                tauch: true,
                errorMessage: state.userData[name] ? "" : state.userData[name].errorMessage
            }
        }

        setState({
            ...state,
            userData: updateUserData
        })
    }

    function handleUpdate(e) {
        e.preventDefault();

        setState({...state, httpResponse: "", httpStatus: 0})

        let isCompleted = true;
        let updatedState = { ...userData }

        for (let key in userData) {

            if (key === "avatar") {
                if (!userData[key].tauch || !userData[key].value) {
                   
                } else {
                    // only check when image is blob data;
                    if (typeof userData[key].value !== "string") {
                        if (userData[key].value.size > "102400") { // 100kb
                            updatedState[key].errorMessage = `${key} size should be under 100kb`
                            isCompleted = false;
                        }
                    }
                }

            } else {
                if (!userData[key].tauch || !userData[key].value) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                }
            }
        }

        if (!isCompleted) {
            setState({
                ...state,
                userData: updatedState
            })
            return;
        }

        let formData = new FormData()
        for (let key in userData) {
            formData.append(key, userData[key].value)
        }

        // Update
        formData.append("_id", auth.auth._id)

        setState({...state, httpResponse: "pending"})

        getApi().post("/api/update-profile", formData).then(response => {
            if(response.status === 201){
                dispatch(setAuthProfile(response.data.user))
                setEditProfile(false)
                setState({
                    ...state,
                    httpResponse: "",
                    httpStatus: 0
                })
            }

        }).catch(ex => {
            setState({
                ...state,
                httpResponse: errorMessage(ex),
                httpStatus: 500
            })
        })
    }

    function handleDiscard() {
        setEditProfile(false)
    }


    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl text-gray-200 text-center mb-10">Update Profile</h1>
                <form onSubmit={handleUpdate}>

                    <ResponseAlert
                        className="my-2 mb-10"
                        message={state.httpResponse}
                        statusCode={state.httpStatus}
                    />

                    <div className="div">

                        {/*********** Cover **************/}
                        <FileUpload
                            name="avatar"
                            type="text"
                            label="avatar"
                            placeholder="Choose Avatar"
                            onChange={handleChange}
                            value={userData.avatar.value}
                            defaultValue={userData.avatar.value}
                            errorMessage={userData.avatar.errorMessage}
                        />

                        <InputGroup
                            name="firstName"
                            type="text"
                            label="FirstName"
                            placeholder="Enter FirstName"
                            onChange={handleChange}
                            value={userData.firstName.value}
                            errorMessage={userData.firstName.errorMessage}
                        />
                        <InputGroup
                            name="lastName"
                            type="text"
                            label="LastName"
                            placeholder="Enter lastName"
                            onChange={handleChange}
                            value={userData.lastName.value}
                            errorMessage={userData.lastName.errorMessage}
                        />

                        <CheckboxGroup
                            name="gender"
                            type="text"
                            label="gender"
                            onChange={handleChange}
                            value={userData.gender.value}
                            errorMessage={userData.gender.errorMessage}
                            options={["male", "female"]}
                        />

                        <div className="mt-8">
                            <button type="button" onClick={handleDiscard} className="btn text-white mr-4">Discard</button>
                            <button type="submit" className="btn text-white">Update Profile</button>
                        </div>

                    </div>
                </form>


            </div>
        </div>
    )
}

export default EditProfile