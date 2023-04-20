import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Authenticator} from '@aws-amplify/ui-react';
// Pages
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error from './pages/Error'

//Components
import {NavBar, SecondNavBar, FooterTop, FooterBottom} from './components'
import {components, formFields} from './pages/Login'
import {EmbedTypeProvider} from './context/EmbedTypeContext';
import {UserProvider} from './context/UserContext';

import {API, Auth, graphqlOperation, Hub} from "aws-amplify";
import {tenantOnboarding} from "./graphql/queries";

function App() {

  async function postAuthCallBack() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("user", user.attributes['custom:company']);
    const res = await API.graphql(graphqlOperation(tenantOnboarding, {'company_name': user.attributes['custom:company']}));
    return JSON.parse(res.data.onCognitoAuth);
  }

  Hub.listen("auth", (capsule) => {
    switch (capsule.payload.event) {
      case 'signIn':
        console.log('user signed in');
        postAuthCallBack().then(r => console.log(r));
        break;
      case 'signUp':
        console.log('user signed up');
        postAuthCallBack().then(r => console.log(r));
        break;
      case 'signOut':
        console.log('user signed out');
        break;
      case 'autoSignIn':
        console.log('auto sign in completed');
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        break;
      case 'configured':
        console.log('the Auth module is configured');
        break;
      case '':
        console.log();
        break;
      default:
        break;
    }

    console.log(capsule.payload.event);
  });

  return (
    <Router>
      <Authenticator formFields={formFields} components={components}>
        <UserProvider>
      <EmbedTypeProvider>
      <NavBar/>
      <SecondNavBar/>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/Dashboard" element={<Dashboard/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path='*' element={<Error/>}/>
              </Routes>
              <FooterTop/>
              <FooterBottom/>
</EmbedTypeProvider>
</UserProvider>
      </Authenticator>
    </Router>
  );
}

export default App;
