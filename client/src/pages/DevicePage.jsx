import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import Bstar from "../assets/Bstar.png";
import star from "../assets/star.png";
import {fetchOneDevice} from "../http/deviceAPI";
import {useParams} from 'react-router-dom';

const DevicePage = () => {
    const [device,setDevice] = useState({info:[]})
    const {id} = useParams()
    useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    },[])
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={"http://localhost:5000/"+device.img}/>
                </Col>
                <Col md={4}>
                    <Row>
                        <div className=" text-black-50 d-flex justify-content-between align-items-center mt-1"
                             style={{width: 150}}>
                            <div>{device.name}</div>
                            <div className="d-flex align-items-center">
                                <div>{device.rating}</div>
                                <Image src={star} width={20} height={20}/>
                            </div>
                        </div>
                        <div>Brand</div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: "5px solid lightgrey"}}
                    >
                        <h3>
                            by {device.price} Backs ....
                        </h3>
                        <Button variant="outline-dark">Add to Basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column mt-3">
                <h1 style={{padding:10,}}>Description</h1>
                {device.info.map((info,index) =>
                    <Row key={info.id} style={{background:index % 2 === 0 ? 'lightgray' : 'transparent',padding:10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;