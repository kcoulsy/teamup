import React from 'react';
import { RootState } from '../store/configure';
import { connect } from 'react-redux';
import hasTeam from '../helpers/hasTeam';
import { Alert, Button, Row, Col } from 'antd';
import { useHistory, Redirect } from 'react-router-dom';
import { PATH_TEAM_CREATE } from '../constants/pageRoutes';
import { PATH_TEAM_PROJECTS } from './../constants/pageRoutes';

interface TeamProfileProps {
    hasTeam: boolean;
}

const TeamProfile: React.FunctionComponent<TeamProfileProps> = ({
    hasTeam,
}) => {
    const history = useHistory();
    if (!hasTeam) {
        return (
            <div>
                <Row justify="center">
                    <Col>
                        <Alert
                            message="You do not have a team! Contact your project manager for an
                            invite or create a team here"></Alert>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Button
                            className="page-team-profile__create-team-button"
                            onClick={() => history.push(PATH_TEAM_CREATE)}>
                            Create Team
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
    return <Redirect to={PATH_TEAM_PROJECTS} />;
};

const mapStateToProps = (state: RootState) => ({
    hasTeam: hasTeam(state),
});

export default connect(mapStateToProps)(TeamProfile);
