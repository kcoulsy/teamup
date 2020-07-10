import React from 'react';
import { Link } from 'react-router-dom';
import Card from './../Card/Card';

function LoginForm() {
    return (
        <Card title="Login" centered>
            <form className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button className="ui button" type="submit">Login</button>
                Not registered? <Link to="/register">Register</Link>
            </form>
        </Card>
    );
};

export default LoginForm;