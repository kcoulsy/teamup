import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const ChangePassword: React.FunctionComponent = () => {
  return (
    <div>
      <Title level={4} className='user-change-password__title'>
        Change Password
      </Title>
      <Form
        labelCol={{
          sm: {
            span: 24,
          },
          md: {
            span: 8,
          },
        }}
        wrapperCol={{
          sm: {
            span: 24,
          },
          md: {
            span: 12,
          },
        }}
        name='basic'>
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

        <Form.Item
          label='Confirm'
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
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
        <Form.Item
          wrapperCol={{
            md: {
              offset: 8,
              span: 16,
            },
            sm: {
              offset: 0,
              span: 16,
            },
          }}>
          <Button type='primary' htmlType='submit'>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
