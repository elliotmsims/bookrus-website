import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return(
        <>
        <Container>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
            >
                <h1>Welcome to the Home Page.</h1>
            </div>
            
        </Container>
        </>
    )
}