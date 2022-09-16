import React from 'react';
import {
  Alert, Button, Row, Col,
} from 'antd';
import { useHistory, Redirect } from 'react-router-dom';
import { PATH_TEAM_CREATE, PATH_TEAM_PROJECTS } from '../constants/pageRoutes';

import useTeams from '../hooks/useTeams';

function TeamProfile() {
  const { hasTeam } = useTeams();
  const history = useHistory();

  if (!hasTeam) {
    return (
      <div>
        <Row justify='center'>
          <Col>
            <Alert
              message='You do not have a team! Contact your project manager for an
                            invite or create a team here'
            />
          </Col>
        </Row>
        <Row justify='center'>
          <Col>
            <Button
              className='page-team-profile__create-team-button'
              onClick={() => history.push(PATH_TEAM_CREATE)}
            >
              Create Team
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  // TODO this should redirect in router
  return <Redirect to={PATH_TEAM_PROJECTS} />;
}

export default TeamProfile;
