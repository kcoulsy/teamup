import React from 'react';

import LoginForm from '../components/LoginForm/LoginForm';

const Login: React.FunctionComponent = (props) => {
    return (
        <div>
            <h3>Login Page</h3>
            <LoginForm {...props} />
        </div>
    );
};

export default Login;
