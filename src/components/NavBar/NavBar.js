import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogout } from './../../actions/auth';
import isLoggedIn from '../../helpers/isLoggedIn';

function NavBar({ isLoggedIn, startLogout }) {
    const handleLogout = (ev) => {
        ev.preventDefault();
        startLogout();
    };

    return (
        <div className="ui menu">
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
                        <a href="/" className="item" onClick={handleLogout}>
                            Logout
                        </a>
                    </Fragment>
                )}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state.auth.token),
    };
};

const mapDispatchToProps = { startLogout };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
