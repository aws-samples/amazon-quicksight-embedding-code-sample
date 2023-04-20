import { createContext,useState, useEffect } from "react"

const EmbedTypeContext = createContext([])

const EmbedTypeProvider= ({children}) => {

  const [embedType, setEmbedType] = useState([]);
  const [embedViewType, setEmbedViewType] = useState([]);

  // 
  useEffect( () => {
    
      if (sessionStorage.getItem("embedType")) {
        setEmbedType(sessionStorage.getItem("embedType"))
        console.log(sessionStorage.getItem("embedType"))
      }
      else {
        sessionStorage.setItem("embedType", "Anonymous Embedding");
        setEmbedType("Anonymous Embedding")
    }}
,[]);

useEffect( () => {
    
  if (sessionStorage.getItem("embedViewType")) {
    setEmbedViewType(sessionStorage.getItem("embedViewType"))
    console.log(sessionStorage.getItem("embedViewType"))
  }
  else {
    sessionStorage.setItem("embedViewType", "Dashboard View");
    setEmbedViewType("Dashboard View")
  }}
  ,[]);


  return (<EmbedTypeContext.Provider value ={{embedType,setEmbedType, embedViewType, setEmbedViewType}}>
      {children}
  </EmbedTypeContext.Provider>)
}

export { EmbedTypeProvider, EmbedTypeContext };