import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
    return (
       <Segment inverted textAlign='center' vertical className='masthead'>
           <Container text>
               <Header as='h1' inverted>
                   <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBotton: 12}} />
                   Realestate
               </Header>
               <Header as='h2' inverted content='Welcome to Realestates' />
               <Button as={Link} to='/properties' size='huge' inverted>
                  Get Started!
               </Button>
           </Container>

       </Segment>

    )


}