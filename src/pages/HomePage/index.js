import React, { useEffect, useState } from "react"
import axios from "axios"
import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import { 
    Jumbotron, 
    Container, 
    Card, 
    Button,
    Col
 } from "react-bootstrap"
 import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { usersFetched } from "../../store/allUsers/actions"
import { selectUser } from "../../store/user/selectors"
import {
  startLoading,
} from "../../store/feed/actions";

import "./index.scss"
import { selectFeedUsers } from "../../store/feed/selectors";
import { Form } from "react-bootstrap";
 
export default function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const feedUsers = useSelector(selectFeedUsers)
    const [ search, setSearch ] = useState("")
    const token = useSelector(selectUser)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchNext5Users);

        if (token === null) {
          history.push(`/login`);
        }

      }, [dispatch]);

      async function fetchNext5Users() {
        dispatch(startLoading);
        const userCount = feedUsers.length;
        const response = await axios.get(
          `${apiUrl}user?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${userCount}`
        );
    
        const moreUsers = response.data.users;
    
        dispatch(usersFetched(moreUsers));
      }

      const filteredUsers = feedUsers.filter(user => {
        return user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
    
    return (
    <>
        <Jumbotron className="hp-banner-text">
            <h1 className="title">Welcome back {user.name}</h1>
        </Jumbotron>
        <Form as={Col} md={{ span: 6 }} className="search-bar">
                <Form.Control
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  type="text"
                  placeholder="Search for a user"
                />
            </Form>
        <Container as={Col} md={{ span: 12 }}>
                {filteredUsers.map(u => {
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
                        <Link to={`/user-info/${u.id}`} className="animated-button1">
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
        <Button className="load-more" onClick={fetchNext5Users}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Load more</Button>
    </>
    )
}