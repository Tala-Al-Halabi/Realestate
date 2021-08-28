import React from "react";
import { Grid } from "semantic-ui-react";
import { Property } from "../../../app/models/property";
import PropertyDetails from "../details/PropertyDetails";
import PropertyForm from "../form/PropertyForm";
import PropertyList from "./PropertyList";

interface Props {
    properties: Property[];
    selectedProperty: Property | undefined;
    selectProperty: (id: string) => void;
    cancelSelectProperty: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    create0rEdit: (property: Property) => void;
    deleteProperty: (id: string) => void;
    submitting: boolean;
}

export default function PropertyDashboard({properties, selectedProperty, selectProperty, cancelSelectProperty, editMode, openForm, closeForm, create0rEdit, deleteProperty, submitting}: Props) {
    return(

        <Grid>
            <Grid.Column width='10'>
                <PropertyList properties={properties} 
                selectProperty={selectProperty} 
                deleteProperty={deleteProperty}
                submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProperty && !editMode &&
                <PropertyDetails 
                property={selectedProperty} 
                cancelSelectProperty={cancelSelectProperty}
                openForm={openForm} />}
                {editMode&&
                <PropertyForm 
                    closeForm={closeForm} 
                        property={selectedProperty} 
                        create0rEdit={create0rEdit}
                        submitting={submitting}
                        />}
            </Grid.Column>
        </Grid>
    )
}