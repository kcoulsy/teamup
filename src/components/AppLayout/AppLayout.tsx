import React from 'react';
import { Layout } from 'antd';
import SideNav from './../SideNav/SideNav';

const { Content } = Layout;
export const AppLayout: React.FunctionComponent = ({ children }) => {
    return (
        <Layout className="app-layout">
            <SideNav />
            <Layout>
                <Content className="app-layout__content">
                    <div className="app-layout__container">{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
