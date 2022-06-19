import'./Modal.css';

const Modal = (props: {active: boolean, setActive: (active: boolean) => void, children: any, type: string}) => {
    return (
        <div className={props.active ? (props.type === 'test' ? "modal testactive" : "modal active"): "modal"} onClick={() => props.setActive(false)}>
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;