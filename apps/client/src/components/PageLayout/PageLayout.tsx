import React, { PropsWithChildren } from 'react';
import { PageHeader, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

interface PageLayoutProps {
  title?: string;
  subTitle?: string;
  onBack?: Function;
  headerButtons?: React.ReactNode[];
  prevPagePath?: string;
  loading: boolean;
}

function PageLayout({
  title,
  subTitle,
  onBack,
  headerButtons,
  prevPagePath,
  loading = false,
  children,
  ...rest
}: PropsWithChildren<PageLayoutProps>) {
  const history = useHistory();

  let onBackCb;

  if (typeof onBack !== 'undefined' || prevPagePath) {
    onBackCb = () => {
      if (typeof onBack !== 'undefined') {
        onBack();
      }
      if (prevPagePath) {
        history.push(prevPagePath);
      }
    };
  }

  return (
    <>
      <PageHeader
        className='page__page-header'
        title={title}
        subTitle={subTitle}
        onBack={onBackCb}
        extra={headerButtons}
        {...rest}
      />
      {loading ? (
        <div className='page-layout__loader-container'>
          <Spin />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default PageLayout;
