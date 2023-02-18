import { SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../../Components/Modal";
import'../../Components/Modal.css';

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

    useEffect(() => {(
        load => {
            if(props.token?.length === 0)
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
    }, []);

    useEffect(() => {(
        load => {
            if(applicantId > 0)
            {
                fetch("http://localhost:8000/api/Hiring/GetLogicTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicantId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setLogicTests(data));

                fetch("http://localhost:8000/api/Hiring/GetProgrammingTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicantId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setProgrammingTests(data));

                fetch("http://localhost:8000/api/Hiring/GetForeignTestShort", {
                    method: 'GET',
                    headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id: applicantId.toString() },
                })
                    .then(response => response.json())
                    .then(data => setForeignLanguageTests(data));
            }
            
        })();       
    }, [applicantId]);
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Hiring/Create", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                applicantId,
                teamLeaderId,
                lineManagerId,
                logicTestId,
                programmingTestId,
                foreignLanguageTestId,
                date
            })
        });

        if(!response.ok)
        {
            console.log('Error');
        }

        props.setActive(false);
        window.location.reload();
    }
    
    return (
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
    )
}

export default HiringAdd;