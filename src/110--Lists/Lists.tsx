import { useEffect } from 'react'
import { useWorkerSchedule } from '../Contexts/WorkerScheduleContext'
import { formatDate } from '../Utils/formatDate'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const Lists = () => {
  const { selectedDate, setSelectedDate } = useWorkerSchedule()

  const handleSetNextDay = () => {
    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() + 1)
    setSelectedDate(nextDate)
  }

  const handleSetPreviousDay = () => {
    const previousDate = new Date(selectedDate)
    previousDate.setDate(previousDate.getDate() - 1)
    setSelectedDate(previousDate)
  }


  useEffect(() => {
    console.log(selectedDate)
  },[selectedDate])

  return (
    <article className="flex flex-col items-center mt-5 text-[0.9rem] md:text-[1rem] lg:text-[1.1rem]">
       
       <div className="flex items-center gap-3">
<button className="text-secondary hover:cursor-pointer"  onClick={handleSetPreviousDay}><ChevronLeftIcon size={30} strokeWidth={3} /></button>
          <h2 className="font-tertiary text-[2em] font-bold">{formatDate(selectedDate)}</h2>
   <button className="text-secondary hover:cursor-pointer" onClick={handleSetNextDay}>
    <ChevronRightIcon size={30} strokeWidth={3} />
    </button> 
  </div>
   
  
    </article>
  )
}

export default Lists
