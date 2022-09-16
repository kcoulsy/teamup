import React from 'react';

import { Row, Col } from 'antd';
import RegisterForm from '../components/RegisterForm/RegisterForm';

function Register() {
  return (
    <Row justify='center'>
      <Col>
        <RegisterForm />
      </Col>
    </Row>
  );
}

export default Register;
