import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import {toFormData} from "axios";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [file,setFile] = useState(null)
    const [type,setType] = useState(null)
    const [brand,setBrand] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(()=>{
        fetchTypes().then(res=>device.setTypes(res.rows))
        fetchBrands().then(res=>device.setBrands(res.rows))
    },[])

    const selectFile = e =>{
        setFile(e.target.files[0])
    }
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key,value,number) => {
        setInfo(info.map(i =>i.number=== number ? {...i,[key]:value} :i))
        console.log(info)
    }

    const addDevice = () => {
        try{
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', file,file.name)
            formData.append('brandId', `${device.selectedBrand.id}`)
            formData.append('typeId', `${device.selectedType.id}`)
            formData.append('info', JSON.stringify(info))
            createDevice(formData).then(data => onHide())
        }catch (e) {
            console.log(e)
        }
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2 ">
                        <Dropdown.Toggle>
                            {device.selectedType.name || "Choose type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={()=> device.setSelectedType(type)}
                                    key={type.id}>{type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2 ">
                        <Dropdown.Toggle>
                            {device.selectedBrand.name|| "Choose Brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={()=> device.setSelectedBrand(brand)}
                                    key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder="write name of device"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="write price of device"
                        type="number"
                        onChange={e => setPrice(Number(e.target.value))}
                        value={price}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}

                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Add new description
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    placeholder="write name"
                                    onChange={(e)=> changeInfo('title',e.target.value,i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    placeholder="write description"
                                    onChange={(e)=> changeInfo('description',e.target.value,i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={()=>removeInfo(i.number)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateDevice;