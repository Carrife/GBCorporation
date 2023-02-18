import { SyntheticEvent, useState } from "react";
import Modal from "../../../Components/Modal";

const TLDescription = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, token: string | null}) => {
    const applicantId = props.applicantId;
    const [description, setDescription] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Hiring/CreateLogicTestData", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                description,
                applicantId
            })
        });

        if(!response.ok)
        {
            console.log('Error');
        }

        props.setActive(false);
        //window.location.reload();
    }
    
    return (
        <Modal active={props.active} setActive={props.setActive} type=''>
            <form onSubmit={submit}>
                <table>
                    <td className="modal_table_td">
                        <tr>
                            <label className="modal_label">Result</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setDescription(e.target.value)}
                            />
                        </tr>
                    </td>
                </table>
                <br/><button className="modal_button" type="submit">Save</button>
            </form>
        </Modal>
    )
}

export default TLDescription;