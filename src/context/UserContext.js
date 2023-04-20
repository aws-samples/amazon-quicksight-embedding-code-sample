import { createContext,useState, useEffect } from "react"
import { Auth } from 'aws-amplify';

const UserContext = createContext([])

const UserProvider= ({children}) => {

  const [user, setUser] = useState([]);

  // Current signed-in user from cognito.
  useEffect( () => {
    
      if (sessionStorage.getItem("signedin")) {
        setUser(JSON.parse(sessionStorage.getItem("signedin")))
      }
      else {
        const fetchUser = async () => {
        const { attributes } = await Auth.currentAuthenticatedUser();
        sessionStorage.setItem("signedin", JSON.stringify(attributes));
        return attributes;
    }
    fetchUser().then(r => setUser(r));

  }

  }, [sessionStorage.getItem("signedin")])

  return (<UserContext.Provider value ={{user}}>
      {children}
  </UserContext.Provider>)
}

export { UserProvider, UserContext };