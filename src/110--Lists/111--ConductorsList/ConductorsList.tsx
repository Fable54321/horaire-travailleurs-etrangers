import { useEffect, useMemo } from "react"
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"
import wheel from "../../assets/images/wheel.png"
import { UserRound } from "lucide-react"

const ConductorsList = () => {

const {selectedDate, workersSchedule} = useWorkerSchedule()

useEffect(() => {
    console.log(selectedDate)
},[selectedDate])

const filteredWorkersSchedule = useMemo(() => {
  return workersSchedule.filter(worker => worker.is_driver === true)

}, [workersSchedule])

useEffect(() => {
  console.log(filteredWorkersSchedule)
},[filteredWorkersSchedule])

  return (
    <section className="mt-3 flex flex-col items-center gap-4 bg-white p-4 rounded-xl shadow-2xl">
        <div className="bg-[#f4f6ee]  text-secondary font-tertiary px-2 rounded-lg flex items-center gap-2 shadow-lg">
      <h2 className="text-[1.7em] text-center">Lista de conductores disponibles</h2>
      <div className="bg-secondary p-2 rounded-xl">
      <img src={wheel} alt="wheel" className="w-10" />
      </div>
      
      </div>
      <ul>
        {filteredWorkersSchedule.map(worker => (
          <li key={worker.id} className="flex items-center gap-2">
            <div className="bg-secondary p-2 rounded-md">
            <UserRound className="text-white " />
            </div>
           {worker.user_surname} {worker.user_name} 
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ConductorsList
