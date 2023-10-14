import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import  star from "../assets/star.png"
import {DEVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className="mt-3" onClick={() => {navigate(DEVICE_ROUTE +"/"+ device.id)}}>
            <Card style={{width: 150, cursor: 'pointer'}} border="light">
                <Image width={150} height={150} src={"http://localhost:5000/"+device.img} />
                <div className=" text-black-50 d-flex justify-content-between align-items-center mt-1">
                    <div>{device.brand}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={20} height={20}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;