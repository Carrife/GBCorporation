import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../../Components/Modal";
import'../../Components/Modal.css';
import Notification from "../../Components/Notification";
import Errors from "../../Enums/Errors";

const HiringAdd = (props: {active: boolean, setActive: (active: boolean) => void, token: string | null}) => {
    const [applicantId, setApplicantId] = useState(0);
    const [applicants, setApplicants] = useState([]);
    const [teamLeaderId, setTeamLeaderId] = useState(0);
    const [teamLeaders, setTeamLeaders] = useState([]);
    const [lineManagerId, setLineManagerId] = useState(0);
    const [lineManagers, setLineManagers] = useState([]);
    const [logicTestId, setLogicTestId] = useState(0);
    const [logicTests, setLogicTests] = useState([]);
    const [programmingTestId, setProgrammingTestId] = useState(0);
    const [programmingTests, setProgrammingTests] = useState([]);
    const [foreignLanguageTestId, setForeignLanguageTestId] = useState(0);
    const [foreignLanguageTests, setForeignLanguageTests] = useState([]);
    const [date, setDate] = useState('');
    const [activeNotif, setActiveNotif] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {(
        load => {
            if(props.token === '')
            {
                return <Navigate to="/"/>
            }

            fetch("http://localhost:8000/api/Applicant/GetActiveShort", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token },
            })
                .then(response => response.json())
                .then(data => setApplicants(data));
            
            fetch("http://localhost:8000/api/Employee/GetTLShort", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token },
            })
                .then(response => response.json())
                .then(data => setTeamLeaders(data));

            fetch("http://localhost:8000/api/Employee/GetLMShort", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token },
            })
                .then(response => response.json())
                .then(data => setLineManagers(data));
        })();        
    }, [props.token]);

    useEffect(() => {(
        load => {
            if(applicants.length > 0)
            {
                var applicId = applicantId === 0 ? applicants['0']['id'] : applicantId
            
                fetch("http://localhost:8000/api/Hiring/GetLogicTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setLogicTests(data));

                fetch("http://localhost:8000/api/Hiring/GetProgrammingTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setProgrammingTests(data));

                fetch("http://localhost:8000/api/Hiring/GetForeignTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setForeignLanguageTests(data));
            }
        })();       
    }, [applicantId, props.token, applicants]);
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Hiring/Create", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                applicant: {id: applicantId === 0 ? applicants['0']['id'] : applicantId, name:""},
                teamLeader: {id: teamLeaderId === 0 ? teamLeaders['0']['id'] : teamLeaderId, name:""},
                lineManager: {id: lineManagerId === 0 ? lineManagers['0']['id'] : lineManagerId, name:""},
                logicTest: {id: logicTestId === 0 ? logicTests['0']['id'] : logicTestId, title:""},
                programmingTest: {id: programmingTestId === 0 ? programmingTests['0']['id'] : programmingTestId, title:""},
                foreignLanguageTest: {id: foreignLanguageTestId === 0 ? foreignLanguageTests['0']['id'] : foreignLanguageTestId, title:""},
                status: {id: 0, name: ""},
                date
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
                            <label className="modal_label">Applicant</label>
                            <br/>
                            <select className="modal_input" value={applicantId} onChange={e => setApplicantId(Number.parseInt(e.target.value))}>
                                {applicants.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Team Leader</label>
                            <br/>
                            <select className="modal_input" value={teamLeaderId} onChange={e => setTeamLeaderId(Number.parseInt(e.target.value))}>
                                {teamLeaders.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Line Manager</label>
                            <br/>
                            <select className="modal_input" value={lineManagerId} onChange={e => setLineManagerId(Number.parseInt(e.target.value))}>
                                {lineManagers.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Logic test</label>
                            <br/>
                            <select className="modal_input" value={logicTestId} onChange={e => setLogicTestId(Number.parseInt(e.target.value))}>
                                {logicTests.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Programming test</label>
                            <br/>
                            <select className="modal_input" value={programmingTestId} onChange={e => setProgrammingTestId(Number.parseInt(e.target.value))}>
                                {programmingTests.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Foreign language test</label>
                            <br/>
                            <select className="modal_input" value={foreignLanguageTestId} onChange={e => setForeignLanguageTestId(Number.parseInt(e.target.value))}>
                                {foreignLanguageTests.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Interview date</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setDate(e.target.value)}
                            />  
                        </tr>
                    </td>
                </table>
                <br/><button className="modal_button" type="submit">Create</button>
            </form>
        </Modal>
        <Notification active={activeNotif} setActive={setActiveNotif}>{notification}</Notification>
        </>
    )
}

export default HiringAdd;