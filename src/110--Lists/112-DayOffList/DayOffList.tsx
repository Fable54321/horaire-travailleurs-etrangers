import { CalendarX, UserRound } from "lucide-react"
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"
import {formatName} from "../../Utils/formatName"
import { useMemo } from "react"



const DayOffList = () => {


const { dateCode, workersSchedule } = useWorkerSchedule()

const filteredWorkersSchedule = useMemo(() => {
    return workersSchedule.filter(worker => worker.day_off.startsWith(dateCode) === true)
}, [workersSchedule, dateCode])


  return (
    <section className="mt-3 flex flex-col items-center gap-4 bg-white p-4 rounded-xl shadow-2xl">
      <div className="bg-[#f4f6ee]  text-secondary font-tertiary px-2 rounded-lg flex items-center gap-2 shadow-lg">
        <h2 className="text-[1.7em] text-center" >Lista de trabajadores en baja</h2>
        <div className="bg-secondary p-2 rounded-lg">
            <CalendarX className="text-white" />
        </div>
      </div>
      <ul className="flex flex-col items-start gap-3">
        {filteredWorkersSchedule.map(worker => (
           <li key={worker.id} className="flex items-center gap-2">
            <div className="bg-secondary p-2 rounded-md">
            <UserRound className="text-white " size={17} />
            </div>
           <p className="text-[1.25em] font-bold">{worker.user_surname && worker.user_name &&  formatName(worker.user_surname) + ' ' + formatName(worker.user_name)} </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DayOffList
