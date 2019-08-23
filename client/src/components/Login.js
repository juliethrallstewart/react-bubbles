import React, { useState } from 'react'
import axios from 'axios'
import './login.scss'

const Login = props => {

    const login = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/login', loginUser)
			.then(res => {
                localStorage.setItem('token', res.data.payload);
                props.history.push("/protected")
			})
			.catch(err => console.log(err.response));
	};

	const [ loginUser, setUser ] = useState({ username: '', password: '' });

	const handleChange = event => {
		setUser({ ...loginUser, [event.target.name]: event.target.value });
        // console.log('handleChange', event.target.name, event.target.value, loginFriend);
    };
  
	return (
        <>
			<div className="login-container">
				<div className="login-form">
					<form onSubmit={login}>
						<input type="text" placeholder="username" value={loginUser.username} name="username" onChange={handleChange} />
						<input type="password" placeholder="password" value={loginUser.password} name="password" onChange={handleChange} />
						<button type="submit">Login</button> 
					</form>
				</div>
			</div>
            </>
		
	);
};

export default Login;


