import { Outlet } from "react-router-dom"
import vegibecLogo from "../assets/images/vegibec.png"
import { usePersistentAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";


function App() {
  

  const { user } = usePersistentAuth();


  useEffect(() => {
    console.log(user)
  },[user])

  return (
 <article className="flex flex-col items-center">
  <img src={vegibecLogo} alt="vegibec logo" className="w-80 mt-5" />
  <Outlet />
 </article>
  )
}

export default App
