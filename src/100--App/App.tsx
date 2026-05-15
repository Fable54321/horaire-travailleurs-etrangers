import { Outlet } from "react-router-dom"
import vegibecLogo from "../assets/images/vegibec.png"



function App() {
  






  return (
 <article className="flex flex-col items-center text-[0.85rem] md:text-[1rem] lg:text-[1.1rem] px-2">
  <img src={vegibecLogo} alt="vegibec logo" className="w-80 mt-5" />
  <Outlet />
 </article>
  )
}

export default App
