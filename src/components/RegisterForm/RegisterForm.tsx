import React from 'react';
import { useHistory } from 'react-router-dom';
import { passwordSchema } from '../../../server/src/validation/password';
import {
  MIN_USERNAME_LENGTH,
  MIN_PASS_LENGTH,
} from './../../constants/register';
import { Form, Card, Input, Button } from 'antd';
import { PATH_LOGIN } from '../../constants/pageRoutes';
import useUser from '../../hooks/useUser';
import { ZodError } from 'zod';

export const RegisterForm = () => {
  const { register, registerError, isRegistering } = useUser();
  const history = useHistory();

  return (
    <Card title='Register' size='small' className='register-form__card'>
      <Form
        onFinish={({ username, email, password, confirm }) => {
          register({ username, email, password });
        }}>
        <Form.Item
          label='Username'
          name='username'
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
          label='Email'
          name='email'
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
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator(_, value) {
                if (value === '') {
                  return Promise.resolve();
                }
                try {
                  passwordSchema.parse(value);
                  return Promise.resolve();
                } catch (err) {
                  if (err instanceof ZodError) {
                    return Promise.reject(
                      err?.errors.map(({ message }) => message).join('\r\n') +
                        '.'
                    );
                  }
                  return Promise.reject('Invalid password.');
                }
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Confirm'
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
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
        {registerError ? (
          <Form.Item>Something went wrong trying to register you</Form.Item>
        ) : null}
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isRegistering}>
            Register
          </Button>
          <Button
            type='link'
            htmlType='button'
            onClick={() => history.push(PATH_LOGIN)}>
            Already registered? Click here to login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
