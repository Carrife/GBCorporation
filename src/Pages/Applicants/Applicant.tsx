import React, { useState, useEffect, SyntheticEvent } from 'react';
import Sidebar from '../../Components/Sidebar';
import'../../App.css';
import { Navigate } from 'react-router-dom';
import ApplicantAdd from './ApplicantAdd';
import ApplicantEdit from './ApplicantEdit';
import ApplicantTestData from './ApplicantTestData';

const Applicants = (props: {role: string}) => {
    const [applicants, setApplicants] = useState([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [modalTestDataActive, setModalTestDataActive] = useState(false);
    const [testData, setTestData] = useState({foreignLanguageTests:[], logicTests: [], programmingTests: []});

    const [id, setId] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [surnameRu, setSurnameRu] = useState('');
    const [patronymicRu, setPatronymicRu] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [surnameEn, setSurnameEn] = useState('');
    const [phone, setPhone] = useState('');
    const token = window.localStorage.getItem('token');

    useEffect(() => {(
        load => {
            if(token === '')
            {
                //window.location.reload();
                return <Navigate to="/"/>
            }
                
            fetch("http://localhost:8000/api/Applicant/GetAll", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + token },
            })
                .then(response => response.json())
                .then(data => setApplicants(data));
        })();        
    }, []);

    const applicantEdit = async (id: string, nameRu: string, surnameRu: string, patronymicRu: string, nameEn: string, surnameEn: string, 
            phone: string) => {
        
        setId(id);
        setNameRu(nameRu);
        setSurnameRu(surnameRu);
        setPatronymicRu(patronymicRu);
        setNameEn(nameEn);
        setSurnameEn(surnameEn);
        setPhone(phone);
        
        setModalEditActive(true);
    };

    const applicantTestData = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch("http://localhost:8000/api/Applicant/GetTestDatas", {
            method: 'GET',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json', id},
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setTestData(data))
        
        setId(id);
        setModalTestDataActive(true);
    };

    return (
        <>
            <Sidebar role={props.role}/>
            <div className='pages'>
                {props.role === "Admin" || props.role === "HR" ? <button className='button_link' onClick={() => setModalAddActive(true)}>Create New</button> : ''}
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
                                Login
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                Status
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {applicants.map(({id, nameRu, surnameRu, patronymicRu, nameEn, surnameEn, phone, login, status}, index) => (
                            <tr key={index}>
                                <td>{surnameRu} {nameRu} {patronymicRu}</td>
                                <td>{nameEn} {surnameEn}</td>
                                <td>{login}</td>
                                <td>{phone}</td>
                                <td>{status['name']}</td>
                                <td>{props.role === "Admin" || props.role === "LineManager" ?<button className='button_link' onClick={() => applicantEdit(id, nameRu, surnameRu, patronymicRu, nameEn, surnameEn, phone)}>Edit</button> : ''}</td>
                                <td><button className='button_link' onClick={(e) => applicantTestData(id, e)}>Details</button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <ApplicantAdd active={modalAddActive} setActive={setModalAddActive} token={token}/>
                <ApplicantTestData active={modalTestDataActive} applicantId={id} setActive={setModalTestDataActive} testData={testData} token={token}/>
                <ApplicantEdit active={modalEditActive} setActive={setModalEditActive} id={id} nameRu={nameRu} surnameRu={surnameRu} patronymicRu={patronymicRu} nameEn={nameEn} surnameEn={surnameEn} phone={phone} token={token}/>
            </div>
        </>
    );
};

export default Applicants;