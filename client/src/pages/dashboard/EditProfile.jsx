import React from 'react';
import InputGroup from 'src/components/inputs/InputGroup';
import FileUpload from 'src/components/inputs/FileUpload';
import { getApi } from 'src/api';
import CheckboxGroup from 'src/components/inputs/Checkbox';

function EditProfile(props) {

    const {setEditProfile, editProfile, auth} = props;


    const [state, setState] = React.useState({
        userData: {
            avatar: {value: "", errorMessage: "", tauch: false},
            firstName: {value: "", errorMessage: "", tauch: false},
            lastName: {value: "", errorMessage: "", tauch: false},
            gender: {value: "", errorMessage: "", tauch: false},
        }
    })
    const { userData } = state


    function handleChange(e){   
        const {name, value} = e.target     
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

    function handleUpdate(e){
        e.preventDefault();
        let isCompleted = true;
        let updatedState = {...userData}
        
        for (let key in userData) {
            
           if (key === "avatar") {
                if (!userData[key].tauch || !userData[key].value) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                } else {
                    // only check when image is blob data;
                    if(typeof userData[key].value !== "string" ){
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
        formData.append("_id", auth._id)
        getApi().post("/api/update-profile", formData).then(response => {
            console.log(response);
        }).catch(ex => {
            console.log(ex);
        })        
    }


    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl text-gray-200 text-center">Update Profile</h1>
                <form onSubmit={handleUpdate}>
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
                            options={["male", "female", "ASD"]}
                        />

                        <div className="mt-8">
                        <button type="button"  className="btn text-white mr-4">Discard</button>
                            <button type="submit"  className="btn text-white">Update Profile</button>
                        </div>

                    </div>
                </form>

                
            </div>
        </div>
    )
}

export default EditProfile