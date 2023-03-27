import { useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import * as AiIcons from 'react-icons/ai';
import LMDescription from './Details/LMDescription';
import TLDescription from './Details/TLDescription';
import Notification from "../../Components/Notification/Notification";
import Errors from "../../Enums/Errors";

const HiringDetails = (props: {active: boolean, hiringId: string, setActive: (active: boolean) => void, hitingData: never[], role: string, token: string | null}) => {
    const [modalAddLMDescriptionActive, setModalAddLMDescriptionActive] = useState(false);
    const [modalAddTLDescriptionActive, setModalAddTLDescriptionActive] = useState(false);
    const [notification, setNotification] = useState('');
    const [description, setDescription] = useState('');
    
    const hitingData = props.hitingData;

    const addLMDescription = async (LMDescription: string) => {
        setDescription(LMDescription);
        setModalAddLMDescriptionActive(true);
        props.setActive(false);
    };

    const addTLDescription = async (TLDescription: string) => {
        setDescription(TLDescription);
        setModalAddTLDescriptionActive(true);
        props.setActive(false);
    };

    const hire = async () => {
        const response = await fetch("http://localhost:8000/api/Hiring/Hire", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: props.hiringId},
            credentials: 'include',
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
            
            <Notification title=''>{notification}</Notification>        }
        else
        {
            props.setActive(false);
            window.location.reload();
        }
    }

    const reject = async () => {
        const response = await fetch("http://localhost:8000/api/Hiring/Reject", {
            method: 'PUT',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: props.hiringId},
            credentials: 'include',
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
            
            <Notification title=''>{notification}</Notification>        }
        else
        {
            props.setActive(false);
            window.location.reload();
        }
    }

    hitingData.map(item => (
        console.log(item['status'])));

    return (
        <>
        <ModalWindow title='' isActive={props.active}>
            {hitingData.map(item => (
                <table>
                    <tbody>
                        <tr className="modal_table_td">
                            <th className="modal_data">Applicant</th>
                            <td className="modal_label">{item['applicant']['name']}</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Foreign language</th>
                            <td className="modal_label">{item['foreignLanguageTest']['title']} ({item['foreignLanguageTest']['result']}%)</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Logic</th>
                            <td className="modal_label">{item['logicTest']['result']}%</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Programming</th>
                            <td className="modal_label">{item['programmingTest']['title']} ({item['programmingTest']['result']}%)</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Interview date</th>
                            <td className="modal_label">{JSON.stringify(item['date']).split("T")[0].split('"')[1]}</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Line Manager</th>
                            <td className="modal_label">{item['lineManager']['name']}</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Description</th>
                            <td className="modal_label">{item['lineManagerDescription']}</td>
                            <td>
                                {((props.role === "LineManager" || props.role === "Admin") && item['status']['name'] !== 'Closed') ? 
                                    (<button className='modal_button_add' onClick={() => addLMDescription(item['lineManagerDescription'])}><AiIcons.AiOutlineEdit/></button>) 
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <th className="modal_data">Team Leader</th>
                            <td className="modal_label">{item['teamLeader']['name']}</td>
                        </tr>
                        <tr>
                            <th className="modal_data">Description</th>
                            <td className="modal_label">{item['teamLeaderDescription']}</td>
                            <td>
                                {((props.role === "TeamLeader" || props.role === "Admin") && item['status']['name'] !== 'Closed') ? 
                                    (<button className='modal_button_add' onClick={() => addTLDescription(item['teamLeaderDescription'])}><AiIcons.AiOutlineEdit/></button>) 
                                    : ''}
                            </td>
                        </tr>
                        {(item['teamLeaderDescription'] != null && item['lineManagerDescription'] != null && item['status']['name'] !== 'Closed') ? (
                            <>
                            <br/>
                            <tr>
                                <td>
                                    
                                    {(props.role === "Admin" || props.role === "HR") ? (<button className="modal_button" onClick={() => hire()}>Hire</button>) : ''}
                                </td>
                                <td>
                                    {(props.role === "Admin" || props.role === "HR") ? (<button className="modal_button" onClick={() => reject()}>Reject</button>) : ''}
                                </td>
                            </tr>
                            </>
                        ) : ''}
                    </tbody>
                </table>
            ))}            
        </ModalWindow>
        <LMDescription active={modalAddLMDescriptionActive} hiringId={props.hiringId} setActive={setModalAddLMDescriptionActive} descriptionLM={description} token={props.token}/>
        <TLDescription active={modalAddTLDescriptionActive} hiringId={props.hiringId} setActive={setModalAddTLDescriptionActive} descriptionTL={description} token={props.token}/>
        </>
    )
}

export default HiringDetails;