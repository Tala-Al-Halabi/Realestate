import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PropertyFilters from "./PropertyFilters";
import PropertyList from "./PropertyList";

export default observer(function PropertyDashboard() {
    const {propertyStore} = useStore();
    const {loadProperties, propertyRegistry} = propertyStore;

    useEffect(() => {
        if (propertyRegistry.size <=1)  loadProperties();
    }, [propertyRegistry.size, loadProperties])

    if(propertyStore.loadingInitial) return <LoadingComponent content='Loading properties...' />


    return(

        <Grid>
            <Grid.Column width='10'>
                <PropertyList />
            </Grid.Column>
            <Grid.Column width='6'>
              <PropertyFilters />
            </Grid.Column>
        </Grid>
    )
})