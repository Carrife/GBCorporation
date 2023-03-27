import React, { useState, useEffect, SyntheticEvent } from 'react';
import'../../App.css';
import EmployeeAdd from './EmployeeAdd';
import EmployeeEdit from './EmployeeEdit';
import EmployeeTestData from './EmployeeTestsData';
import * as AiIcons from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';

const Employees = (props: {role: string, token:string}) => {
    const [employees, setEmployees] = useState([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [modalTestDataActive, setModalTestDataActive] = useState(false);
    const [testData, setTestData] = useState([]);

    const [id, setId] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [workPhone, setWorkPhone] = useState('');

    useEffect(() => {(
        load => {
            if(window.localStorage.getItem('login') === 'true')
            {
                window.localStorage.setItem('login', 'false');
                window.location.reload();
            }

            if(props.token === '')
            {
                return <Navigate to="/"/>
            }
                
            fetch("http://localhost:8000/api/Employee/GetAll", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token },
            })
                .then(response => response.json())
                .then(data => setEmployees(data));
        })();
    }, [props.token]);

    const employeeDelete = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/Employee/Delete", {                
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id },
            credentials: 'include'
        });

        if(response.ok)
        {
            window.location.reload();
        }
    };

    const employeeEdit = async (id: string, nameRu: string, surnameRu: string, patronymicRu: string, nameEn: string, surnameEn: string, 
            email: string, phone: string, workPhone: string, department: string, language: string, role:string) => {
        
        setId(id);
        
        setNameRu(nameRu);
        setSurnameRu(surnameRu);
        setPatronymicRu(patronymicRu);
        setNameEn(nameEn);
        setSurnameEn(surnameEn);
        setWorkPhone(workPhone);
        setPhone(phone);
        setEmail(email);
        setLanguage(language);
        setDepartment(department);
        setRole(role);
        
        setModalEditActive(true);
    };

    const employeeTestsData = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch("http://localhost:8000/api/Employee/GetById", {
            method: 'GET',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id},
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setTestData(data['testCompetencies']))
    
        setModalTestDataActive(true);
    };

    
    return (
        <>
            <Sidebar role={props.role}/>
            <div className='pages'>
                {props.role === "Admin" ? <button className='button_link' onClick={() => setModalAddActive(true)}>Create New</button> : ''}
                <table className='pages-table'>
                    <thead>
                        <tr>
                            <th>
                                Name Ru
                            </th>
                            <th>
                                Name En
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                WorkPhone
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                Language
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {employees.map(({id, nameRu, surnameRu, patronymicRu, nameEn, surnameEn, email, phone, workPhone, department, language, isTestRequest, role}, index) => (
                            <tr key={index}>
                                <td>{surnameRu} {nameRu} {patronymicRu}</td>
                                <td>{nameEn} {surnameEn}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{workPhone}</td>
                                <td>{department['name']}</td>
                                <td>{language ? language['name'] : ''}</td>
                                <td><button className='button_table' onClick={(e) => employeeTestsData(id, e)}><AiIcons.AiOutlineUnorderedList/></button></td>
                                <td>{props.role === "Admin" || props.role === "LineManager" ?<button className='button_table' onClick={() => employeeEdit(id, nameRu, surnameRu, patronymicRu, nameEn, surnameEn, email, phone, workPhone, department['id'], language === null ? '' : language['id'], role['id'])}><AiIcons.AiOutlineEdit/></button> : ''}</td>
                                <td>{props.role === "Admin" ? <button className='button_table' onClick={(e) => employeeDelete(id, e)}><AiIcons.AiOutlineDelete/></button> : ''}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <EmployeeAdd active={modalAddActive} setActive={setModalAddActive} token={props.token}/>
                <EmployeeTestData active={modalTestDataActive} setActive={setModalTestDataActive} testData={testData}/>
                <EmployeeEdit active={modalEditActive} setActive={setModalEditActive} id={id} nameRu={nameRu} surnameRu={surnameRu} patronymicRu={patronymicRu} nameEn={nameEn} surnameEn={surnameEn} phone={phone} workPhone={workPhone} departmentId={department} languageId={language} token={props.token}/>
            </div>
        </>
    );
};

export default Employees;