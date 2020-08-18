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
import isLoggedIn from '../helpers/isLoggedIn';
import { startLogout } from '../actions/auth';
import { RootState } from '../store/configure';

import {
    PATH_HOME,
    PATH_LOGIN,
    PATH_REGISTER,
    PATH_SECRET,
} from './../constants/pageRoutes';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SideNavProps {
    isLoggedIn: boolean;
    startLogout: Function;
}

// Have to be strings for Antd Menu
enum MenuItemKey {
    HOME = 'home',
    LOGIN = 'login',
    REGISTER = 'register',
    SECRET = 'secret',
    LOGOUT = 'logout',
}

const SideNav: React.FunctionComponent<SideNavProps> = ({
    isLoggedIn,
    startLogout,
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
                        key={MenuItemKey.HOME}
                        icon={<HomeOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.HOME]);
                            history.push(PATH_HOME);
                        }}>
                        Home
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
                        key={MenuItemKey.HOME}
                        icon={<HomeOutlined />}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.HOME]);
                            history.push(PATH_HOME);
                        }}>
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key={MenuItemKey.SECRET}
                        onClick={() => {
                            setSelectedKeys([MenuItemKey.SECRET]);
                            history.push(PATH_SECRET);
                        }}>
                        Secret
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
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
    };
};

const mapDispatchToProps = { startLogout };

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
