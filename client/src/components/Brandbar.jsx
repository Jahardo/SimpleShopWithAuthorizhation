import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Container, ListGroup, Row} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="">
            <Container className="d-flex">
            {device.brands.map((brand) =>
                <Card
                    className="p-2 mt-2 m-1 "
                    style={{cursor:'pointer',width:100}}
                    border={brand.id===device.selectedBrand.id ? 'danger' : 'gray'}
                    onClick={()=> device.setSelectedBrand(brand)}
                    key={brand.id}>
                    {brand.name}
                </Card>
            )}
            </Container>
        </Row>)
});

export default TypeBar;