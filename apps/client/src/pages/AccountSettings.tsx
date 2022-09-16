import React from 'react';
import { PageHeader } from 'antd';
import UserSettings from '../components/UserSettings/UserSettings';

function AccountSettings() {
  return (
    <div>
      <PageHeader className='page__page-header' title='Account Settings' />
      <UserSettings />
    </div>
  );
}

export default AccountSettings;
