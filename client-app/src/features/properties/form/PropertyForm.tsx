import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { investmentOptions } from '../../../app/common/options/investmentOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import {PropertyFormValues } from '../../../app/models/property';

export default observer( function PropertyForm() {

    const history = useHistory();
    const {propertyStore} = useStore();
    const {createProperty, updateProperty, loadProperty, loadingInitial} = propertyStore;
    const {id} = useParams<{id: string}>();
    
    const [property, setProperty] = useState<PropertyFormValues>(new PropertyFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The property title is required'),
        about: Yup.string().required('The property description is required'),
        whytoInvest: Yup.string().required('Why to invest this property is required'),
        size: Yup.string().required('The property size is required'),
        bathrooms: Yup.string().required('The property bathrooms is required'),
        bedrooms: Yup.string().required('The property bedrooms is required'),
        pType: Yup.string().required('The property type is required'),
        pDate: Yup.string().required('The property deadline of investment is required').nullable(),
        location: Yup.string().required('The property location is required'),
        price: Yup.string().required('The property price is required'),
        investnow: Yup.string().required('The minimum investment price is required'),
        iType: Yup.string().required('The investment type is required'),
        pricePersqm: Yup.string().required('The property price per sqm is required'),
    })

    useEffect(() => {
        if(id) loadProperty(id).then(property => setProperty(new PropertyFormValues(property)))
    }, [id, loadProperty]);

    
    function handleFormSubmit(property: PropertyFormValues) {
        if (!property.id) {
            let newProperty = {
                ...property,
                id: uuid()
            };
            createProperty(newProperty).then(() => history.push(`/properties/${newProperty.id}`))
        } else {
            updateProperty(property).then(() => history.push(`/properties/${property.id}`)) }
    }


    if (loadingInitial) return <LoadingComponent content='Loading property...'/>
    
    return (
        <Segment clearing>
            <Header content='Property Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={property} 
            onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput placeholder='Title' name='title' />
                        <MyTextInput placeholder='Property Type' name='pType' />
                        <MyTextArea rows={3} placeholder='About' name='about'  />
                        <MyTextArea rows={3} placeholder='Why to Invest' name='whytoInvest' />
                        <MyTextInput placeholder='Size in sqm' name='size' />
                        <MyTextInput placeholder='Number of bedrooms' name='bedrooms' />
                        <MyTextInput placeholder='Number of bathrooms' name='bathrooms' />
                        <MyTextInput placeholder='Price per sqm' name='pricePersqm' />
                        <MyTextInput placeholder='Location' name='location' />
                        <MyDateInput 
                            placeholderText='Deadline of investment' 
                            name='pDate'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MySelectInput options={investmentOptions} placeholder='Investment type' name='iType' />
                        <MyTextInput placeholder='Minimum investment' name='investnow' />
                        <MyTextInput placeholder='Price of property' name='price' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated='right' 
                        positive type='submit' content='Submit' />
                        <Button  as={Link} to='/properties' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})