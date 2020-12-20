import React, { useEffect } from "react"
import { Jumbotron } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserById } from "../../store/user/actions"
import { selectUser } from "../../store/user/selectors"
 
export default function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    console.log("THIS IS User",  user)
    console.log(user.id)

    useEffect(() => {
        dispatch(fetchUserById);
        
      }, [dispatch]);

    
    return (
        <Jumbotron>
            <h1>Welcome back {user.name}</h1>
        </Jumbotron>
    )
}