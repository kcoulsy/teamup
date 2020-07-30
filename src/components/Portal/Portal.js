import React from 'react';
import ReactDOM from 'react-dom';

/**
 * https://reactjs.org/docs/portals.html
 */
class Portal extends React.Component {
    constructor(props) {
        super(props);
        this.modalRoot = document.getElementById('modal-root');
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

export default Portal;
