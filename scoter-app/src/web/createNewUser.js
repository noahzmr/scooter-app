import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateNewUser() {
    const [form1Left, setForm1Left] = useState("40px")
    const [form2Left, setForm2Left] = useState("-450px")
    const [form3Left, setForm3Left] = useState("-450px")
    const [progressStyleWidth, setProgressStyleWidth] = useState("120px")
    const [Company_ID, setCompany] = useState("")
    const [authorization, setAuthorization] = useState("")
    const [department, setDepartment] = useState("")
    const [companyData, setcompanyData] = useState([]);
    const [position, setPosition] = useState("")
    const [userData, setUserData] = useState([])
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState("")
    const [userID, setUserID] = useState("")
    const [imageInformation, setImageInformation] = useState("")
    const [allowLogin, setAllowLogin] = useState("false")
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const [postImage, setPostImage] = useState({
        myFile: "",
    });
    const pictureValues = {
        'pictureBlob': postImage.myFile,
        'email': email
    }
    const createImage = () => {
        axios.post(
            'http://localhost:10000/users/UploadPicture',
            pictureValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((responseponse) => {
                setImageInformation(responseponse.data)
                console.log(imageInformation)
            }).catch((reason) => {
                console.error("post failed", reason);
            });
    }
    const createPost = async (post) => {
        try {
            await createImage(post);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postImage);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 });
    };

    const inputValues = () => {

        const UserValues = {
            'fName': fName,
            'nName': lName,
            'Gender': gender,
            'Birthday': birthday,
            'Email': email,
            'Number': number,
            'pictureBlob': postImage.myFile,
            'Password': password
        }
        axios.post(
            'http://localhost:10000/users/create',
            UserValues,
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(
                console.log('Success!')
            ).catch((reason) => {
                if (!companyData) {
                    console.error("post pb failed", reason);
                }
            })

        console.log(UserValues)
        console.log("Fetched", userData);
    }

    return (

        <div className="abody">

            <div className="abody">
                <div id="createNewUser">
                    <div className="container">
                        <form id="Form1" style={{ left: form1Left, marginTop: '-3em' }}>
                            <button
                                className='backBtn'
                                onClick={() => window.location.reload()}
                            >
                                <div className="arrow"></div>
                            </button>
                            <h3>Personal data</h3>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                required=""
                                onChange={e => setFName(e.target.value)}
                            />

                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                required=""
                                onChange={e => setLName(e.target.value)}
                            />

                            <input
                                type="file"
                                label="Image"
                                name="myFile"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => handleFileUpload(e)}
                                onClick={console.log(postImage)}
                            />


                            <select
                                name="gender"
                                id="gender"
                                onChange={e => setGender(e.target.value)}
                            >

                                <option value="" disabled >Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Women</option>
                            </select>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                placeholder="Birthday"
                                onChange={e => setBirthday(e.target.value)}
                            />
                            <div className="btn-box">
                                <button type="button" id="next1" onClick={() => { setForm1Left("-450px"); setForm2Left("40px"); setProgressStyleWidth("240px"); console.log("fName: " + fName + " lName: " + lName + " Gender: " + gender, " Birthday: " + birthday + 'IMG:' + postImage.myFile) }}>Next</button>
                            </div>
                        </form>

                        <form id="Form2" style={{ left: form2Left }}>
                            <h3>Contact Data</h3>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                required=""
                                onChange={e => setEmail(e.target.value)}

                            />
                            <input
                                type="tel"
                                name="mobileNumber"
                                id="mobileNumber"
                                placeholder="Mobile Number"
                                onChange={e => setNumber(e.target.value)}
                            />
                            <div className="btn-box">
                                <button type="button" id="back1" onClick={() => { setForm1Left("40px"); setForm2Left("-450px"); setProgressStyleWidth("120px") }} >Back</button>
                                <button type="button" id="next2" onClick={() => { setForm2Left("-450px"); setForm3Left("40px"); setProgressStyleWidth("360px"); console.log("Company: " + Company_ID + " Authorization: " + authorization + " Position: " + position + " Department: " + department + "Allow Login: " + allowLogin) }}>Next</button>
                            </div>
                        </form>
                        <form id="Form3" style={{ left: form3Left }}>
                            <h3>Password</h3>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Enter Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Repide'
                                onChange={e => setPasswordCheck(e.target.value)}
                            />
                            <div className="btn-box">
                                <button type="button" className='btnActionPrimary' id="back1" onClick={() => { setForm2Left("40px"); setForm3Left("-450px"); setProgressStyleWidth("240px") }} >Back</button>
                                <button
                                    onClick={inputValues}
                                    type='submit'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="step-row">
                            <div id="progress" style={{ width: progressStyleWidth }}></div>
                            <div className="step-col"><small>Personal data</small></div>
                            <div className="step-col"><small>Contact Data</small></div>
                            <div className="step-col"><small>Password</small></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}


export default CreateNewUser;