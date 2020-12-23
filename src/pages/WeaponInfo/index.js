import React, { useEffect, useState } from "react"
import { Card, Jumbotron, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWeaponById } from "../../store/weapons/actions";
import { selectWeapons } from "../../store/weapons/selectors";


export default function WeaponInfo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const weapon = useSelector(selectWeapons)
    
    console.log(weapon)

    useEffect(() => {
        dispatch(fetchWeaponById(id));

      }, [dispatch, id]);

    return (
    <>
        <Jumbotron
         style={{ backgroundImage: `url(https://www.wallpaperup.com/uploads/wallpapers/2014/01/22/234882/8507fe0a3d30363c8712c0b93e14db41.jpg)`}}>
            <h1
             style={{borderBottom: `2px solid ${weapon.rarity}`}}
            >
                {weapon.name}
            </h1>
        </Jumbotron>
        <Card>
            {weapon.elements?.map(e => {
                return (
                    <Button>{e.name}</Button>
                )
            })}
        </Card>
    </>
    )
}