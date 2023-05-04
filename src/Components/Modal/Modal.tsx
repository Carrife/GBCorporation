import { Modal } from 'antd';

const ModalWindow = (props: {title: string, isActive: boolean, onCancel: () => void, children: any}) => {    
    
    return (
        <Modal width={'fit-content'}  style={{display: 'flex', alignSelf: 'center'}} title={props.title} open={props.isActive} onCancel={props.onCancel} footer={[]}>
            {props.children}
        </Modal>
    );
};

export default ModalWindow;