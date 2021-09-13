import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment} from 'semantic-ui-react';
import { Property } from '../../../app/models/property';

interface Props {
    property: Property
}
export default function PropertyListItem({property}: Props) {

    return(
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png'/>
                       <Item.Content>
                            <Item.Header as={Link} to={`/properties/${property.id}`}>
                               {property.title} 
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
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
               Investors go here
           </Segment>
           <Segment clearing>
               <span>{property.about}</span>
               <Button
                    as={Link}
                    to={`/properties/${property.id}`}
                    color='teal'
                    floated='right'
                    content= 'View'
               />
           </Segment>
       </Segment.Group>
    )
}