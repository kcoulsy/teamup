import React from 'react';
import { Form, Input, Button, Typography, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

function ProfileSettings() {
  // great use of typescript here... thanks antd
  const handleImageUpload = (event: any[] | any) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  };
  return (
    <div>
      <Title level={4} className='user-profile-settings__title'>
        Profile Settings
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
        name='basic'
        initialValues={{ remember: true }}
      >
        <Form.Item label='Full Name' name='fullName'>
          <Input />
        </Form.Item>

        <Form.Item label='Occupation' name='occupation'>
          <Input />
        </Form.Item>
        <Form.Item label='About Me' name='bio'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='upload'
          label='Upload'
          valuePropName='fileList'
          getValueFromEvent={handleImageUpload}
        >
          <Upload name='profile' action='/upload.do' listType='picture'>
            <Button>
              <UploadOutlined />
              Click to upload
            </Button>
          </Upload>
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
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProfileSettings;
