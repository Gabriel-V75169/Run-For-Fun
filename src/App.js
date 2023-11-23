import React from 'react'
import * as Components from '<div className="src"/Components';
function App() {
    const [signIn,toggle] = React.useState(true);
    return(
        <Components.Container>
            <Components.SignUpContainer signIn={SignIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder="Name" />
                    <Components.Input type='email' placeholder="Email"/>
                    <Components.Input type='password' placeholder="Password"/>
                    <Components.Buttons>Sign Up</Components.Buttons>
                    </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signinIn={signIn}>
                <Components.form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input type='email' placeholder="Email"/>
                    <Components.Input type='password' placeholder="Password"/>
                    <Components.Anchor hred='#'>Forgot <Password></Password></Components.Anchor>
                    <Components.Buttons>Sign <In></In></Components.Buttons>
                </Components.form>
            </Components.SignInContainer>

            <Components.OverLayContainer signinIn={signIn}>
                <Components.Overlay signIn={signIn}>
                    <Components.LeftOverLayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        to stay conneected please login
                    </Components.Paragraph>
                    <Components.GhostButton onclick={() => toggle(true)}>
                        Sign in
                    </Components.GhostButton>
                    </Components.LeftOverLayPanel>

                    <Components.RightOverLayePane signinIn={signIn}>
                        <Components.Title>Hello, user!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(fasle)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverLayePane>

                </Components.Overlay>
            </Components.OverLayContainer>
            
        </Components.Container>
    )     
}

export default App
