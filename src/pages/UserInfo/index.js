import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { 
    Jumbotron, 
    Container,
    Card,
    Col, 
    Button
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteWeapon, fetchUserById } from "../../store/userInfo/actions"
import { fetchWeaponById } from "../../store/weapons/actions"
import { selectUserInfo } from "../../store/userInfo/selectors"

import "./userInfo.scss"
import { selectWeapons } from "../../store/weapons/selectors"
import { selectUser } from "../../store/user/selectors"

export default function UserInfo() {
    const { id } = useParams()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUserInfo)
    const weapon = useSelector(selectWeapons)

    const displayButton = user.id === weapon.userId



    useEffect(() => {
        dispatch(fetchUserById(id));
        dispatch(fetchWeaponById(id));

      }, [dispatch, id]);

      const onDelete = id => {
        console.log("deleting element!", id);
        dispatch(deleteWeapon(id));
      };

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
        {displayButton ? <Link className="animated-button2" to={`/add-weapon/${id}`}>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           Add A Weapon
        </Link> : null}
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
                                         border: `2px solid ${weapon.rarity}`}}
                            >
                            { displayButton ? 
                            <Button
                            className="remove-button" 
                            data-text="Remove"
                                  onClick={() => dispatch(deleteWeapon(weapon.id))}
                            >
                                       <span>Remove</span>
                            </Button> : null}
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