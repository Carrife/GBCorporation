import { Modal } from 'antd';

const ModalWindow = (props: {title: string, isActive: boolean, setActive: (active: boolean) => void, children: any}) => {    
    
    const handleCancel = () => {
        props.setActive(false);
    };

    return (
        <Modal width={'fit-content'}  style={{display: 'flex', alignSelf: 'center'}} title={props.title} open={props.isActive} onCancel={handleCancel} footer={[]}>
            {props.children}
        </Modal>
    );
};

export default ModalWindow;