import { useEffect } from "react";
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"


const CheckBoxes = () => {


const { jobCategories } = useWorkerSchedule();

useEffect(() => {
    console.log( 'jobCategories',jobCategories)
}, [jobCategories])
 
const categories = Array.from(new Set(jobCategories.map(job => job.job_name)));


  return (
    <section className="flex flex-col items-center bg-white mt-2 shadow-2xl rounded-xl px-2">
        <h2 className="text-[1.7em] text-center my-2">categoría de trabajadores:</h2>
        <ul className="grid grid-cols-2 items-start gap-2">
            {categories.map((category, index) => (
                <li key={index} className="flex h-17 text-[1.2em] items-center gap-2 border-b border-dashed border-secondary/50 pb-2 w-full">
                    <input type="checkbox" id={category} name={category} value={category} />
                    <label htmlFor={category}>{category}</label>
                </li>
            ))}
        </ul>
        

    </section>
  )
}

export default CheckBoxes
