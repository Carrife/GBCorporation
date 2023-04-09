import { useState, useEffect } from 'react';
import'../../App.css';
import ApplicantAdd from './ApplicantAdd';
import ApplicantEdit from './ApplicantEdit';
import ApplicantTestData from './ApplicantTestData';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Layout, Table, Space, Button} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { GetAllApplicants, GetApplicantTestData, Applicant, GetApplicantById, TestData } from '../../Actions/ApplicantActions';

const Applicants = (props: {role: string, token: string}) => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [applicant, setApplicant] = useState<Applicant>();
    const [applicantId, setApplicantId] = useState('');
    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalEditActive, setModalEditActive] = useState(false);
    const [modalTestDataActive, setModalTestDataActive] = useState(false);
    const [testData, setTestData] = useState<TestData>();
    const { Content } = Layout;
    
    interface DataType {
        key: React.Key;
        nameRu: string;
        nameEn: string;
        login: string;
        phone: string;
        status: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name (Ru)',
            dataIndex: 'nameRu',
            key: 'nameRu',
            sorter: {
                compare: (a, b) => (a.nameRu.toLowerCase() < b.nameRu.toLowerCase()) ? 1 : -1,
            },
        },
        {
            title: 'Name (En)',
            dataIndex: 'nameEn',
            key: 'nameEn',
            sorter: {
                compare: (a, b) => (a.nameRu.toLowerCase() < b.nameRu.toLowerCase()) ? 1 : -1,
            },
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
            sorter: {
                compare: (a, b) => (a.nameRu.toLowerCase() < b.nameRu.toLowerCase()) ? 1 : -1,
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
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
                    <Button type='text' onClick={() => applicantEdit(record.key.toString())}><AiIcons.AiOutlineEdit/></Button>                
                    <Button type='text' onClick={() => applicantTestData(record.key.toString())}><AiIcons.AiOutlineUnorderedList/></Button>            
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
                GetAllApplicants(props.token).then(result => setApplicants(result));
            }
        })();        
    }, [props.token]);
    
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const applicantEdit = async (id: string) => {
        GetApplicantById(props.token, id).then(result => setApplicant(result));
        setModalEditActive(true);
    };

    const applicantTestData = async (id: string) => {
        GetApplicantTestData(props.token, id).then(result => setTestData(result)); 
        setApplicantId(id);       
        setModalTestDataActive(true);
    };

    return (
        <Layout className='layout'>
            <Sidebar role={props.role}/>
            <Layout className='page-layout'>
                <Content>
                    <Button type="link" onClick={() => setModalAddActive(true)}>Create New</Button>
                    <Table columns={columns} dataSource={applicants} onChange={onChange} />
                    <ApplicantAdd active={modalAddActive} setActive={setModalAddActive} token={props.token}/>
                    <ApplicantTestData active={modalTestDataActive} applicantId={applicantId} setActive={setModalTestDataActive} testData={testData} token={props.token}/>
                    <ApplicantEdit active={modalEditActive} setActive={setModalEditActive} applicant={applicant} token={props.token}/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Applicants;