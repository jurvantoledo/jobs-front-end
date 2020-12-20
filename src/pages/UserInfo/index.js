import React, { useEffect } from "react"
import { 
    Jumbotron, 
    Container,
    Card 
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

    console.log(userInfo)

    useEffect(() => {
        dispatch(fetchUserById(id));
      }, [dispatch, id]);

    return (
    <>
        <Jumbotron>
            {userInfo.map(uInfo => {
                return (
                <Container key={uInfo.id} className="userInfo-header">
                    <h2>Welcome to your arsenal {uInfo.name}</h2>
                </Container>
                )
            })}
        </Jumbotron>
        <Container className="userInfo-body">
            {userInfo.map(uInfo => {
                return (
                    <Card key={uInfo.id}>
                        {uInfo.weapons.map(weapon => {
                            return (
                                <Card
                                key={weapon.id} 
                                className="info-image" 
                                style={{ backgroundImage: `url(${weapon.image})` }}>
                                    <p className="info-weapon-name">{weapon.name}</p>
                                </Card>
                            )
                        })}
                    </Card>
                )
            })}
        </Container>
    </>
    )
}