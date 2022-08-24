import React from 'react';
import { PageHeader } from 'antd';
import TeamSettingsPanel from '../components/TeamSettingsPanel/TeamSettingsPanel';

const TeamSettings: React.FunctionComponent = () => {
  return (
    <div>
      <PageHeader className='page__page-header' title='Team Settings' />
      <TeamSettingsPanel />
    </div>
  );
};

export default TeamSettings;
