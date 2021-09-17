import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import { Property } from '../../../app/models/property';
import { useStore } from '../../../app/stores/store';


const propertyImageStyle = {
    filter: 'brightness(30%)'
};

const propertyImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    property: Property
}

export default observer (function PropertyDetailedHeader({property}: Props) {
    const {propertyStore: {updateInvestment, loading, cancelPropertyToggle}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {property.isCancelled &&
                    <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} 
                        ribbon color='red' content='Camcelled'></Label>
                }
                <Image src={`/assets/categoryImages/${property.location}.jpg`} fluid style={propertyImageStyle}/>
                <Segment style={propertyImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={property.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(property.pDate!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profile/${property.host?.displayName}`}>{property.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {property.isHost ? (
                    <>
                        <Button
                            color={property.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={property.isCancelled ? 'Re-activate Property' : 'Cancel Property'}
                            onClick={cancelPropertyToggle}
                            loading={loading}
                        />
                        <Button as={Link} 
                            disabled={property.isCancelled}
                            to={`/manage/${property.id}`} 
                            color='orange'
                            floated='right'>
                            Manage Investment
                        </Button>
                    </>

                ) : property.isInvesting ? (
                    <Button loading={loading} onClick={updateInvestment}>Cancel Invest</Button>
                ) : (
                    <Button disabled={property.isCancelled} 
                        loading={loading} onClick={updateInvestment} color='teal'>
                            Invest Now
                    </Button>
                )}
                
            </Segment>
        </Segment.Group>
    )
})