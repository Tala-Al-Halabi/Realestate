import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {

    const {propertyStore} = useStore();

    return(
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item header>
                  <img src="/assets/logo.png" alt="logo" style={{marginRight: '20px'}}/>
                   Properties
                </Menu.Item> 
                <Menu.Item name='Properties' />
                <Menu.Item>
                    <Button onClick={() => propertyStore.openForm()} positive content='Create Property' />
                </Menu.Item>      
            </Container>
        </Menu>
    )
}