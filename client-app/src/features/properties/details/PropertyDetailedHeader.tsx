import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Property } from '../../../app/models/property';


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
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
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
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Invest Property</Button>
                <Button>Cancel Invest</Button>
                <Button as={Link} to={`/manage/${property.id}`} color='orange' floated='right'>
                    Manage Investment
                </Button>
            </Segment>
        </Segment.Group>
    )
})