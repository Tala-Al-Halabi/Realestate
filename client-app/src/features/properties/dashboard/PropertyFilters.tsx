import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function PropertyFilters() {
    return (
        <>
        <Menu vertical size='large' style={{width: '100%', marginTop: 25 }}>
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Property' />
            <Menu.Item content="I invested" />
            <Menu.Item content="I'm hosting" />
        </Menu>
        <Header/>
        <Calendar />

        </>
    )
}