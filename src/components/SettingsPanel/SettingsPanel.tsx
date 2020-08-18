import React, { useState } from 'react';

import { Menu, Layout } from 'antd';

const { Content, Sider } = Layout;

export interface SettingsPanelView {
    key: string;
    label: string;
    icon?: React.ReactElement;
    viewComponent: React.ReactElement;
}

interface SettingsPanelProps {
    views: SettingsPanelView[];
}

const SettingsPanel: React.FunctionComponent<SettingsPanelProps> = ({
    views,
}) => {
    const [selectedPanelIndex, setSelectedPanelIndex] = useState<number>(0);

    return (
        <Layout
            className="site-layout-background"
            style={{ padding: '24px 0', background: '#fff' }}>
            <Sider style={{ background: '#fff' }} width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[views[selectedPanelIndex].key]}
                    selectedKeys={[views[selectedPanelIndex].key]}
                    style={{ height: '100%' }}>
                    {views.length &&
                        views.map((view: SettingsPanelView, index: number) => {
                            return (
                                <Menu.Item
                                    key={view.key}
                                    icon={view.icon}
                                    onClick={() => {
                                        setSelectedPanelIndex(index);
                                    }}>
                                    {view.label}
                                </Menu.Item>
                            );
                        })}
                </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {views[selectedPanelIndex].viewComponent}
            </Content>
        </Layout>
    );
};

export default SettingsPanel;
