import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Card from './../Card/Card';
import Loader from './../Loader/Loader';

import { startLogin } from './../../actions/auth';

export function LoginForm({ startLogin, attemptingLogin, loginAttemptFailed }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const defaultErrorObj = {
        usernameEmpty: false,
        passwordEmpty: false,
        invalidLogin: false,
    };

    const [error, setError] = useState(defaultErrorObj);

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!username.length || !password.length) {
            setError({
                usernameEmpty: !username.length,
                passwordEmpty: !password.length,
            });
        } else {
            setError(defaultErrorObj);
            startLogin(username, password);
        }
    };

    const formError = loginAttemptFailed || Object.values(error).includes(true);

    return (
        <Card title="Login" centered>
            <Loader isLoading={attemptingLogin} loadingText="Logging in">
                <form className={`ui form${formError ? ' error' : ''}`}>
                    <div className={`field${error.usernameEmpty ? ' error' : ''}`}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(ev) => setUsername(ev.target.value)}
                        />
                    </div>
                    <div className={`field${error.passwordEmpty ? ' error' : ''}`}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>
                    <button className="ui button" type="submit" onClick={submitForm}>
                        Login
                    </button>
                    Not registered? <Link to="/register">Register</Link>
                    {formError ? (
                        <div className="ui error message">
                            <ul className="list">
                                {error.usernameEmpty ? <li>Please enter a username</li> : null}
                                {error.passwordEmpty ? <li>Please enter a password</li> : null}
                                {loginAttemptFailed ? <li>Login Invalid</li> : null}
                            </ul>
                        </div>
                    ) : null}
                </form>
            </Loader>
        </Card>
    );
}

export const mapStateToProps = (state) => {
    return {
        attemptingLogin: state.auth.attemptingLogin,
        loginAttemptFailed: state.auth.loginAttemptFailed,
    };
};
const mapDispatchToProps = { startLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
