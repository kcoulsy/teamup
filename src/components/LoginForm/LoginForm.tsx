import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin } from '../../actions/auth';
import { RootState } from '../../store/configure';
import { Card, Form, Input, Button } from 'antd';
import { PATH_REGISTER } from './../../constants/pageRoutes';

interface LoginFormProps {
  startLogin: Function;
  attemptingLogin: boolean;
  loginAttemptFailed: boolean;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  startLogin,
  attemptingLogin,
  loginAttemptFailed,
}) => {
  const history = useHistory();
  return (
    <Card title='Login' className='login-form__card' size='small'>
      <Form
        onFinish={({ username, password }) => startLogin(username, password)}>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>
        {loginAttemptFailed ? (
          <Form.Item>Unable to login with those credentials</Form.Item>
        ) : null}
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={attemptingLogin}>
            Login
          </Button>
          <Button
            type='link'
            htmlType='button'
            onClick={() => history.push(PATH_REGISTER)}>
            Not registered? Click here
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    attemptingLogin: state.auth.attemptingLogin,
    loginAttemptFailed: state.auth.loginAttemptFailed,
  };
};

const mapDispatchToProps = { startLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
