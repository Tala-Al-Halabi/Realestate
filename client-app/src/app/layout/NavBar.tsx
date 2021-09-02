import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return(
        <Menu inverted fixed='top' >
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                  <img src="/assets/logo.png" alt="logo" style={{marginRight: '20px'}}/>
                   Properties
                </Menu.Item> 
                <Menu.Item as={NavLink} to='/properties' name='Properties' />
                <Menu.Item>
                    <Button as={NavLink} to='/createProperty' positive content='Create Property' />
                </Menu.Item>      
            </Container>
        </Menu>
    )
}