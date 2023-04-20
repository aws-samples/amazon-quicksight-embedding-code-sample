import React from "react";
import { Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import banner from '../img/banner.jpeg';
// Imports for API
import {TripleList} from '../components'




function Home() {

    return (
        <div style={{padding: '10px'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '25px 25px'
            }}>
                <img src = {banner} alt="banner" style = {{maxWidth: '100%'}}/>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 0px 25px 0px'
            }}>
                <p>
                <Text
                fontWeight={650}>
                Save on over one million products available in case packs, ready to ship. Streamline ordering for your bulk purchasing needs.   
                </Text>     <a href="https://www.flaticon.com/free-icons/dashboard" title="dashboard icons">Dashboard icons created by Freepik - Flaticon</a>
                </p>
   
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TripleList/>
                
            </div>

        </div>
    );
  }

export default Home;