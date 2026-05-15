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
    <section>
      <h2>Lista de conductores disponibles</h2>
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
