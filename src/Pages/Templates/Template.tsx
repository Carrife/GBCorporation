import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';
import'../../App.css';
import TemplateAdd from './TemplateAdd';
import TemplateUpload from './TemplateUpload';
import fileDownload from 'js-file-download';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../Components/Sidebar';

const Template = (props: {role: string, token:string}) => {
    const [templates, setTemplates] = useState([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalUploadActive, setModalUploadActive] = useState(false);
    const [id, setId] = useState('');

        useEffect(() => {
            fetch("http://localhost:8000/api/Template/GetAll", {
                method: "GET",
                headers: {'Accept': '*/*', "Authorization": "Bearer " + props.token},
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => setTemplates(data))
        }, []);

        const templateDelete = async (id: string, e: SyntheticEvent) => {
            e.preventDefault();
    
            const response = await fetch("http://localhost:8000/api/Template/Delete", {                
                method: 'POST',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id },
                credentials: 'include'
            });
    
            if(response.ok)
            {
                window.location.reload();
            }
        };

        const templateDownload = async (id: string, title: string, e: SyntheticEvent) => {
            e.preventDefault();
    
            const response = await fetch("http://localhost:8000/api/Template/Download", {                
                method: 'GET',
                headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json', id },
            })
            
            if(response.ok)
            {
                response.blob().then(res => fileDownload(res, title + '.xml'));
                <Navigate to="/templates"/>
            }
        };

    return (
        <>
            <Sidebar role={props.role}/>
        <div className='pages'> 
            <button className='button_link' onClick={() => setModalAddActive(true)}>Create New</button>
            <br/>
            <table className='pages-table'>
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Link
                        </th>
                        <th>
                            Last Update
                        </th>
                    </tr> 
                </thead>
                <tbody>
                    {templates.map(({id, name, link, lastUpdate}) => (
                        <tr key={id}>
                        <td>{name}</td>
                        <td>{link ? <button className='button_link' onClick={(e) => {setId(id); templateDownload(id, name, e)}}>Link</button> : ''}</td>
                        <td>{JSON.stringify(lastUpdate).split("T")[0].split('"')[1]}</td>
                        <td><button className='button_link' onClick={() => {setModalUploadActive(true); setId(id)}}>Upload</button></td>
                        <td><button className='button_link' onClick={(e) => templateDelete(id, e)}>Delete</button></td>
                    </tr>
                    )
                    )}
                </tbody>
            </table>
            <TemplateAdd active={modalAddActive} setActive={setModalAddActive} token={props.token}/>
            <TemplateUpload active={modalUploadActive} setActive={setModalUploadActive} id={id} token={props.token}/>
        </div>
        </>
    );
};

export default Template;