import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

/**
 * https://reactjs.org/docs/portals.html
 */
class Portal extends React.Component<ModalProps> {
  private modalRoot: HTMLElement;

  private el: HTMLDivElement;

  constructor(props: ModalProps) {
    super(props);
    this.modalRoot = document.getElementById('modal-root') || document.createElement('div');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
