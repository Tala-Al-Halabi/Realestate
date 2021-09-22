import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserProperty } from '../../app/models/profile';
import { format } from 'date-fns';
import { useStore } from "../../app/stores/store";

const panes = [
    { menuItem: 'Future Properties', pane: { key: 'future' } },
    { menuItem: 'Past Properties', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

export default observer(function ProfileProperties() {
    const { profileStore } = useStore();
    const {
        loadUserProperties,
        profile,
        loadingProperties,
        userProperties
    } = profileStore;

    useEffect(() => {
        loadUserProperties(profile!.username);
    }, [loadUserProperties, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserProperties(profile!.username, panes[data.activeIndex as number].pane.key);
    };

    return (
        <Tab.Pane loading={loadingProperties}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Properties'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userProperties.map((property: UserProperty) => (
                            <Card
                                as={Link}
                                to={`/properties/${property.id}`}
                                key={property.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${property.itype}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{property.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(property.date), 'do LLL')}</div>
                                        <div>{format(new Date(property.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});