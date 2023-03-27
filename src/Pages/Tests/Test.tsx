import React, { useState, useEffect, SyntheticEvent } from 'react';
import'../../App.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TestStart from './TestStart';

const Test = (props: {username: string, role: string, token:string}) => {
    const [templates, setTemplates] = useState([]);
    const [modalStartActive, setModalStartActive] = useState(false);
    const [testName, setTestName] = useState('');
    const [testData, setTestData] = useState([{question:'', answers: []}]);

    useEffect(() => {
        fetch("http://localhost:8000/api/Template/GetAll", {
            method: "GET",
            headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token}
        })
            .then(response => response.json())
            .then(data => setTemplates(data))
    }, []);

    const startTest = async (id: string, e: SyntheticEvent, name: string) => {
        e.preventDefault();
        
        await fetch("http://localhost:8000/api/TestCompetencies/Start", {
            method: 'GET',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id},
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setTestData(data))
        
        setTestName(name);
        setModalStartActive(true);
    };

    return (
        <>
            <Sidebar role={props.role}/>
        <div className='pages'>
            <table className='pages-table'>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                    </tr> 
                </thead>
                <tbody>
                    {templates.map(({id, name}, index) => (
                        <tr key={index}>
                        <td>{name}</td>
                        <td><button className='button_link' onClick={(e) => {startTest(id, e, name)}}>Start</button></td>
                    </tr>
                    )
                    )}
                </tbody>
            </table>
            <TestStart active={modalStartActive} setActive={setModalStartActive} testData={testData} testName={testName} username={props.username} token={props.token}/>
        </div>
        </>
    );
};

export default Test;