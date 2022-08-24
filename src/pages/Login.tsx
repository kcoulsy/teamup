import React from 'react';

import LoginForm from '../components/LoginForm/LoginForm';
import { Row, Col } from 'antd';

const Login: React.FunctionComponent = () => {
  return (
    <div>
      <Row justify='center'>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
