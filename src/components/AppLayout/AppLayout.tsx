import React from 'react';
import { Layout } from 'antd';
import SideNav from './../SideNav/SideNav';

const { Header, Content } = Layout;
export const AppLayout: React.FunctionComponent = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: '0 16px' }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
