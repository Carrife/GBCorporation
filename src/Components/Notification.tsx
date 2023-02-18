import'./Notification.css';
import * as AiIcons from 'react-icons/ai';

const Notification = (props: {active: boolean, setActive: (active: boolean) => void, children: any}) => {
    
    const close = async () => {
        props.setActive(false);
    };

    return (
        <div className={props.active ? "notification active" : "notification"}>
            <div className="notification_content">
                <button className='notification_button' onClick={() => close()}><AiIcons.AiOutlineClose/></button>
                <h6><AiIcons.AiOutlineExclamationCircle/> Error</h6>
                {props.children}
            </div>
        </div>
    );
}

export default Notification;