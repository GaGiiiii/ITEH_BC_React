import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from "axios"
import { ApiContext } from '../../App'
import "./rides.css"
import Ride from './Ride'

const Rides = () => {
    const [rides, setRides] = useState([]);
    const { api } = useContext(ApiContext);

    useEffect(() => {
        axios.get(`${api}/rides`).then(response => {
            setRides(response.data.rides);
        }).catch((error) => {
            console.log(error);
        });
    }, [api]);

    return (
        <Container className='mt-5'>
            <Row>
                <h1 className=''>Rides <hr /></h1>
                {rides && rides.map((ride, index) => (
                    <Ride key={index} ride={ride} rides={rides} setRides={setRides} />
                ))}
            </Row>
        </Container>
    )
}

export default Rides