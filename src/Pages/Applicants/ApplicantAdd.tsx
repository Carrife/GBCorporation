import { SyntheticEvent, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import'../../Components/Modal/Modal.css';
import Notification from "../../Components/Notification/Notification";
import Errors from "../../Enums/Errors";

const ApplicantAdd = (props: {active: boolean, setActive: (active: boolean) => void, token: string | null}) => {
    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const [login, setLogin] = useState('');
    const [activeNotif, setActiveNotif] = useState(false);
    const [notification, setNotification] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Applicant/Create", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                nameRu,
                surnameRu,
                patronymicRu,
                nameEn,
                surnameEn,
                login,
                phone
            })
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
            
            <Notification title=''>{notification}</Notification>
        }
        else
        {
            props.setActive(false);
            window.location.reload();
        }
    }
    
    return (
        <>
        <ModalWindow title='' isActive={props.active}>
            <form onSubmit={submit}>
                <table>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Name Ru</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setNameRu(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Surname Ru</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setSurnameRu(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Patronymic Ru</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setPatronymicRu(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Name En</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setNameEn(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Surname En</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setSurnameEn(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Phone</label>
                            <br/>
                            <input type="text" className="modal_input" value={phone} required
                                onChange={e => setPhone(e.target.value)}
                            />   
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Login</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setLogin(e.target.value)}
                            />
                        </tr>
                    </td>
                </table>
                <br/><button className="modal_button" type="submit">Create</button>
            </form>
        </ModalWindow>
        </>
    )
}

export default ApplicantAdd;