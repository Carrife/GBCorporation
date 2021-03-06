import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import Login from './Pages/Login';
import Employee from './Pages/Employees/Employees';
import Template from './Pages/Templates/Template';
import Test from './Pages/Tests/Test';
import Setting from './Pages/Setting';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Logout from './Pages/Logout';

function App() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/Auth/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
                setRole(content.role);
                window.localStorage.setItem('token', content.token);

                if(!response.ok)
                {
                    <Navigate to="/login"/>
                }
            }
        )();
    }, []);

    return (
      <div className="App">
          <BrowserRouter>
              <Nav name={name} role={role}/>
                <main>
                    <Routes>
                        <Route path="/" element={<Login setName={setName}  />} />
                        <Route path="/employees" element={<Employee role={role}/>} />
                        <Route path="/templates" element={<Template role={role}/>} />
                        <Route path="/tests" element={<Test username={name} role={role}/>} />
                        <Route path="/settings" element={<Setting name={name} role={role}/>} />
                        <Route path="/logout" element={<Logout name={name} setName={setName} role={role} setRole={setRole}/>} />
                    </Routes>
              </main>
          </BrowserRouter>
      </div>
  );
}

export default App;
