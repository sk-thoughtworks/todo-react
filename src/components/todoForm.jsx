import React, { useState } from 'react';
import {
    Button, Col, Form, Row, Spinner,
} from 'react-bootstrap';
import dateFormat from 'dateformat';

export default function TodoForm({ value, onSubmit, onCancel }) {
    const initialState = value;
    const [title, setTitle] = useState(value?.title || '');
    const [deadline, setDeadline] = useState(
        value?.deadline ? new Date(value?.deadline) : new Date(),
    );
    const [validated, setValidated] = useState();
    const [processing, setProcessing] = useState(false);

    const handleTitleChange = (e) => {
        if (processing) return;
        setTitle(e.target.value);
    };
    const handleDeadLineChange = (e, type) => {
        if (processing) return;
        const date = type === 'date' ? e.target.value : dateFormat(deadline, 'yyyy-mm-dd');
        const time = type === 'time' ? e.target.value : dateFormat(deadline, 'HH:MM');
        setDeadline(new Date(`${date} ${time}`));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(false);
            return;
        }
        setProcessing(true);
        onSubmit({
            title,
            deadline,
        });
    };

    return (
        <Form onSubmit={handleSubmit} validated={validated}>
            <Form.Group as={Row} className="mb-3" controlId="TodoTitle">
                <Form.Label column sm="2" xs="12">Todo : </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="What to do ?" value={title} onChange={handleTitleChange} required readOnly={processing} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="TodoWhen">
                <Form.Label column sm="2" xs="12">When : </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="date"
                        value={dateFormat(deadline, 'yyyy-mm-dd')}
                        min={String((new Date()).toJSON()).slice(0, 10)}
                        onChange={(e) => handleDeadLineChange(e, 'date')}
                        required
                        readOnly={processing}
                    />
                    <Form.Control type="time" value={dateFormat(deadline, 'HH:MM')} onChange={(e) => handleDeadLineChange(e, 'time')} required readOnly={processing} />
                </Col>
            </Form.Group>
            <Button variant="dark" type="submit" disabled={processing} style={{ margin: '5px' }}>
                {processing && <Spinner animation="border" variant="light" />}
                {initialState ? 'Update' : 'Add'}
            </Button>
            <Button variant="outline-dark" onClick={onCancel} style={{ margin: '5px' }}>Cancel</Button>
        </Form>
    );
}
