import { SyntheticEvent, useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";

const EmployeeAdd = (props: {active: boolean, setActive: (active: boolean) => void, token: string | null}) => {
    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [languageId, setLanguageId] = useState('');
    const [departmentId, setDepartmentId] = useState(5);
    const [roleId, setRoleId] = useState(1);

    const [roles, setRoles] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/SuperDictionary/GetProgrammingLanguages", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setLanguages(data))

        fetch("http://localhost:8000/api/SuperDictionary/GetDepartments", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setDepartments(data))

        fetch("http://localhost:8000/api/Role/GetRoles", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setRoles(data))
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Auth/register", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                nameRu,
                surnameRu,
                patronymicRu,
                nameEn,
                surnameEn,
                phone,
                email,
                password,
                languageId: languageId === '' ? null : languageId,
                departmentId,
                roleId
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
        <ModalWindow title='' isActive={props.active} setActive={props.setActive}>
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
                            <br/><label className="modal_label">Language</label>
                            <br/>
                            <select className="modal_input" value={languageId} onChange={e => setLanguageId(e.target.value)}>
                                <option key={''} value={''}>-</option>
                                {languages.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Department</label>
                            <br/>
                            <select className="modal_input" value={departmentId} onChange={e => setDepartmentId(Number.parseInt(e.target.value))}>
                                {departments.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                    </td>
                </table>
                <table>
                    <td className="modal_table_td">
                        <tr>
                            <br/><label className="modal_label">Email</label>
                            <br/>
                            <input type="email" className="modal_input" required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <br/><label className="modal_label">Password</label>
                            <br/>
                            <input type="password" className="modal_input" required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </tr>
                    </td>
                    <td className="modal_table_td">
                        <tr>
                            <br/><label className="modal_label">Role</label>
                            <br/>
                            <select className="modal_input" value={roleId} onChange={e => setRoleId(Number.parseInt(e.target.value))}>
                                {roles.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                            <br/> 
                        </tr>  
                    </td> 
                </table>

                <br/><button className="modal_button" type="submit">Create</button>
            </form>
        </ModalWindow>
    )
}

export default EmployeeAdd;