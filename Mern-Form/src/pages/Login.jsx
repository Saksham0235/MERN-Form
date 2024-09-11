import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils';

const Login = () => {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = V;

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
                body: JSON.stringify(loginInfo)
            })

            const data = await response.json();
            const { success, message, error } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details)
            }
            else if (!success) {
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
        const copyLoginInfo = { ...loginInfo }
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
    return (
        <div className='container'>
            <h1>Log In</h1>
            <form className='form_control' onSubmit={handleSubmit}>
                <div>
                    < label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' value={loginInfo.email} placeholder='Enter Your Email' />
                </div>

                <div>
                    < label htmlFor='password'>Password</label>
                    <input onChange={handleChange} value={loginInfo.password} type='password' name='password' placeholder='Enter Password' />
                </div>

                <button type='submit' >Log In</button>
                <span style={{ display: "flex" }}>
                    <p >Don't Have an Account?</p>
                    <Link to="/signup">Register</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
