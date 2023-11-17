import React from 'react'
import * as Components from './Components';
function App() {
    const [signIn] = React.useState(true);
    return(
        <Components.Container> 
            <Components.SignUpConatiner signinIn={Sign}
            <Components.Form>
                <Components.Title>create Account</Components.Title>
            </Components.Form>
            </Components.SignUpConatiner>
        </Components.Container>
    )
}

export default App
