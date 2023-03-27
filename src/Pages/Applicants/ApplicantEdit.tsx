import { SyntheticEvent, useState } from "react";
import Modal from "../../Components/Modal/Modal";
import Notification from "../../Components/Notification/Notification";
import Errors from "../../Enums/Errors";

const ApplicantEdit = (props: {active: boolean, setActive: (active: boolean) => void, id: string, nameRu: string, surnameRu: string, patronymicRu: string, nameEn: string, surnameEn: string, phone: string, token: string | null}) => {
    const id = props.id;
    const propsNameRu = props.nameRu;
    const propsSurnameRu = props.surnameRu;
    const propsPatronymicRu = props.patronymicRu;
    const propsNameEn = props.nameEn;
    const propsSurnameEn = props.surnameEn;
    const propsPhone = props.phone;

    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const [activeNotif, setActiveNotif] = useState(false);
    const [notification, setNotification] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Applicant/Update", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id,
                nameRu: nameRu === '' ? propsNameRu : nameRu,
                surnameRu: surnameRu === '' ? propsSurnameRu : surnameRu,
                patronymicRu: patronymicRu === '' ? propsPatronymicRu : patronymicRu,
                nameEn: nameEn === '' ? propsNameEn : nameEn,
                surnameEn: surnameEn === '' ? propsSurnameEn : surnameEn,
                phone: phone === '' ? propsPhone : phone
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
            
            setActiveNotif(true);
        }
        else
        {
            props.setActive(false);
            window.location.reload();
        } 
    }
    
    return (
        <>
        <Modal active={props.active} setActive={props.setActive} type=''>
            <form onSubmit={submit}>
                <table>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Name Ru</label>
                            <br/>
                            <input type="text" id="nameRu" className="modal_input" defaultValue={props.nameRu} required
                                onChange={e => setNameRu(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Surname Ru</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.surnameRu} required
                                onChange={e => setSurnameRu(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Patronymic Ru</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.patronymicRu} required
                                onChange={e => setPatronymicRu(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Name En</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.nameEn} required
                                onChange={e => setNameEn(e.target.value)}
                            />
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Surname En</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.surnameEn} required
                                onChange={e => setSurnameEn(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Phone</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.phone} required
                                onChange={e => setPhone(e.target.value)}
                            />   
                        </tr>
                    </td>
                </table>

                <br/><button className="modal_button" type="submit">Save</button>
            </form>
        </Modal>
        <Notification active={activeNotif} setActive={setActiveNotif}>{notification}</Notification>
        </>
    )
}

export default ApplicantEdit;