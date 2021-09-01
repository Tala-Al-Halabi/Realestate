import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer( function PropertyForm() {

    const history = useHistory();
    const {propertyStore} = useStore();
    const {createProperty, updateProperty, loading, loadProperty, loadingInitial} = propertyStore;
    const {id} = useParams<{id: string}>();
    
    const [property, setProperty] = useState({
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
        price: ''
    });

    useEffect(() => {
        if(id) loadProperty(id).then(property => setProperty(property!))
    }, [id, loadProperty]);

    
    function handleSubmit() {
        if (property.id.length === 0) {
            let newProperty = {
                ...property,
                id: uuid()
            };
            createProperty(newProperty).then(() => history.push(`/properties/${newProperty.id}`))
        } else {
            updateProperty(property).then(() => history.push(`/properties/${property.id}`)) }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>) {
        const {name, value} = event.target;
        setProperty({...property, [name]:value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading property...'/>
    
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
                <Form.Input type='date' placeholder='Deadline of investment' value={property.pDate} name='pDate' onChange={handleInputChange}/>
                <Form.Input placeholder='Investment type' value={property.iType} name='iType' onChange={handleInputChange}/>
                <Form.Input placeholder='Minimum investment' value={property.investnow} name='investnow' onChange={handleInputChange}/>
                <Form.Input placeholder='Price of property' value={property.price} name='price' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button  as={Link} to='/properties' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})