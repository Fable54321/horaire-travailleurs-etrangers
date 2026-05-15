import { useEffect } from "react"
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"


const ConductorsList = () => {

const {selectedDate, setSelectedDate, workersSchedule} = useWorkerSchedule()

useEffect(() => {
    console.log(selectedDate)
},[selectedDate])

  return (
    <section>
      <p>{workersSchedule[0].user_surname} {workersSchedule[0].user_name}</p>
    </section>
  )
}

export default ConductorsList
