import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const TeamRoles: React.FunctionComponent = (props) => {
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Team Roles
            </Title>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
                <Form.List name="names">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                <Form.Item {...formItemLayout} label={'Roles'}>
                                    <Form.Item
                                        {...formItemLayoutWithOutLabel}
                                        validateTrigger={['onChange', 'onBlur']}
                                        label="Roles"
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message:
                                                    'You cannot remove the base role.',
                                            },
                                        ]}
                                        noStyle>
                                        <Input
                                            placeholder="Role Name"
                                            style={{ width: '60%' }}
                                            value="Project manager"
                                        />
                                    </Form.Item>
                                </Form.Item>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...formItemLayoutWithOutLabel}
                                        label={''}
                                        required={false}
                                        key={field.key}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Please input a role's name or delete this field.",
                                                },
                                            ]}
                                            noStyle>
                                            <Input
                                                placeholder="Role Name"
                                                style={{ width: '60%' }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    {!fields.length ? (
                                        <p>
                                            You have no roles, so any team
                                            member can perform any action.
                                        </p>
                                    ) : null}
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        style={{ width: '60%' }}>
                                        <PlusOutlined /> Add Role
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TeamRoles;
