import React, { useState, useEffect, SyntheticEvent } from 'react';
import'../../App.css';
import { Navigate } from 'react-router-dom';
import HirinAdd from './HiringAdd';
import HiringDetails from './HiringDetails';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../Components/Sidebar';

const Hiring = (props: {role: string}) => {
    const [hirings, setHirings] = useState([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalDetailsActive, setModalDetailsActive] = useState(false);
    const [hitingData, setHiringData] = useState([]);

    const [id, setId] = useState('');
    const token = window.localStorage.getItem('token');

    useEffect(() => {(
        load => {
            if(token === '')
            {
                //window.location.reload();
                return <Navigate to="/"/>
            }
                
            fetch("http://localhost:8000/api/Hiring/GetAll", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + token },
            })
                .then(response => response.json())
                .then(data => setHirings(data));
        })();        
    }, []);

    const hiringtData = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch("http://localhost:8000/api/Hiring/GetById", {
            method: 'GET',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + token, 'Content-Type': 'application/json', id},
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setHiringData(data))
        
        setId(id);
        setModalDetailsActive(true);
    };

    return (
        <>
            <Sidebar role={props.role}/>
            <div className='pages'>
                <button className='button_link' onClick={() => setModalAddActive(true)}>Create New</button>
                <table className='pages-table'>
                    <thead>
                        <tr>
                            <th>
                                Applicant
                            </th>
                            <th>
                                Line Manager
                            </th>
                            <th>
                                Team Leader
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Status
                            </th>
                        </tr> 
                    </thead>
                    <tbody>
                        {hirings.map(({id, applicant, lineManager, teamLeader, date, status}, index) => (
                            <tr key={index}>
                                <td>{applicant['name']}</td>
                                <td>{lineManager['name']}</td>
                                <td>{teamLeader['name']}</td>
                                <td>{JSON.stringify(date).split("T")[0].split('"')[1]}</td>
                                <td>{status['name']}</td>
                                <td><button className='button_link' onClick={(e) => hiringtData(id, e)}>Details</button></td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <HirinAdd active={modalAddActive} setActive={setModalAddActive} token={token}/>
                <HiringDetails active={modalDetailsActive} applicantId={id} setActive={setModalDetailsActive} hitingData={hitingData} token={token}/>
            </div>
        </>
    );
};

export default Hiring;