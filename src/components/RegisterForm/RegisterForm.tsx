import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';

import { startRegister } from '../../actions/auth';

interface RegisterFormProps {
    attemptingRegister: boolean;
    errorMsg?: string;
    startRegister: Function;
}

interface RegisterFormErrorObj {
    usernameShort?: boolean;
    usernameEmpty?: boolean;
    emailEmpty?: boolean;
    emailInvalid?: boolean;
    passwordEmpty?: boolean;
    confirmPasswordEmpty?: boolean;
    passwordMismatch?: boolean;
    passwordInvalid?: boolean;
}
export const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({ attemptingRegister, errorMsg, startRegister }) => {
    // TODO Move a lot of this out of here
    const MIN_USERNAME_LENGTH = 3;
    const MIN_PASS_LENGTH = 6;
    const containsNumber = (val: string) => /\d/.test(val);
    const isValidEmail = (val: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [registerSubmitted, setRegisterSubmitted] = useState(false);

    const handlePasswordInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
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
    const [error, setError] = useState<RegisterFormErrorObj>(defaultErrorObj);

    const submitForm = (ev: React.MouseEvent<HTMLButtonElement>) => {
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
        } else if (!errorMsg) {
            startRegister({ username, email, password, confirm: confirmPassword });
            setRegisterSubmitted(true);
            setError(defaultErrorObj);
        }
    };

    const formError = errorMsg || Object.values(error).includes(true);
    return (
        <Card title="Register" centered>
            {registerSubmitted && !errorMsg && !attemptingRegister ? (
                <div>
                    You have successfully registered! Please check your email inbox to confirm your account and head to
                    the <Link to="/login">Login page</Link> to sign in
                </div>
            ) : (
                <Loader isLoading={attemptingRegister} loadingText="Registering">
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
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handlePasswordInput}
                            />
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
                        {formError ? (
                            <div className="ui error message">
                                <ul className="list">
                                    {error.usernameEmpty ? (
                                        <li data-error="username-empty">Please enter a username</li>
                                    ) : null}
                                    {error.usernameShort ? (
                                        <li data-error="username-short">
                                            Please enter a username which is at least {MIN_USERNAME_LENGTH} characters
                                        </li>
                                    ) : null}
                                    {error.emailEmpty ? <li data-error="email-empty">Please enter an email</li> : null}
                                    {error.emailInvalid ? (
                                        <li data-error="email-invalid">Please enter a valid email</li>
                                    ) : null}
                                    {error.passwordEmpty ? (
                                        <li data-error="password-empty">Please enter a password</li>
                                    ) : null}
                                    {error.confirmPasswordEmpty ? (
                                        <li data-error="confirm-empty">Please confirm your password</li>
                                    ) : null}
                                    {error.passwordMismatch ? (
                                        <li data-error="password-mismatch">Passwords do not match</li>
                                    ) : null}
                                    {error.passwordInvalid ? (
                                        <li data-error="password-invalid">Please enter a valid password</li>
                                    ) : null}
                                    {errorMsg ? <li data-error="error-msg">{errorMsg}</li> : null}
                                </ul>
                            </div>
                        ) : null}
                    </form>
                </Loader>
            )}
        </Card>
    );
};

export const mapStateToProps = (state: { auth: { attemptingRegister: boolean; registerErrorMsg: string; }}) => {
    return {
        attemptingRegister: state.auth.attemptingRegister,
        errorMsg: state.auth.registerErrorMsg,
    };
};

const mapDispatchToProps = { startRegister };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
