import'./Modal.css';
import { Modal } from 'antd';
import { useState } from 'react';

const ModalWindow = (props: {title: string, isActive: boolean, children: any}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(props.isActive)
    {
        setIsModalOpen(true);
    }

    return (
        <Modal title={props.title} open={isModalOpen}>
            {props.children}
        </Modal>
    );
};

export default ModalWindow;