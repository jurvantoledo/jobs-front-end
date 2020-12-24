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
                style={e.name === "Incendiary" ? {background: "url(https://media.krem.com/assets/KREM/images/467115771/467115771_750x422.jpg)"} 
                : e.name === "Corrosive" ? {background: "url(https://ak.picdn.net/shutterstock/videos/3059452/thumb/1.jpg)"} : 
                e.name === "Shock" ? {background: "url(https://d.newsweek.com/en/full/1517575/lightning.jpg)"} : 
                e.name === "Explosive" ? {background: "url(https://catholicstrengthblog.files.wordpress.com/2016/01/explosion-562853_1280-1.jpg)"} : 
                e.name === "Slag" ? {background: "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8766adfb-3123-4e30-8cbc-91a3f73ee225/d83vtcc-dbbdd675-2f79-487d-bb6c-1b72b06df533.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODc2NmFkZmItMzEyMy00ZTMwLThjYmMtOTFhM2Y3M2VlMjI1XC9kODN2dGNjLWRiYmRkNjc1LTJmNzktNDg3ZC1iYjZjLTFiNzJiMDZkZjUzMy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lcJIUvvlE5kX-SB39Qo-wUP8aykqEp5B9QAoEEjncBI"} : null}
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