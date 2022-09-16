import React from 'react';
import { PageHeader } from 'antd';
import TeamSettingsPanel from '../components/TeamSettingsPanel/TeamSettingsPanel';

function TeamSettings() {
  return (
    <div>
      <PageHeader className='page__page-header' title='Team Settings' />
      <TeamSettingsPanel />
    </div>
  );
}

export default TeamSettings;
