import { Component } from 'react';
import style from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleChangeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleChangeModal);
  }

  handleChangeModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={style.overlay} onClick={this.handleCloseBackdrop}>
        <div className={style.modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
