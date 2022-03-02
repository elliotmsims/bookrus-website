import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Authors() {
    return(
        <div class="Authors">
            <Container>
                <h2>Authors!</h2>
            </Container>
            <Outlet />
        </div>
    )
}

export function Author() {
    
}