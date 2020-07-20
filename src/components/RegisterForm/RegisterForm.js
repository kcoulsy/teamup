import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

function RegisterForm() {
    return (
        <Card title="Register" centered>
            <form className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="field">
                    <label>Confirm</label>
                    <input type="password" name="confirm" placeholder="Password" />
                </div>
                <button className="ui button" type="submit">
                    Register
                </button>
                Already registered? <Link to="/login">Login</Link>
            </form>
        </Card>
    );
}

export default RegisterForm;
