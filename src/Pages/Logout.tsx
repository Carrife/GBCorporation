import { Navigate  } from 'react-router-dom';

const Logout = (props: {name: string, setName: (name: string) => void, role: string, setRole: (role: string) => void}) => {

        fetch("http://localhost:8000/api/Auth/Logout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        props.setName('');
        props.setRole('');
        window.localStorage.setItem('token', '');

        return <Navigate to="/"/>
}

export default Logout;