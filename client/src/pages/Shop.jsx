import React, {useContext, useEffect} from 'react';
import {Col, Container, Pagination, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import Brandbar from "../components/Brandbar";
import DeviceItem from "../components/DeviceItem";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";


const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(()=>{
        fetchTypes().then(res=>device.setTypes(res.rows))
        fetchBrands().then(res=>device.setBrands(res.rows))
        fetchDevices(null,null,1,6).then(res=>{
            device.setDevices(res.rows)
            device.setTotalCount(res.count)
            })
    },[])

    useEffect(()=>{
        fetchDevices(device.selectedType.id,device.selectedBrand.id,device.page,device.limit).then(res=>{
            device.setDevices(res.rows)
            device.setTotalCount(res.count)
        })
    },[device.selectedType,device.selectedBrand,device.page,device.limit])
    return (
        <Container>
            <Row>
                <Col md={3} className="mt-2">
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <Brandbar/>
                    <DeviceList/>
                    <Pages/>

                </Col>
            </Row>
        </Container>
    )
});

export default Shop;