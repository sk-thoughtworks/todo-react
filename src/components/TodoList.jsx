import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useGetTodo } from '../services/indexdb';
import TodoCard from './TodoCard';

export default function TodoList() {
    const todos = useGetTodo();
    return (
        <Container>
            <Row xs={1} sm={3} md={4}>
                {todos.map((todo) => (
                    <Col key={todo.id}>
                        <TodoCard todo={todo} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
