import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Form, Input, Button } from 'antd';
import { PATH_REGISTER } from './../../constants/pageRoutes';
import useUser from '../../hooks/useUser';

export const LoginForm = () => {
  const { login, isFetching, error } = useUser();
  const history = useHistory();

  return (
    <Card title='Login' className='login-form__card' size='small'>
      <Form
        onFinish={({ username, password }) => login({ username, password })}>
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
        {error ? (
          <Form.Item>Unable to login with those credentials</Form.Item>
        ) : null}
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isFetching}>
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

export default LoginForm;
