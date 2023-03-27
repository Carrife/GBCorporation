import { SyntheticEvent, useState } from "react";
import Modal from "../../../Components/Modal";
import Notification from "../../../Components/Notification";
import Errors from "../../../Enums/Errors";

const LMDescription = (props: {active: boolean, hiringId: string, setActive: (active: boolean) => void, descriptionLM: string, token: string | null}) => {
    const [description, setDescription] = useState('');
    const [activeNotif, setActiveNotif] = useState(false);
    const [notification, setNotification] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Hiring/UpdateLMDescription", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: props.hiringId, description: description !== '' ? description : props.descriptionLM },
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
            
            setActiveNotif(true);
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
        <Modal active={props.active} setActive={props.setActive} type=''>
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr className="modal_table_td">
                            <label className="modal_label">LM Description</label>
                            <br/>
                            <textarea cols={40} rows={4}  className="modal_input" defaultValue={props.descriptionLM} required
                                onChange={e => setDescription(e.target.value)}
                            />
                        </tr>
                    </tbody>
                </table>
                <br/><button className="modal_button" type="submit">Save</button>
            </form>
        </Modal>
        <Notification active={activeNotif} setActive={setActiveNotif}>{notification}</Notification>
        </>
    )
}

export default LMDescription;