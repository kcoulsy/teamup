import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogout } from '../../actions/auth';
import isLoggedIn from '../../helpers/isLoggedIn';
import { RootState } from '../../store/configure';

interface NavBarProps {
    isLoggedIn: boolean;
    startLogout: Function;
}

export const NavBar: React.FunctionComponent<NavBarProps> = ({ isLoggedIn, startLogout }) => {
    const handleLogout = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        startLogout();
    };

    return (
        <div className="ui stackable menu">
            <Link to="/" className="header item">
                Home
            </Link>
            <div className="right menu">
                {!isLoggedIn ? (
                    <Fragment>
                        <Link to="/register" className="item">
                            Register
                        </Link>
                        <Link to="/login" className="item">
                            Login
                        </Link>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to="/secret" className="item">
                            Secret
                        </Link>
                        <a href="/" className="item" id="logout" onClick={handleLogout}>
                            Logout
                        </a>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

const mapDispatchToProps = { startLogout };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
