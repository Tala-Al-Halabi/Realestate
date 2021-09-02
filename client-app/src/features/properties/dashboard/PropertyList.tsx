import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import {Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import PropertyListItem from "./PropertyListItem";

export default observer (function PropertyList() {
    const {propertyStore} = useStore();
    const{groupedProperties} = propertyStore;

    return(
        <>
            {groupedProperties.map(([group, properties]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                        </Header>
                        {properties.map(property => (
                        <PropertyListItem key={property.id} property={property} />
                        
                        ))}
                </Fragment>
            ))}
        </>
    )
})