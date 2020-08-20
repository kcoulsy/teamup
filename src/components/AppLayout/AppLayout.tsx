import React from 'react';
import { Layout } from 'antd';
import SideNav from './../SideNav/SideNav';

const { Content } = Layout;
export const AppLayout: React.FunctionComponent = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
            <Layout className="site-layout">
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
