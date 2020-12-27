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
    const [ count, setCount ] = useState(0)
    
    const displayButton = user.id === weapon.userId

    useEffect(() => {
        dispatch(fetchWeaponById(id));

      }, [dispatch, id]);

      const onDelete = id => {
        console.log("deleting element!", id);
        dispatch(deleteElement(id));
      };

      const handleIncrement = () => {
        setCount(prevCount => prevCount + 1)
      }

      const handleDecrement = () => {
        setCount(prevCount => prevCount - 1)
      }

      if(count === -1) {
        setCount(0)      
      }

    return (
    <>
           <Jumbotron
            className="weapon-info"
            style={{ 
             background: `transparent`,
            backgroundImage: "url(https://www.wallpaperup.com/uploads/wallpapers/2014/01/22/234882/8507fe0a3d30363c8712c0b93e14db41.jpg)"}}
            >
                <span
                  style={{
                    background: `-webkit-gradient(linear, linear, right top, left top, from(rgba(43, 8, 8, 0)), to(${weapon.rarity}))`,
                    background: `linear-gradient(to left, rgba(43, 8, 8, 0), ${weapon.rarity})`,
                  }}
                ></span>
                <span
                  style={{
                    background: `-webkit-gradient(linear, left bottom, left top, from(rgba(43, 8, 8, 0)), to(${weapon.rarity}))`,
                    background: `linear-gradient(to top, rgba(43, 8, 8, 0), ${weapon.rarity})`,
                  }}
                ></span>
                <span
                   style={{
                    background: `-webkit-gradient(linear, linear, left top, right top, from(rgba(43, 8, 8, 0)), to(${weapon.rarity}))`,
                    background: `linear-gradient(to right, rgba(43, 8, 8, 0), ${weapon.rarity})`,
                  }}
                ></span>
                <span
                   style={{
                    background: `-webkit-gradient(linear, linear, left top, left bottom, from(rgba(43, 8, 8, 0)), to(${weapon.rarity}))`,
                    background: `linear-gradient(to bottom, rgba(43, 8, 8, 0), ${weapon.rarity})`,
                  }}
                ></span>
            <h1
            className="weapon-info-title"
             key={weapon.id}
            >
                {weapon.name}
            </h1>
          <div className="count-bar">
            <h2>Tries {count}</h2>
            <Button 
              className="increment-btn" 
              onClick={handleIncrement}>
              +
            </Button>
            <Button 
              className="decrement-btn" 
              onClick={handleDecrement}>
              -
            </Button>
            <div className="count-reset-col">
              <Button 
                className="count-reset-btn" 
                onClick={() => setCount(0)}>
                Reset
              </Button>
            </div>
           </div>
        <Container className="element-container">
            {weapon.elements?.map(e => {
                return (
                <Card 
                key={e.id}
                as={Col} 
                md={{ span: 3 }}
                className="element-card"
                style={e.name === "Incendiary" ? {background: "url(https://cdn.discordapp.com/attachments/662042818856091658/792387056210149376/Fire.png)"} :
                e.name === "Corrosive" ? {background: "url(https://cdn.discordapp.com/attachments/662042818856091658/792387806706008074/Corrosive.png)"} : 
                e.name === "Shock" ? {background: "url(https://cdn.discordapp.com/attachments/662042818856091658/792388395325194240/Shock.png)"} : 
                e.name === "Explosive" ? {background: "url(https://cdn.discordapp.com/attachments/662042818856091658/792388214501015593/Explosive.png)"} : 
                e.name === "Slag" ? {background: "url(https://cdn.discordapp.com/attachments/662042818856091658/792387449187205121/Slag_1.png"} : null}
                >
                    { displayButton ? 
                    <Button
                    className="element-remove-button" 
                    data-text="Remove"
                    onClick={() => dispatch(deleteElement(e.id))}
                    >
                        <div>Remove</div>
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