import { observer } from "mobx-react-lite";
import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer (function PropertyList() {
    const {propertyStore} = useStore();
    const{deleteProperty, propertiesByDate, loading} = propertyStore;

    const[target, setTarget] = useState('');

    function handlePropertyDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteProperty(id);
    }


    return(
        <Segment>
            <Item.Group divided>
                {propertiesByDate.map(property => (
                    <Item key={property.id}>
                        <Item.Content>
                            <Item.Header as='a'>{property.title}</Item.Header>
                            <Item.Meta>{property.pDate}</Item.Meta>
                            <Item.Description>
                                <div>{property.about}</div>
                                <div>{property.location}, {property.price}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/properties/${property.id}`} floated='right' content='View' color='blue' />
                                <Button 
                                    name={property.id}
                                    loading={loading && target === property.id} 
                                    onClick={(e) => handlePropertyDelete(e, property.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' />
                                <Label basic content={property.iType}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                
                ))}

            </Item.Group>
        </Segment>


    )
})