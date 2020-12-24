import React, { useEffect, useState } from "react"
import { 
    Card, 
    Jumbotron,
    Container,
    Col, 
    Button 
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteElement, fetchWeaponById } from "../../store/weapons/actions";
import { selectWeapons } from "../../store/weapons/selectors";
import ElementForm from "../../components/ElementForm/index"
import { selectUserInfo } from "../../store/userInfo/selectors";
import { selectUser } from "../../store/user/selectors";
import "./weaponInfo.scss"


export default function WeaponInfo() {
    const { id } = useParams()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const weapon = useSelector(selectWeapons)
    const [editForm, setEditForm] = useState(false);
    
    const displayButton = user.id === weapon.userId

    useEffect(() => {
        dispatch(fetchWeaponById(id));

      }, [dispatch, id]);

      const onDelete = id => {
        console.log("deleting element!", id);
        dispatch(deleteElement(id));
      };

    return (
    <>
     <Jumbotron
         style={{ backgroundImage: `url(https://www.wallpaperup.com/uploads/wallpapers/2014/01/22/234882/8507fe0a3d30363c8712c0b93e14db41.jpg)`}}>
            <h1
             style={{borderBottom: `2px solid ${weapon.rarity}`}}
             key={weapon.id}
            >
                {weapon.name}
            </h1>
        <Container className="element-container">
            {weapon.elements?.map(e => {
                return (
                <Card 
                key={e.id}
                as={Col} 
                md={{ span: 3 }}
                className="element-card"
                >
                    <p className="element-name">{e.name}</p>
                    { displayButton ? 
                    <Button
                    className="remove-button" 
                    data-text="Remove"
                    onClick={() => dispatch(deleteElement(e.id))}
                    >
                        <span>Remove</span>
                    </Button> : null}
                </Card>
                )
            })}
        </Container>
        <div className="add-element-form-container">
          {displayButton ? 
          <Button
            className="animated-button2"
            onClick={(e) => (editForm ? setEditForm(false) : setEditForm(true))}
        >
            <span></span>
            Select a new Element
        </Button> : null}
        {editForm ? (<ElementForm />) : null}
        </div>
     </Jumbotron>
    </>
    )
}