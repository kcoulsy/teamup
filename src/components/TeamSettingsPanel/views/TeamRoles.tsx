import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '../../../store/configure';
import { connect } from 'react-redux';
import { updateTeamRoles } from '../../../actions/team';

const { Title } = Typography;

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const TeamRoles: React.FunctionComponent<{
    roles: string[];
    updateTeamRoles: Function;
}> = ({ roles, updateTeamRoles }) => {
    const [teamRoles, setTeamRoles] = useState(roles);
    const updateTeamRoleByIndex = (index: number, roleName: string) => {
        const newRoles = [...teamRoles];
        newRoles[index] = roleName;
        setTeamRoles(newRoles);
    };
    const addTeamRole = () => {
        setTeamRoles([...teamRoles, '']);
    };
    const removeTeamRole = (index: number) => {
        setTeamRoles(teamRoles.filter((_, idx) => idx !== index));
    };
    const updateRoles = async () => {
        if (validateRoles()) {
            const updated = await updateTeamRoles(teamRoles);
            if (updated) {
                notification.success({
                    message: 'Roles successfully updated!',
                });
            } else {
                notification.error({
                    message: 'Something went wrong updating roles!',
                });
            }
        } else {
            notification.error({
                message: 'You cannot have roles which are empty!',
            });
        }
    };
    const validateRoles = () => {
        return teamRoles.reduce((acc, role) => {
            if (!role.length) {
                return false;
            }
            return acc;
        }, true);
    };
    return (
        <div>
            <Title level={4} style={{ marginBottom: '20px' }}>
                Team Roles
            </Title>

            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
                {teamRoles.map((role, index) => {
                    return (
                        <Form.Item
                            {...formItemLayoutWithOutLabel}
                            key={`role_${index}`}>
                            <Form.Item noStyle>
                                <Input
                                    placeholder="Role Name"
                                    style={{ width: '60%' }}
                                    value={role}
                                    onChange={(ev) =>
                                        updateTeamRoleByIndex(
                                            index,
                                            ev.currentTarget.value
                                        )
                                    }
                                />
                            </Form.Item>
                            {index !== 0 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                        removeTeamRole(index);
                                    }}
                                />
                            ) : null}
                        </Form.Item>
                    );
                })}
                <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => {
                            addTeamRole();
                        }}
                        style={{ width: '60%' }}>
                        <PlusOutlined /> Add Role
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={updateRoles}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    roles: state.team.roles,
});

const mapDispatchToProps = {
    updateTeamRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamRoles);
