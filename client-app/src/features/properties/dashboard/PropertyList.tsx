import React from "react";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Property } from "../../../app/models/property";

interface Props {
    properties: Property[];
    selectProperty: (id: string) => void;
    deleteProperty: (id: string) => void;
    submitting: boolean;
}


export default function PropertyList({properties, selectProperty, deleteProperty, submitting}: Props) {
    const[target, setTarget] = useState('');

    function handlePropertyDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteProperty(id);
    }
    return(
        <Segment>
            <Item.Group divided>
                {properties.map(property => (
                    <Item key={property.id}>
                        <Item.Content>
                            <Item.Header as='a'>{property.title}</Item.Header>
                            <Item.Meta>{property.pDate}</Item.Meta>
                            <Item.Description>
                                <div>{property.about}</div>
                                <div>{property.location}, {property.price}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectProperty(property.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={property.id}
                                    loading={submitting && target === property.id} 
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
}