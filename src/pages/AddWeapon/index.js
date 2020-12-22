import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { 
    Col, 
    Form, 
    Button,
    Container 
} from "react-bootstrap";
import { addWeapon } from "../../store/user/actions";
import { selectUserInfo } from "../../store/userInfo/selectors";
import "./index.scss"


export default function AddWeapon() {
    const dispatch = useDispatch();
    const [weaponName, setWeaponName] = useState("");
    const [weaponType, setWeaponType] = useState({
        selectType: [
         {label: "Pistols", value: "Pistols"},
         {label: "Submachine Guns", value: "Submachine Guns"},
         {label: "Shotguns", value: "Shotguns"},
         {label: "Assault Rifles", value: "Assault Rifles"},
         {label: "Sniper Rifles", value: "Sniper Rifles"},
         {label: "Rocket Launchers", value: "Rocket Launchers"},
        ]
      });
    const [weaponRarity, setWeaponRarity] = useState({
        selectColor: [
         {label: "#ffffff", value: "#ffffff"},
         {label: "#27d827", value: "#27d827"},
         {label: "#1919ff", value: "#1919ff"},
         {label: "#800080", value: "#800080"},
         {label: "#FFA500", value: "#FFA500"},
         {label: "#FF1493", value: "#FF1493"},
         {label: "#00FFFF", value: "#00FFFF"},
        ]
      });
    const userInfo = useSelector(selectUserInfo)

    
    function submitForm(event) {
      event.preventDefault();
  
      dispatch(addWeapon(weaponName, weaponType, weaponRarity));
  
      setWeaponName("");
      setWeaponType({
        selectType: [
         {label: "pistols", value: "pistols"},
         {label: "submachine Guns", value: "submachine Guns"},
         {label: "shotguns", value: "shotguns"},
         {label: "assault Rifles", value: "assault Rifles"},
         {label: "sniper Rifles", value: "sniper Rifles"},
         {label: "rocket Launchers", value: "rocket Launchers"},
        ]
      });
      setWeaponRarity({
        selectColor: [
         {label: "#ffffff", value: "#ffffff"},
         {label: "#27d827", value: "#27d827"},
         {label: "#1919ff", value: "#1919ff"},
         {label: "#800080", value: "#800080"},
         {label: "#FFA500", value: "#FFA500"},
         {label: "#FF1493", value: "#FF1493"},
         {label: "#00FFFF", value: "#00FFFF"},
        ]
      });
    }
  
    return (
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Add Weapon</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={weaponName}
              onChange={event => setWeaponName(event.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
          <Form.Label>Type</Form.Label>
          <Form.Control as="select"
              value={weaponType}
              onChange={event => setWeaponType(event.target.value)}
              type="text"
              placeholder="Enter type"
              required
            >
            <option value={null}>Select a weapon type</option>
            <option value="pistols">Pistols</option>
            <option value="submachine guns">Submachine guns</option>
            <option value="shotguns">Shotguns</option>
            <option value="assault rifles">Assault rifles</option>
            <option value="sniper rifles">Sniper rifles</option>
            <option value="rocket launchers">Rocket launchers</option>
            </Form.Control>
        </Form.Group>
  
          <Form.Group >
          <Form.Label>Weapon rarity</Form.Label>
          <Form.Control as="select"
              value={weaponRarity}
              onChange={event => setWeaponRarity(event.target.value)}
              type="text"
              placeholder="Enter rarity"
              required
            >
            <option value={null}>Select a weapon rarity</option>
            <option value="#ffffff" id="rarity-dropdown">White</option>
            <option value="#27d827" id="rarity-dropdown">Green</option>
            <option value="#1919ff" id="rarity-dropdown">Blue</option>
            <option value="#800080" id="rarity-dropdown">Purple</option>
            <option value="#FFA500" id="rarity-dropdown">Orange</option>
            <option value="#FF1493" id="rarity-dropdown">Pink</option>
            <option value="#00FFFF" id="rarity-dropdown">Cyan</option>  
            </Form.Control>
        </Form.Group>
        <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
            Add Weapon
          </Button>
        </Form.Group>
        <Link to={`/userInfo/${userInfo.map(uInfo => uInfo.id)}`}>
            <strong>Click here to go back to your armory</strong>
        </Link>
        </Form>
      </Container>
    );
  }