import React from 'react';

import { Row, Col } from 'antd';
import LoginForm from '../components/LoginForm/LoginForm';

function Login() {
  return (
    <div>
      <Row justify='center'>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
