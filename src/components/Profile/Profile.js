import React, { useContext, useEffect, useState } from 'react'
import NavbarC from '../Navbar/NavbarC'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { ApiContext, CurrentUserContext } from '../../App'
import axios from "axios"
import RidesTable from './RidesTable'
import ReservationsTable from './ReservationsTable'

const Profile = () => {
    const [reservations, setReservations] = useState([])
    const [rides, setRides] = useState([])
    const { currentUser } = useContext(CurrentUserContext)

    const { api } = useContext(ApiContext);

    useEffect(() => {
        axios.get(`${api}/users/${currentUser.id}/reservations`, {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).then(response => {
            setReservations(response.data.reservations);
        }).catch((error) => {
            console.log(error);
        });
        axios.get(`${api}/users/${currentUser.id}/rides`, {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        }).then(response => {
            setRides(response.data.rides);
        }).catch((error) => {
            console.log(error);
        });
    }, [api, currentUser]);

    return (
        <>
            <NavbarC active='profile' />

            <Container className='mb-5'>
                {currentUser && <div className="main-body mt-5">
                    <Row className='equal'>
                        <Col lg={{ span: 4, offset: 4 }} style={{ height: `100%` }}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div className="mt-3">
                                            <h4>{`${currentUser.first_name} ${currentUser.last_name}`}</h4>
                                            <p className="text-muted font-size-sm">{currentUser.email}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <RidesTable rides={rides} setRides={setRides} />
                    <ReservationsTable reservations={reservations} setReservations={setReservations} />
                </div>}
            </Container>
        </>
    )
}

export default Profile