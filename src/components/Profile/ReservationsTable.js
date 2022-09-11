import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios"
import { ApiContext, CurrentUserContext } from '../../App'


const ReservationsTable = ({ reservations, setReservations }) => {
    const { api } = useContext(ApiContext);
    const { currentUser } = useContext(CurrentUserContext)

    function deleteReservation(reservation) {
        axios.delete(`${api}/reservations/${reservation.id}`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        }).then(response => {
            let reservationsG = [...reservations];
            let index = reservationsG.findIndex((r) => r.id === reservation.id);
            reservationsG.splice(index, 1);
            setReservations(reservationsG);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5'>
            <Col sm={12}>
                <Card className='shadow-sm payment-card'>
                    <Card.Body>
                        <h5 className="d-flex align-items-center mb-3">Reservations</h5>
                        {reservations && reservations.length > 0 ? <Table striped bordered hover className='reservations-table text-center'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Start Location</th>
                                    <th>End Location</th>
                                    <th>Date</th>
                                    <th>Space Left</th>
                                    <th>Reserved Space</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.ride.start_location}</td>
                                        <td>{reservation.ride.end_location}</td>
                                        <td>{reservation.ride.date}</td>
                                        <td>{reservation.ride.space}</td>
                                        <td>{reservation.space}</td>
                                        <td><Button onClick={() => deleteReservation(reservation)} variant="danger">Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> : 'No reservations'}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ReservationsTable