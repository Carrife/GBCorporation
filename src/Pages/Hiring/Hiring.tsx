import React, { useState, useEffect, SyntheticEvent } from 'react';
import'../../App.css';
import { Navigate } from 'react-router-dom';
import HirinAdd from './HiringAdd';
import HiringDetails from './HiringDetails';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Hiring = (props: {role: string, userId: string, token: string}) => {
    const [hirings, setHirings] = useState([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalDetailsActive, setModalDetailsActive] = useState(false);
    const [hitingData, setHiringData] = useState([]);

    const [id, setId] = useState('');

    useEffect(() => {(
        load => {
            if(window.localStorage.getItem('token') === 'undefined')
            {
                window.location.href = "/"
            }
            else
            {
                 fetch("http://localhost:8000/api/Hiring/GetAll", {
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token,'Content-Type': 'application/json', userId: props.userId, role: props.role},
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setHirings(data));
            }

           
            
        })();        
    }, [props.token, props.userId, props.role]);

    const hiringtData = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch("http://localhost:8000/api/Hiring/GetById", {
            method: 'GET',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id},
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
            {props.role === "Admin" || props.role === "HR" ? <button className='button_link' onClick={() => setModalAddActive(true)}>Create New</button> : ''}
                <table className='pages-table'>
                    <thead>
                        <tr>
                            <th>
                                Applicant
                            </th>
                            <th>
                                Interviewers
                            </th>
                            <th>
                                Position
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
                        {hirings.length !== 0 ? hirings.map(({id, applicant, lineManager, teamLeader, date, status}, index) => (
                            <tr key={index}>
                                <td>{applicant['name']}</td>
                                <td>{lineManager['name']}</td>
                                <td>{teamLeader['name']}</td>
                                <td>{JSON.stringify(date).split("T")[0].split('"')[1]}</td>
                                <td>{status['name']}</td>
                                <td><button className='button_table' onClick={(e) => hiringtData(id, e)}><AiIcons.AiOutlineUnorderedList/></button></td>
                            </tr>
                        )) : ''}
                    </tbody>
                </table>
                <HirinAdd active={modalAddActive} setActive={setModalAddActive} token={props.token}/>
                <HiringDetails active={modalDetailsActive} hiringId={id} setActive={setModalDetailsActive} hitingData={hitingData} role={props.role} token={props.token}/>
            </div>
        </>
    );
};

export default Hiring;