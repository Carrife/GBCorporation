import'../../App.css';
import './Navbar.css'
import { Typography, Layout, Space } from 'antd';
const { Title, Text } = Typography;
const { Header } = Layout;
 
const Navbar = (props: {name: string, role: string}) => {
    return (
        <Layout>
            <Header className='navbar'>
                <Space.Compact direction="horizontal" className='nav-space-horizontal' >
                    <Title level={4} italic style={{ marginTop: 5, color: 'lightgrey', minWidth: 200}}>GB Corporation</Title>
                        <Space.Compact direction="vertical" className='navbar-space-vertical'>
                            <Text style={{ color: 'lightgrey'}}>      
                                {props.name ? props.name : ""}
                                <br/>
                                {props.role ? props.role : ""}
                            </Text>    
                        </Space.Compact>                    
                </Space.Compact>                                             
            </Header>
       </Layout>
    );
}

export default Navbar;