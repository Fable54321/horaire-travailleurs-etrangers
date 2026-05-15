import { useEffect, useMemo } from "react"
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"


const ConductorsList = () => {

const {selectedDate, setSelectedDate, workersSchedule} = useWorkerSchedule()

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
    <section className="mt-3 flex flex-col items-center bg-white p-4 rounded-xl shadow-2xl">
        <div className="bg-[#f4f6ee] text-secondary font-tertiary px-1">
      <h2 className="text-[1.7em] ">Lista de conductores disponibles</h2>
      </div>
      <ul>
        {filteredWorkersSchedule.map(worker => (
          <li key={worker.id}>
           {worker.user_surname} {worker.user_name} 
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ConductorsList
