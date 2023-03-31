import { SyntheticEvent, useState } from "react";
import ModalWindow from "../../../Components/Modal/Modal";
import {Errors} from "../../../Enums/Errors";

const TLDescription = (props: {active: boolean, hiringId: string, setActive: (active: boolean) => void, descriptionTL: string, token: string | null}) => {
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Hiring/UpdateTLDescription", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: props.hiringId, description: description !== '' ? description : props.descriptionTL },
            credentials: 'include'
        });

        if(!response.ok)
        {
            if(response.status === 409)
            {
                response.json().then(data => setNotification(Errors[data['errorStatus']]));
            }
            else
            {
                setNotification(Errors[response.status]);
            }
            
            //<Notification>{notification}</Notification>        
        }
        else
        {
            setDescription('');
            props.setActive(false);
            window.location.reload();
        }
    }
    
    return (
        <>
        <ModalWindow title='' isActive={props.active} setActive={props.setActive}>
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr className="modal_table_td">
                            <label className="modal_label">TL Description</label>
                            <br/>
                            <textarea cols={40} rows={4}  className="modal_input" defaultValue={props.descriptionTL} required
                                onChange={e => setDescription(e.target.value)}
                            />
                        </tr>
                    </tbody>
                </table>
                <br/><button className="modal_button" type="submit">Save</button>
            </form>
        </ModalWindow>
        </>
    )
}

export default TLDescription;