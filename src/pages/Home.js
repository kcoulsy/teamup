import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';

function Home() {
    const [modalActive, setModalActive] = useState(true);
    const toggleModal = () => {
        setModalActive(!modalActive);
    };
    return (
        <div>
            <h3>Home Page</h3>
            <button className="ui button" onClick={toggleModal}>
                Open Modal
            </button>
            <Modal
                headerTitle="hello"
                isActive={modalActive}
                actions={[{ buttonLabel: 'Close', klasses: 'positive right labeled icon ', onClick: toggleModal }]}>
                this is content
            </Modal>
        </div>
    );
}

export default Home;
