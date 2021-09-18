  
import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Property } from '../../../app/models/property'

interface Props {
    property: Property;
}

export default observer(function PropertyDetailedSidebar({ property: { investors, host } }: Props) {
    if (!investors) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {investors.length} {investors.length === 1 ? 'Person' : 'People'} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {investors.map(investor => (
                        <Item style={{ position: 'relative' }} key={investor.username}>
                            {investor.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>}
                            <Image size='tiny' src={investor.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${investor.username}`}>{investor.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}

                </List>
            </Segment>
        </>

    )
})