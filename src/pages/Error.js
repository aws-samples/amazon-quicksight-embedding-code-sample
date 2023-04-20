import { Link } from 'react-router-dom'
import {Card, Flex} from '@aws-amplify/ui-react';


export default function Error(){
    return(
            
        
             <div >
             <Flex justifyContent="center" direction="column" alignItems="center"
   padding="50px" height = "40vh">
             <h2>Error</h2>

             <Card
               variation="elevated"
               padding = "100px">

             <Link to='/'> Back to HomePage  </Link>
             </Card>

           </Flex>
           </div>
    )
}
