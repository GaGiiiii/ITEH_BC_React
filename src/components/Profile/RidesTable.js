import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { ApiContext, CurrentUserContext } from '../../App'
import axios from "axios"

const RidesTable = ({ rides, setRides }) => {
    const { api } = useContext(ApiContext);
    const { currentUser } = useContext(CurrentUserContext)

    function deleteRide(ride) {
        axios.delete(`${api}/rides/${ride.id}`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        }).then(response => {
            let ridesG = [...rides];
            let index = ridesG.findIndex((r) => r.id === ride.id);
            ridesG.splice(index, 1);
            setRides(ridesG);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Row className='mt-5'>
            <Col sm={12}>
                <div className='mb-4'><Button as={Link} to='/add-ride' size="lg" variant="dark">Add Ride</Button></div>
                <Card className='shadow-sm payment-card'>
                    <Card.Body>
                        <h5 className="d-flex align-items-center mb-3">Rides</h5>
                        {rides && rides.length > 0 ? <Table striped bordered hover className='rides-table text-center'>
                            <thead>
                                <tr className='text-center'>
                                    <th>Start Location</th>
                                    <th>End Location</th>
                                    <th>Date</th>
                                    <th>Space</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rides.map((ride, index) => (
                                    <tr key={index}>
                                        <td>{ride.start_location}</td>
                                        <td>{ride.end_location}</td>
                                        <td>{ride.date}</td>
                                        <td>{ride.space}</td>
                                        <td><Button as={Link} to={`/edit-ride/${ride.id}`} variant="warning">Edit</Button></td>
                                        <td><Button onClick={() => deleteRide(ride)} variant="danger">Delete</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> : 'No rides'}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default RidesTable