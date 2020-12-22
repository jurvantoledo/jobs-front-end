import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { 
    Jumbotron, 
    Container,
    Card,
    Col 
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchUserById } from "../../store/userInfo/actions"
import { selectUserInfo } from "../../store/userInfo/selectors"

import "./userInfo.css"


export default function UserInfo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)
    const [incendiary, setIncendiary] = useState(false)
    const [corrosive, setCorrosive] = useState(false)
    const [shock, setShock] = useState(false)
    const [explosive, setExplosive] = useState(false)
    const [slag, setSlag] = useState(false)

    console.log(incendiary, corrosive, shock, explosive, slag)


    console.log(userInfo)

    useEffect(() => {
        dispatch(fetchUserById(id));
      }, [dispatch, id]);

    return (
    <>
        <Jumbotron className="info-banner-text">
            {userInfo.map(uInfo => {
                return (
                <Container key={uInfo.id} className="userInfo-header">
                    <h2>Welcome to your arsenal {uInfo.name}</h2>
                </Container>
                )
            })}
        </Jumbotron>
        <Container as={Col} md={{ span: 12 }} className="userInfo-body">
            {userInfo.map(uInfo => {
                return (
                    <Container 
                    key={uInfo.id}
                    as={Col} 
                    md={{ span: 12 }} 
                    className="info-weapon-container"
                    >
                        {uInfo.weapons.map(weapon => {
                            return (
                                <Card 
                                key={weapon.id}
                                as={Col} 
                                md={{ span: 6 }} 
                                className="info-image" 
                                style={{ backgroundImage: `url(https://www.wallpaperup.com/uploads/wallpapers/2014/01/22/234882/8507fe0a3d30363c8712c0b93e14db41.jpg)` }}>
                                    <p className="info-weapon-name">{weapon.name}</p>
                        <Form>
                        <Form.Group controlId="formIsOwner">
                            <Form.Check
                                type="checkbox"
                                label="Incendiary"
                                name="Checkboxes"
                                id="Checkbox1"  
                                value={incendiary}
                                onChange={() => setIncendiary(true)}
                            />
                            <Form.Check
                                type="checkbox"
                                label="Corrosive"
                                name="Checkboxes"
                                id="Checkbox2"
                                value={corrosive}
                                onChange={() => setCorrosive(true)}  
                            />
                            <Form.Check
                                type="checkbox"
                                label="Shock"
                                name="Checkboxes"
                                id="Checkbox3"  
                                value={shock}
                                onChange={() => setShock(true)} 
                            />
                            <Form.Check
                                type="checkbox"
                                label="Explosive"
                                name="Checkboxes"
                                id="Checkbox4"
                                value={explosive}
                                onChange={() => setExplosive(true)}   
                            />
                            <Form.Check
                                type="checkbox"
                                label="Slag"
                                name="Checkboxes"
                                id="Checkbox5"
                                value={slag}
                                onChange={() => setSlag(true)}    
                                />
                        </Form.Group>
                        </Form>
                                </Card>
                            )
                        })}
                    </Container>
                )
            })}
        </Container>
    </>
    )
}