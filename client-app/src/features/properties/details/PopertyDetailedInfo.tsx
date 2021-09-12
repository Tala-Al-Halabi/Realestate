import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import { Property } from '../../../app/models/property';

interface Props {
    property: Property
}

export default observer(function PropertyDetailedInfo({property}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <h3>Investment Type</h3>
                        <p>{property.iType}</p>
                        <h3>About</h3>
                        <p>{property.about}</p>
                        <h4>Why to Invest</h4>
                        <p>{property.whytoInvest}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {property.pDate}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <p>{property.location}</p> 
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <p>Size in sqm: {property.size}</p>
                        <p>Bedrooms: {property.bedrooms}</p> 
                        <p>Bathrooms: {property.bathrooms}</p> 
                        <p> Price per sqm: {property.pricePersqm} $</p> 
                        <p>Price: {property.price} $</p> 
                        <p>Minimum investment: {property.investnow}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})