import { SyntheticEvent, useState } from "react";
import Modal from "../../Components/Modal/Modal";
import'../../Components/Modal/Modal.css';

const TemplateAdd = (props: {active: boolean, setActive: (active: boolean) => void, token: string | null}) => {
    const [name, setName] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Template/Create", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name
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
                            <label className="modal_label">Title</label>
                            <br/>
                            <input type="text" className="modal_input" required
                                onChange={e => setName(e.target.value)}
                            />
                        </tr>
                    </td>
                </table>

                <br/><button className="modal_button" type="submit">Create</button>
            </form>
        </Modal>
    )
}

export default TemplateAdd;