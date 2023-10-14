import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandVisible,setBrandVisible] = useState(false)
    const [typeVisible,setTypeVisible] = useState(false)
    const [deviceVisible,setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column  mt-3 justify-content-center" >
            <Button  onClick={()=>setTypeVisible(true)}
                className="mt-4 p-2" variant="outline-dark"
            >
                Add type</Button>
            <Button onClick={()=> setBrandVisible(true)}
                className="mt-4 p-2" variant="outline-dark"
            >
                Add Brand</Button>
            <Button  onClick={()=> setDeviceVisible(true)}
                className="mt-4 p-2" variant="outline-dark"
            >
                Add Device</Button>
            <CreateType show={typeVisible} onHide={()=>setTypeVisible(false)} />
           <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={()=>setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;