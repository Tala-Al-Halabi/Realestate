import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Property } from '../../../app/models/property';

interface Props {
    property: Property | undefined;
    closeForm: () => void;
    create0rEdit: (property :Property) => void;
}
export default function PropertyForm({property: selectedProperty, closeForm, create0rEdit}: Props) {

    const initialState = selectedProperty ??{
        id: '',
        pType: '',
        title: '', 
        about: '',
        whytoInvest: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        pricePersqm: '',
        location: '',
        pDate: '',
        iType: '',
        investnow: '',
        price: '',
    }

    const [property, setProperty] = useState(initialState);
    
    function handleSubmit() {
          create0rEdit(property);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) {
        const {name, value} = event.target;
        setProperty({...property, [name]:value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Property Type' value={property.pType} name='pType' onChange={handleInputChange}/>
                <Form.Input placeholder='Title' value={property.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='About' value={property.about} name='about' onChange={handleInputChange} />
                <Form.TextArea placeholder='Why to Invest' value={property.whytoInvest} name='whytoInvest' onChange={handleInputChange}/>
                <Form.Input placeholder='Size in sqm' value={property.size} name='size' onChange={handleInputChange}/>
                <Form.Input placeholder='Number of bedrooms' value={property.bedrooms} name='bedrooms' onChange={handleInputChange}/>
                <Form.Input placeholder='Number of bathrooms' value={property.bathrooms} name='bathrooms' onChange={handleInputChange}/>
                <Form.Input placeholder='Price per sqm' value={property.pricePersqm} name='pricePersqm' onChange={handleInputChange}/>
                <Form.Input placeholder='Location' value={property.location} name='location' onChange={handleInputChange}/>
                <Form.Input placeholder='Deadline of investment' value={property.pDate} name='pDate' onChange={handleInputChange}/>
                <Form.Input placeholder='Investment type' value={property.iType} name='iType' onChange={handleInputChange}/>
                <Form.Input placeholder='Minimum investment' value={property.investnow} name='investnow' onChange={handleInputChange}/>
                <Form.Input placeholder='Price of property' value={property.price} name='price' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}