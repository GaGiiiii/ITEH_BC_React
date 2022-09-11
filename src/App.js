import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import React, { useState } from 'react';
import { isLoggedIn } from './Helpers';
import AddRide from './components/Rides/AddRide';
import EditRide from './components/Rides/EditRide';

export const ApiContext = React.createContext();
export const CurrentUserContext = React.createContext(null);

function App() {
    const api = "http://localhost:8000/api";

    const [currentUser, setCurrentUser] = useState(() => isLoggedIn());

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <ApiContext.Provider value={{ api }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={currentUser ? <Navigate to='/' /> : <Register />} />
                        <Route path="/login" element={currentUser ? <Navigate to='/' /> : <Login />} />
                        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to='/login' />} />
                        <Route path="/add-ride" element={currentUser ? <AddRide /> : <Navigate to='/login' />} />
                        <Route path="/edit-ride/:id" element={currentUser ? <EditRide /> : <Navigate to='/login' />} />
                    </Routes>
                </BrowserRouter>
            </ApiContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
