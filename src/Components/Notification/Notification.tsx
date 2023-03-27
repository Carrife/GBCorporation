import { notification } from 'antd';
import React from 'react';
import { AiOutlineNotification } from 'react-icons/ai';

const Notification = (props: {title: '', children: any}) => {
    const [api, contextHolder] = notification.useNotification();
    const Context = React.createContext({ name: 'Default' });
    
    api.error({
        message: props.title,
        description: <Context.Consumer>{props.children}</Context.Consumer>
    })
            
    return (
        <Context.Provider value={AiOutlineNotification}>
            {contextHolder}  
        </Context.Provider>
              
    );
}

export default Notification;