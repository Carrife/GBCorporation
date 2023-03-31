import { SyntheticEvent, useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";

const EmployeeEdit = (props: {active: boolean, setActive: (active: boolean) => void, id: string, nameRu: string, surnameRu: string, patronymicRu: string, nameEn: string, surnameEn: string, phone: string, workPhone: string, departmentId: string, languageId: string, token: string | null}) => {
    const id = props.id;
    const propsNameRu = props.nameRu;
    const propsSurnameRu = props.surnameRu;
    const propsPatronymicRu = props.patronymicRu;
    const propsNameEn = props.nameEn;
    const propsSurnameEn = props.surnameEn;
    const propsPhone = props.phone;
    const propsWorkPhone = props.workPhone;
    const propsLanguage = props.languageId === '' ? null : {id: Number(props.languageId), name: ''};
    const propsDepartment = {id: Number(props.departmentId), name: ''};

    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [language, setLanguage] = useState({id: '', name: ''});
    const [department, setDepartment] = useState({id: 0, name: ''});

    const [languages, setLanguages] = useState([]);
    const [departments, setDepartments] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8000/api/SuperDictionary/GetProgrammingLanguages",
        {
            method:"GET",
            headers:{'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setLanguages(data))

        fetch("http://localhost:8000/api/SuperDictionary/GetDepartments",
        {
            method:"GET",
            headers:{'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setDepartments(data))
            
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Employee/Update", {
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
                workPhone: workPhone === '' ? propsWorkPhone : workPhone,
                phone: phone === '' ? propsPhone : phone,
                language: (language.id === '' && language.name === '') ? propsLanguage : (language.id === 'null' ? null : language),
                department: (department.id === 0 && department.name === '') ? propsDepartment : department
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
                        <tr>
                            <br/><label className="modal_label">Work phone</label>
                            <br/>
                            <input type="text" className="modal_input" defaultValue={props.workPhone}
                                onChange={e => setWorkPhone(e.target.value)}
                            />   
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Language</label>
                            <br/>
                            <select className="modal_input" defaultValue={props.languageId} onChange={e => setLanguage(e.target.value === '' ? {id: 'null', name: ''} : {id: e.target.value, name: ''})}>
                                <option key={''} value={''}>-</option>
                                {languages.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                        <tr>
                            <br/><label className="modal_label">Department</label>
                            <br/>
                            <select className="modal_input" defaultValue={props.departmentId} onChange={e => setDepartment({id: Number(e.target.value), name: ''})}>
                                {departments.map(({id, name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </tr>
                    </td>
                </table>

                <br/><button className="modal_button" type="submit">Save</button>
            </form>
        </ModalWindow>
    )
}

export default EmployeeEdit;