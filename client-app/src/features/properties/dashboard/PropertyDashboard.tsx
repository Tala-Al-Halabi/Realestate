import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PropertyDetails from "../details/PropertyDetails";
import PropertyForm from "../form/PropertyForm";
import PropertyList from "./PropertyList";

export default observer(function PropertyDashboard() {
    const {propertyStore} = useStore();
    const{selectedProperty, editMode} = propertyStore;
    return(

        <Grid>
            <Grid.Column width='10'>
                <PropertyList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProperty && !editMode &&
                <PropertyDetails />}
                {editMode &&
                <PropertyForm/>}
            </Grid.Column>
        </Grid>
    )
})