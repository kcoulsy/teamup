import React from 'react';
import { Link } from 'react-router-dom';
import Card from './../Card/Card';

function LoginForm() {
    return (
        <Card title="Login" centered>
            <form className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="First Name" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Last Name" />
                </div>
                <button className="ui button" type="submit">Login</button>
                Not registered? <Link to="/register">Click here</Link>
            </form>
        </Card>
    );
};

export default LoginForm;