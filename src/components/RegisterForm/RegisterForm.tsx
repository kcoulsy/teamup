import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { startRegister } from '../../actions/auth';
import containsNumber from '../../helpers/containsNumber';
import {
    MIN_USERNAME_LENGTH,
    MIN_PASS_LENGTH,
} from './../../constants/register';
import { RootState } from '../../store/configure';
import { Form, Card, Input, Button } from 'antd';
import { PATH_LOGIN } from '../../constants/pageRoutes';

interface RegisterFormProps {
    attemptingRegister: boolean;
    errorMsg?: string;
    startRegister: Function;
}
export const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({
    attemptingRegister,
    errorMsg,
    startRegister,
}) => {
    const history = useHistory();

    return (
        <Card title="Register" size="small" className="register-form__card">
            <Form
                onFinish={({ username, email, password, confirm }) => {
                    startRegister({ username, email, password, confirm });
                }}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            min: MIN_USERNAME_LENGTH,
                            message: `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
                        },
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid email!',
                        },
                        {
                            required: true,
                            message: 'Please input an email!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: MIN_PASS_LENGTH,
                            message: `Password must be at least ${MIN_PASS_LENGTH} characters`,
                        },
                        () => ({
                            validator(_, value) {
                                if (containsNumber(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    'Your password must contain a number!'
                                );
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm"
                    name="confirm"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    'The two passwords that you entered do not match!'
                                );
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>
                {errorMsg ? <Form.Item>{errorMsg}</Form.Item> : null}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={attemptingRegister}>
                        Register
                    </Button>
                    <Button
                        type="link"
                        htmlType="button"
                        onClick={() => history.push(PATH_LOGIN)}>
                        Already registered? Click here to login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export const mapStateToProps = (state: RootState) => {
    return {
        attemptingRegister: state.auth.attemptingRegister,
        errorMsg: state.auth.registerErrorMsg,
    };
};

const mapDispatchToProps = { startRegister };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
