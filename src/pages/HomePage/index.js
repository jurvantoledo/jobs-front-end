import React, { useEffect } from "react"
import axios from "axios"
import { apiUrl } from "../../config/constants";
import { 
    Jumbotron, 
    Container, 
    Card, 
    Button,
 } from "react-bootstrap"
 import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { usersFetched } from "../../store/allUsers/actions"
import { selectAllUsers } from "../../store/allUsers/selectors"
import { selectUser } from "../../store/user/selectors"
 
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
        <Jumbotron>
            <h1>Welcome back {user.name}</h1>
        </Jumbotron>
        <Container>
                {allUsers.map(u => {
                    return (
                        <Card key={u.id}>
                            <h2>{u.name}</h2>
                        <Link to={`/userInfo/${u.id}`} >
                            <Button>See weapons</Button>
                            </Link>
                        </Card>
                    )
                })}
        </Container>
    </>
    )
}