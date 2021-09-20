import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Property } from '../../../app/models/property';
import PropertyListItemInvestor from './PropertyListItemInvestor';
import { observer } from 'mobx-react-lite';

interface Props {
    property: Property
}

    export default observer( function PropertyListItem({ property }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {property.isCancelled &&
                    <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom: 3}} size='tiny' circular src={property.host?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/properties/${property.id}`}>
                                {property.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profiles/${property.hostUsername}`}>{property.host?.displayName}</Link>
                            </Item.Description>
                            {property.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this property
                                    </Label>
                                </Item.Description>
                            )}
                            {property.isInvesting && !property.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are investing this activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(property.pDate!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {property.location}
                </span>
            </Segment>
            <Segment secondary>
                <PropertyListItemInvestor investors={property.investors!} />
            </Segment>
            <Segment clearing>
                <span>{property.about}</span>
                <Button 
                    as={Link}
                    to={`/properties/${property.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
})