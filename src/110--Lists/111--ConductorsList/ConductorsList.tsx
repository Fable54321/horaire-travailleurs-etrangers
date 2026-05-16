import { useMemo } from "react"
import { useWorkerSchedule, type WorkerScheduleDetails } from "../../Contexts/WorkerScheduleContext"
import wheel from "../../assets/images/wheel.png"
import { UserRound } from "lucide-react"
import { formatName } from "../../Utils/formatName"

type ConductorsListProps = {
  selectedJobCategoryIds: number[]
}

const workerMatchesSelectedJobCategory = (worker: WorkerScheduleDetails, selectedJobCategoryIds: number[]) => {
  const workerJobIds = [worker.job_id_1, worker.job_id_2, worker.job_id_3]

  return workerJobIds.some((workerJobId) =>
    workerJobId !== null && selectedJobCategoryIds.includes(workerJobId),
  )
}

const ConductorsList = ({ selectedJobCategoryIds }: ConductorsListProps) => {

const { workersSchedule, dateCode} = useWorkerSchedule()




const filteredWorkersSchedule = useMemo(() => {
  return workersSchedule.filter(worker => workerMatchesSelectedJobCategory(worker, selectedJobCategoryIds))
         .filter(worker => worker.day_off.startsWith(dateCode) === false)

}, [workersSchedule, dateCode, selectedJobCategoryIds])

const selectedCategoriesCount = selectedJobCategoryIds.length



  return (
    <section className=" w-[min(100%,500px)] mt-3 flex flex-col items-center gap-4 bg-white py-4 rounded-xl shadow-2xl">
        <div className="w-[95%] bg-[#f4f6ee]  text-secondary font-tertiary px-2 rounded-lg flex items-center gap-2 shadow-lg">
      <div className="flex-1 text-center">
      <h2 className="text-[1.7em]">Trabajadores disponibles</h2>
      <p className="font-secondary text-sm text-black/70">{selectedCategoriesCount} categorias seleccionadas</p>
      </div>
      <div className="bg-secondary p-2 rounded-xl">
      <img src={wheel} alt="wheel" className="w-8" />
      </div>
      
      </div>
      <ul className="flex flex-col items-start w-full gap-3 px-1">
        {filteredWorkersSchedule.length > 0 ? filteredWorkersSchedule.map(worker => (
          <li key={worker.id} className="flex items-center gap-2 border-b border-secondary/50 pb-2 w-full">
            <div className="bg-secondary p-2 rounded-md">
            <UserRound className="text-white "  size={17} />
            </div>
           <p className="text-[1.7em] font-bold">{worker.user_surname && worker.user_name &&   formatName(worker.user_surname) + ' ' + formatName(worker.user_name)}</p>
          </li>
        )) : (
          <li className="w-full px-2 pb-2 text-center font-secondary text-base text-black/70">
            Marca una categoria para ver trabajadores disponibles.
          </li>
        )}
      </ul>
    </section>
  )
}

export default ConductorsList
