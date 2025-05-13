import React from 'react'
import {Html , Body , Container , Text , Link , Preview } from '@react-email/components'
const WelcomeTemplate = ({name}:{name:string}) => {
  return (
    <Html>
        <Preview>Welcome to our service!</Preview>
        <Body style={{ margin: '0', padding: '0', fontFamily: 'Arial, sans-serif' }}>

            <Container>
                <Text>Hello {name}</Text>
                <Text>Welcome to our service! We are glad to have you on board.</Text>
                <Text>If you have any questions, feel free to reach out to us.</Text>
                <Text>Best regards,</Text>
                <Text>The Team</Text>
                

            </Container>

            </Body>
    </Html>
  )
}

export default WelcomeTemplate