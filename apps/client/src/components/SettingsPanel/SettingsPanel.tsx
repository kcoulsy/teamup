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

function SettingsPanel({ views }: SettingsPanelProps) {
  const [selectedPanelIndex, setSelectedPanelIndex] = useState<number>(0);

  return (
    <Layout className='site-layout-background settings-panel__layout'>
      <Sider className='settings-panel__sider' width={200}>
        <Menu
          mode='inline'
          defaultSelectedKeys={[views[selectedPanelIndex].key]}
          selectedKeys={[views[selectedPanelIndex].key]}
          className='settings-panel__menu'
        >
          {views.length &&
            views.map((view: SettingsPanelView, index: number) => (
              <Menu.Item
                key={view.key}
                icon={view.icon}
                onClick={() => {
                  setSelectedPanelIndex(index);
                }}
              >
                {view.label}
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Content className='settings-panel__content'>
        {views[selectedPanelIndex].viewComponent}
      </Content>
    </Layout>
  );
}

export default SettingsPanel;
