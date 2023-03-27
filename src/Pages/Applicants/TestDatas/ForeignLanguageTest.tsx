import { SyntheticEvent, useEffect, useState } from "react";
import ModalWindow from "../../../Components/Modal/Modal";
import Notification from "../../../Components/Notification/Notification";
import Errors from "../../../Enums/Errors";

const ForeignLanguageTest = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, token: string | null}) => {
    const applicantId = props.applicantId;
    const [result, setResult] = useState(0);
    const [date, setDate] = useState('');
    const [languageId, setLanguageId] = useState(0);
    const [languages, setLanguages] = useState([]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/SuperDictionary/GetForeignLanguages", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setLanguages(data))
    }, [props.token]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Applicant/CreateForeignLanguageTestData", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                foreignLanguage: "",
                foreignLanguageId: languageId === 0 ? languages['0']['id'] : languageId,
                result,
                date,
                applicantId
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
            
            <Notification title=''>{notification}</Notification>        }
        else
        {
            setLanguageId(0);
            setResult(0);
            setDate('');
            props.setActive(false);
        }
    }
    
    return (
        <>
            <ModalWindow title='' isActive={props.active}>
                <form onSubmit={submit}>
                    <table>
                        <td className="modal_table_td">
                        <tr>
                                <label className="modal_label">Language</label>
                                <br/>
                                <select className="modal_input" value={languageId} onChange={e => setLanguageId(Number.parseInt(e.target.value))}>
                                    {languages.map(({id, name}) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))}
                                </select>
                            </tr>
                            <tr>
                                <label className="modal_label">Result</label>
                                <br/>
                                <input type="text" className="modal_input" required
                                    onChange={e => setResult(Number(e.target.value))}
                                    value={result}
                                />
                            </tr>
                            <tr>
                                <br/><label className="modal_label">Date</label>
                                <br/>
                                <input type="text" className="modal_input" required
                                    onChange={e => setDate(e.target.value)}
                                    value={date}
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

export default ForeignLanguageTest;