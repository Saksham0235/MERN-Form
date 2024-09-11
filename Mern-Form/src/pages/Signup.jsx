import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
    const navigate = useNavigate()
    const [signinfo, setSignUpInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signinfo;

        if (!name || !email || !password) {
            return handleError("Please enter  all fields");
        }
        try {
            const url = "http://localhost:8080/auth/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(signinfo)
            })

            const data = await response.json();
            const { success, message,error } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
            else if(error)
            {
                const details=error?.details[0].message;
                handleError(details)
            }
            else if(!success)
            {
                handleError(message)
            }
            console.log(data)
        }
        catch (err) {
             handleError(err.message)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        const copyLoginInfo = { ...signinfo }
        copyLoginInfo[name] = value;
        setSignUpInfo(copyLoginInfo)
    }
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form className='form_control' onSubmit={handleSubmit}>
                <div>
                    < label htmlFor='name'>Name</label>
                    <input onChange={handleChange} value={signinfo.name} type='text' name='name' placeholder='Enter Your Name' />
                </div>

                <div>
                    < label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' value={signinfo.email} placeholder='Enter Your Email' />
                </div>

                <div>
                    < label htmlFor='password'>Password</label>
                    <input onChange={handleChange} value={signinfo.password} type='password' name='password' placeholder='Enter Password' />
                </div>

                <button type='submit' >Sign In</button>
                <span style={{ display: "flex" }}>
                    <p >Already Have an Account?</p>
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
