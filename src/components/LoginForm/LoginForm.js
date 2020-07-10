import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Card from './../Card/Card';

import authService from '../../services/authentication';
import history from '../../helpers/history';

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const defaultErrorObj = { usernameEmpty: false, passwordEmpty: false, invalidLogin: false };
    const [error, setError] = useState(defaultErrorObj);

    if (authService.isLoggedIn()) {
        return <Redirect to={{pathname:'/'}} />
    };

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!username.length || !password.length) {
            setError({
                usernameEmpty: !username.length,
                passwordEmpty: !password.length
            });
        } else {
            setError(defaultErrorObj);
            authService.login(username, password).then((res) => {
                if (!authService.isLoggedIn()) {
                    setError({
                        invalidLogin: true
                    });
                } else {
                    // This is hacky - we want the component to be called once more, but only once.
                    // So we update one var and then it will check to redirect
                    setUsername('');
                }
            });
        }
    }

    const formError = Object.values(error).includes(true);
    return (
        <Card title="Login" centered>
            <form className={`ui form${formError ? ' error' : ''}`}>
                <div className={`field${error.usernameEmpty ? ' error' : ''}`}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={ev => setUsername(ev.target.value)}/>
                </div>
                <div className={`field${error.passwordEmpty ? ' error' : ''}`}>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)}/>
                </div>
                <button className="ui button" type="submit" onClick={submitForm}>Login</button>
                Not registered? <Link to="/register">Register</Link>
                {Object.values(error).includes(true) ? (
                    <div className="ui error message">
                        <ul className="list">
                            {error.usernameEmpty ? <li>Please enter a username</li> : null}
                            {error.passwordEmpty ? <li>Please enter a password</li> : null}
                            {error.invalidLogin ? <li>Login Invalid</li> : null}
                        </ul>
                    </div>
                ): null}
            </form>
        </Card>
    );
};

export default LoginForm;