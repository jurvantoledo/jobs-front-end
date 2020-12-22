import React, { useEffect, useState } from "react"
import axios from "axios"
import { apiUrl } from "../../config/constants";
import { 
    Jumbotron, 
    Container, 
    Card, 
    Button,
    Col
 } from "react-bootstrap"
 import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { usersFetched } from "../../store/allUsers/actions"
import { selectAllUsers } from "../../store/allUsers/selectors"
import { selectUser } from "../../store/user/selectors"

import "./index.scss"
 
export default function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const allUsers = useSelector(selectAllUsers)

    useEffect(() => {
        dispatch(fetchAllUsers);

      }, [dispatch]);

      async function fetchAllUsers() {
          try {
            const response = await axios.get(`${apiUrl}/user`);
      
            dispatch(usersFetched(response.data.users));
          } catch (error) {
            if (error.response) {
              console.log(error.response.message);
            } else {
              console.log(error);
            }
          }
        };
    
    return (
    <>
        <Jumbotron className="hp-banner-text">
            <h1 className="title">Welcome back {user.name}</h1>
        </Jumbotron>
        <Container as={Col} md={{ span: 12 }}>
                {allUsers.map(u => {
                    return (
                        <Card 
                        className="animated-button1"
                        key={u.id}
                        as={Col} 
                        md={{ span: 3 }}
                        style={{ backgroundImage: `url(https://www.desktopbackground.org/p/2012/01/27/334799_download-borderlands-2-logo-wallpapers-widescreen_1600x1200_h.jpg)` }}
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        <h2 className="username-homepage">{u.name}</h2>
                        <Link to={`/userInfo/${u.id}`} className="animated-button1">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                              See weapons
                            </Link>
                        </Card>
                    )
                })}
        </Container>
    </>
    )
}