import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { 
    Jumbotron, 
    Container,
    Card,
    Col, 
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchUserById } from "../../store/userInfo/actions"
import { fetchWeaponById } from "../../store/weapons/actions"
import { selectUserInfo } from "../../store/userInfo/selectors"

import "./userInfo.scss"
import { selectWeapons } from "../../store/weapons/selectors"

export default function UserInfo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)


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
        <Link className="animated-button2" to={`/add-weapon/${id}`}>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           Add A Weapon
        </Link>
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
                                md={{ span: 4 }} 
                                className="info-image" 
                                style={{ backgroundImage: `url(https://www.wallpaperup.com/uploads/wallpapers/2014/01/22/234882/8507fe0a3d30363c8712c0b93e14db41.jpg)`, 
                                         border: `2px solid ${weapon.rarity}`}}>
                                    <h2 className="info-weapon-name-header">{weapon.name}</h2>
                                    <p className="info-weapon-name">{weapon.type}</p>
                                <Link to={`/weapon-info/${weapon.id}`} className="animated-button1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Weapon Details
                                </Link>
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