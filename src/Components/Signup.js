import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", cpassword: "" })
    const onChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/new-user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newUser.name, email: newUser.email, password: newUser.cpassword })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authToken);
            navigate('/')
            props.showAlert("Account created successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    return (
        <div className='container my-2'>
            <h2>Create an account to use NodeBook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="exampleInputEmail1" className="form-label">Name:-</label>
                    <input type="text" name='name' className="form-control" value={newUser.name} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3 my-2">
                    <label htmlFor="email" className="form-label">Email address:-</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="email" value={newUser.email} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:-</label>
                    <input type="password" name='password' className="form-control" id="password" value={newUser.password} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password:-</label>
                    <input type="password" name='cpassword' className="form-control" id="cpassword" value={newUser.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-outline-primary" disabled={newUser.cpassword === newUser.password ? false : true}>Submit</button>
            </form>
        </div>
    )
}

export default Signup;