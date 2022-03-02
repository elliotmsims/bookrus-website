import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Countries() {
    return(
        <div class="Countries">
            <Container>
                <h1>Countries!</h1>
            </Container>
            <Outlet />
        </div>
    )
}

export function Country() {
    
}