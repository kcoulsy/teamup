import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import isLoggedIn from '../../helpers/isLoggedIn';
import { startLogout } from '../../actions/auth';
import { RootState } from '../../store/configure';

import {
    PATH_HOME,
    PATH_LOGIN,
    PATH_REGISTER,
    PATH_MY_PROFILE,
    PATH_MY_PROJECTS,
    PATH_ACCOUNT_SETTINGS,
    PATH_TEAM_PROFILE,
    PATH_TEAM_PROJECTS,
    PATH_TEAM_SETTINGS,
} from '../../constants/pageRoutes';
import hasTeam from '../../helpers/hasTeam';
import hasTeamRole from '../../helpers/hasTeamRole';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SideNavProps {
    isLoggedIn: boolean;
    startLogout: Function;
    showTeamProjects: boolean;
    showTeamSettings: boolean;
}

// Have to be strings for Antd Menu
enum MenuItemKey {
    DEFAULT = 'default',
    HOME = 'home',
    LOGIN = 'login',
    REGISTER = 'register',
    LOGOUT = 'logout',
    USER = 'user',
    USER_PROFILE = 'user_profile',
    USER_PROJECTS = 'user_projects',
    USER_SETTINGS = 'user_settings',
    TEAM = 'team',
    TEAM_PROFILE = 'team_profile',
    TEAM_PROJECTS = 'team_projects',
    TEAM_SETTINGS = 'team_settings',
}

export const SideNav: React.FunctionComponent<SideNavProps> = ({
    isLoggedIn,
    startLogout,
    showTeamProjects,
    showTeamSettings,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<MenuItemKey[]>([
        MenuItemKey.HOME,
    ]);
    const history = useHistory();
    useEffect(() => {
        if (
            isLoggedIn &&
            (selectedKeys.includes(MenuItemKey.LOGIN) ||
                selectedKeys.includes(MenuItemKey.REGISTER))
        ) {
            setSelectedKeys([MenuItemKey.HOME]);
        }
    }, [isLoggedIn, selectedKeys]);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo" />
            {!isLoggedIn ? (
                <Menu
                    theme="dark"
                    defaultSelectedKeys={selectedKeys}
                    selectedKeys={selectedKeys}
                    mode="inline">
                    <Menu.Item
                        key={MenuItemKey.DEFAULT}
                        style={{
                            fontFamily: "'Lobster', cursive",
                            color: 'white',
                            fontSize: 22,
                        }}>
                        TeamUp
                    </Menu.Item>
                    <Menu.Item
                        key={MenuItemKey.HOME}
                        icon={<HomeOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.HOME]);
                            history.push(PATH_HOME);
                        }}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key={MenuItemKey.LOGIN}
                        icon={<LoginOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.LOGIN]);
                            history.push(PATH_LOGIN);
                        }}>
                        Login
                    </Menu.Item>
                    <Menu.Item
                        key={MenuItemKey.REGISTER}
                        icon={<LoginOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.REGISTER]);
                            history.push(PATH_REGISTER);
                        }}>
                        Register
                    </Menu.Item>
                </Menu>
            ) : (
                <Menu
                    theme="dark"
                    defaultSelectedKeys={selectedKeys}
                    selectedKeys={selectedKeys}
                    mode="inline">
                    <Menu.Item
                        key={MenuItemKey.DEFAULT}
                        style={{
                            fontFamily: "'Lobster', cursive",
                            color: 'white',
                            fontSize: 22,
                        }}>
                        TeamUp
                    </Menu.Item>
                    <Menu.Item
                        key={MenuItemKey.HOME}
                        icon={<HomeOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.HOME]);
                            history.push(PATH_HOME);
                        }}>
                        Dashboard
                    </Menu.Item>
                    <SubMenu
                        key={MenuItemKey.USER}
                        icon={<UserOutlined />}
                        title="User">
                        <Menu.Item
                            key={MenuItemKey.USER_PROFILE}
                            onClick={() => {
                                setSelectedKeys([MenuItemKey.USER_PROFILE]);
                                history.push(PATH_MY_PROFILE);
                            }}>
                            My Profile
                        </Menu.Item>
                        <Menu.Item
                            key={MenuItemKey.USER_PROJECTS}
                            onClick={() => {
                                setSelectedKeys([MenuItemKey.USER_PROJECTS]);
                                history.push(PATH_MY_PROJECTS);
                            }}>
                            My Projects
                        </Menu.Item>
                        <Menu.Item
                            key={MenuItemKey.USER_SETTINGS}
                            onClick={() => {
                                setSelectedKeys([MenuItemKey.USER_SETTINGS]);
                                history.push(PATH_ACCOUNT_SETTINGS);
                            }}>
                            Account Settings
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={MenuItemKey.TEAM}
                        icon={<TeamOutlined />}
                        title="Team">
                        <Menu.Item
                            key={MenuItemKey.TEAM_PROFILE}
                            onClick={() => {
                                setSelectedKeys([MenuItemKey.TEAM_PROFILE]);
                                history.push(PATH_TEAM_PROFILE);
                            }}>
                            My Team
                        </Menu.Item>
                        {showTeamProjects ? (
                            <Menu.Item
                                key={MenuItemKey.TEAM_PROJECTS}
                                onClick={() => {
                                    setSelectedKeys([
                                        MenuItemKey.TEAM_PROJECTS,
                                    ]);
                                    history.push(PATH_TEAM_PROJECTS);
                                }}>
                                Team Projects
                            </Menu.Item>
                        ) : null}
                        {showTeamSettings ? (
                            <Menu.Item
                                key={MenuItemKey.TEAM_SETTINGS}
                                onClick={() => {
                                    setSelectedKeys([
                                        MenuItemKey.TEAM_SETTINGS,
                                    ]);
                                    history.push(PATH_TEAM_SETTINGS);
                                }}>
                                Team Settings
                            </Menu.Item>
                        ) : null}
                    </SubMenu>
                    <Menu.Item
                        key={MenuItemKey.LOGOUT}
                        icon={<LogoutOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.HOME]);
                            startLogout();
                            history.push(PATH_HOME);
                        }}>
                        Logout
                    </Menu.Item>
                </Menu>
            )}
        </Sider>
    );
};

export const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
        showTeamProjects:
            hasTeam(state) && hasTeamRole(state, 'team.project.create'),
        showTeamSettings:
            hasTeam(state) && hasTeamRole(state, 'team.project.create'),
    };
};

const mapDispatchToProps = { startLogout };

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
