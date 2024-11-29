import React from 'react';
import {Controls, Diagrams, Container} from "./index";

export const App: React.FC = () => {
    return (
        <Container>
            <Controls/>
            <Diagrams/>
        </Container>
    );
}