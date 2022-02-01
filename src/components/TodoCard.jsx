import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import UpdateTodo from './UpdateTodo';

export default function TodoCard({ todo }) {
    const { id } = todo;
    const { title, deadline } = todo;
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Card
                bg={deadline < (new Date()) ? 'danger' : 'dark'}
                key={id}
                text="white"
                style={{ margin: '10px', cursor: 'pointer' }}
                onClick={() => setShowModal(!showModal)}
            >
                <Card.Body>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text style={{ color: '#c8c8c8', fontSize: 'small' }}>
                        Deadline :
                        {' '}
                        <Moment fromNow>{deadline}</Moment>
                    </Card.Text>
                </Card.Body>
            </Card>
            <UpdateTodo todo={todo} showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
