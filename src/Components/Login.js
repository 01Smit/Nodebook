import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success");
            navigate('/')
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }


    return (
        <div className='container my-2'>
            <h2>Login to use NodeBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address:-</label>
                    <input name='email' type="email" value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password:-</label>
                    <input name='password' type="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login