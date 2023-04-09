import React, { useState, useEffect } from 'react';
import'../../App.css';
import HirinAdd from './HiringAdd';
import HiringDetails from './HiringDetails';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Button, Layout, Space, TableProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { GetAllHirings, HiringInterface } from '../../Actions/HiringActions';

const Hiring = (props: {role: string, userId: string, token: string}) => {
    const [hirings, setHirings] = useState<HiringInterface[]>([]);
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalDetailsActive, setModalDetailsActive] = useState(false);
    const [hiringId, setHiringId] = useState('');
    const { Content } = Layout;

    interface DataType {
        key: React.Key;
        applicant: string;
        date: string;
        position: string;
        status: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Applicant',
            dataIndex: 'applicant',
            key: 'applicant',
            sorter: {
                compare: (a, b) => (a.applicant.toLowerCase() < b.applicant.toLowerCase()) ? 1 : -1,
            },
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            sorter: {
                compare: (a, b) => (a.position.toLowerCase() < b.position.toLowerCase()) ? 1 : -1,
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: {
                compare: (a, b) => Date.parse(b.date) - Date.parse(a.date) ? 1 : -1,
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='text' onClick={() => hiringDetails(record.key.toString())}><AiIcons.AiOutlineUnorderedList/></Button>
                </Space>
            )
        },
    ];

    useEffect(() => {(
        load => {
            if(window.localStorage.getItem('token') === 'undefined')
            {
                window.location.href = "/"
            }
            else
            {
                GetAllHirings(props.token, props.role, props.userId).then(result => setHirings(result));
            }
        })();        
    }, [props.token, props.userId, props.role]);

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    
    const hiringDetails = async (id: string) => {
        setHiringId(id);
        setModalDetailsActive(true);
    };

    return (
        <Layout className='layout'>
            <Sidebar role={props.role}/>
            <Layout className='page-layout'>
                <Content>
                    {(props.role === "Admin" || props.role === "HR") ? <Button type="link" onClick={() => setModalAddActive(true)}>Create New</Button> : ''}
                    <Table columns={columns} dataSource={hirings} onChange={onChange} />
                    <HirinAdd active={modalAddActive} setActive={setModalAddActive} token={props.token}/>
                    <HiringDetails active={modalDetailsActive} hiringId={hiringId} setActive={setModalDetailsActive} role={props.role} token={props.token}/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Hiring;