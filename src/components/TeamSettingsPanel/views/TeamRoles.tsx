import React, { useState } from 'react';
import { Form, Input, Button, notification, PageHeader } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RootState } from '../../../store/configure';
import { connect } from 'react-redux';
import { updateTeamRoles } from '../../../actions/team';
import hasTeamRole from '../../../helpers/hasTeamRole';
import { PERM_UPDATE_TEAM_ROLES } from '../../../constants/permissions';

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

interface TeamRolesProps {
    roles: string[];
    updateTeamRoles: Function;
    canUpdateTeamRoles: boolean;
}

const TeamRoles: React.FunctionComponent<TeamRolesProps> = ({
    roles,
    updateTeamRoles,
    canUpdateTeamRoles,
}) => {
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
                    placement: 'bottomRight',
                });
            } else {
                notification.error({
                    message: 'Something went wrong updating roles!',
                    placement: 'bottomRight',
                });
            }
        } else {
            notification.error({
                message: 'You cannot have roles which are empty!',
                placement: 'bottomRight',
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
            <PageHeader
                title="Team Roles"
                subTitle={
                    !canUpdateTeamRoles
                        ? 'You do not have permissions to modify role permissions but can see them.'
                        : undefined
                }
                className="team-settings__page-header"
            />
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
                {teamRoles.map((role, index) => {
                    return (
                        <Form.Item
                            {...formItemLayoutWithOutLabel}
                            key={`role_${index}`}>
                            <Form.Item noStyle>
                                <Input
                                    placeholder="Role Name"
                                    className="team-team-roles__input"
                                    value={role}
                                    disabled={!canUpdateTeamRoles}
                                    onChange={(ev) =>
                                        updateTeamRoleByIndex(
                                            index,
                                            ev.currentTarget.value
                                        )
                                    }
                                />
                            </Form.Item>
                            {index !== 0 && canUpdateTeamRoles ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button team-team-roles__delete-icon"
                                    onClick={() => {
                                        removeTeamRole(index);
                                    }}
                                />
                            ) : null}
                        </Form.Item>
                    );
                })}
                {canUpdateTeamRoles ? (
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
                ) : null}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!canUpdateTeamRoles}
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
    canUpdateTeamRoles: hasTeamRole(state, PERM_UPDATE_TEAM_ROLES),
});

const mapDispatchToProps = {
    updateTeamRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamRoles);
