import React, { useState } from "react"
import { 
    Container, 
    Form,
    Button
 } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addElement } from "../../store/weapons/actions"

export default function ElementForm() {
    const dispatch = useDispatch()
    const [elementName, setElementName] = useState({
        selectType: [
         {label: "Incendiary", value: "Incendiary"},
         {label: "Corrosive", value: "Corrosive"},
         {label: "Shock", value: "Shock"},
         {label: "Explosive", value: "Explosive"},
         {label: "Slag", value: "Slag"},
        ]
      })

    function submitForm(event) {
        event.preventDefault()

        dispatch(addElement(elementName))

        setElementName({
            selectType: [
             {label: "Incendiary", value: "Incendiary"},
             {label: "Corrosive", value: "Corrosive"},
             {label: "Shock", value: "Shock"},
             {label: "Explosive", value: "Explosive"},
             {label: "Slag", value: "Slag"},
            ]
          })
    }

    return(
        <Container>
          <Form>
            <Form.Group controlId="formBasicElement">
                <Form.Label>Element</Form.Label>
                <Form.Control as="select"
                 value={elementName}
                 onChange={event => setElementName(event.target.value)}
                 type="text"
                 required
                >
                 <option value={null}>Select an Element</option>
                 <option value="Incendiary">Incendiary</option>
                 <option value="Corrosive">Corrosive</option>
                 <option value="Shock">Shock</option>
                 <option value="Explosive">Explosive</option>
                 <option value="Slag">Slag</option>
                </Form.Control>
               </Form.Group>
            <Form.Group className="add-element-button">
             <Button 
             variant="primary" 
             type="submit" 
             onClick={submitForm}
             className="animated-button2"
             >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Add Element
             </Button>
            </Form.Group>
        </Form>
        </Container>
    )
}