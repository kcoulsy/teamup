import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';

function RegisterForm() {
    const MIN_USERNAME_LENGTH = 3;
    const MIN_PASS_LENGTH = 6;
    const containsNumber = (val) => /\d/.test(val);
    const isValidEmail = (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const handlePasswordInput = (ev) => {
        const input = ev.target.value.trim();

        setPassword(ev.target.value);

        setPasswordValid(input.length >= MIN_PASS_LENGTH && containsNumber(input));
    };

    const defaultErrorObj = {
        usernameShort: false,
        usernameEmpty: false,
        emailEmpty: false,
        emailInvalid: false,
        passwordEmpty: false,
        confirmPasswordEmpty: false,
        passwordMismatch: false,
        passwordInvalid: false,
    };
    const [error, setError] = useState(defaultErrorObj);

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!username.length || !email.length || !password.length || !confirmPassword.length) {
            setError({
                usernameEmpty: !username.length,
                emailEmpty: !email.length,
                passwordEmpty: !password.length,
                confirmPasswordEmpty: !confirmPassword.length,
            });
        } else if (password !== confirmPassword) {
            setError({ ...defaultErrorObj, passwordMismatch: true });
        } else if (username.length < MIN_USERNAME_LENGTH) {
            setError({ ...defaultErrorObj, usernameShort: true });
        } else if (!isValidEmail(email)) {
            setError({ ...defaultErrorObj, emailInvalid: true });
        } else if (!passwordValid) {
            setError({ ...defaultErrorObj, passwordInvalid: true });
        } else {
            // Register
            setError(defaultErrorObj);
        }
    };

    const formError = Object.values(error).includes(true);
    return (
        <Card title="Register" centered>
            <form className={`ui form${formError ? ' error' : ''}`}>
                <div className={`field${error.usernameEmpty ? ' error' : ''}`}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(ev) => setUsername(ev.target.value.trim())}
                    />
                </div>
                <div className={`field${error.emailEmpty ? ' error' : ''}`}>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={(ev) => setEmail(ev.target.value.trim())}
                    />
                </div>
                <div className={`field${error.passwordEmpty ? ' error' : ''}`}>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={handlePasswordInput} />
                </div>
                <div className={`field${error.confirmPasswordEmpty ? ' error' : ''}`}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm Password"
                        onChange={(ev) => setConfirmPassword(ev.target.value.trim())}
                    />
                </div>
                <div className="field">
                    <div className={`ui label${passwordValid ? ' green' : ''}`}>
                        Passwords must be at least {MIN_PASS_LENGTH} characters long and contain a number.
                    </div>
                </div>
                <button className="ui button" type="submit" onClick={submitForm}>
                    Register
                </button>
                Already registered? <Link to="/login">Login</Link>
                {Object.values(error).includes(true) ? (
                    <div className="ui error message">
                        <ul className="list">
                            {error.usernameEmpty ? <li>Please enter a username</li> : null}
                            {error.usernameShort ? (
                                <li>Please enter a username which is at least {MIN_USERNAME_LENGTH} characters</li>
                            ) : null}
                            {error.emailEmpty ? <li>Please enter an email</li> : null}
                            {error.emailInvalid ? <li>Please enter a valid email</li> : null}
                            {error.passwordEmpty ? <li>Please enter a password</li> : null}
                            {error.confirmPasswordEmpty ? <li>Please confirm your password</li> : null}
                            {error.passwordMismatch ? <li>Passwords do not match</li> : null}
                            {error.passwordInvalid ? <li>Please enter a valid password</li> : null}
                        </ul>
                    </div>
                ) : null}
            </form>
        </Card>
    );
}

export default RegisterForm;
