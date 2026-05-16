import type { Dispatch, SetStateAction } from "react";
import { useWorkerSchedule } from "../../Contexts/WorkerScheduleContext"

type CheckBoxesProps = {
  selectedJobCategoryIds: number[]
  setSelectedJobCategoryIds: Dispatch<SetStateAction<number[]>>
}

const CheckBoxes = ({ selectedJobCategoryIds, setSelectedJobCategoryIds }: CheckBoxesProps) => {
const { jobCategories } = useWorkerSchedule();

const allCategoriesSelected = jobCategories.length > 0 && selectedJobCategoryIds.length === jobCategories.length

const handleToggleCategory = (categoryId: number) => {
  setSelectedJobCategoryIds((currentCategoryIds) =>
    currentCategoryIds.includes(categoryId)
      ? currentCategoryIds.filter((currentCategoryId) => currentCategoryId !== categoryId)
      : [...currentCategoryIds, categoryId],
  )
}

const handleToggleAllCategories = () => {
  setSelectedJobCategoryIds(allCategoriesSelected ? [] : jobCategories.map((category) => category.id))
}

  return (
    <section className="flex w-[min(100%,500px)] flex-col items-center bg-white mt-2 shadow-2xl rounded-xl px-2">
        <h2 className="text-[1.7em] text-center my-2">Categorias mostradas:</h2>
        <ul className="grid w-full grid-cols-2 items-stretch gap-2">
            {jobCategories.map((category) => (
                <li key={category.id} className="flex h-17 w-full min-w-0 text-[1.2em] items-center gap-2 border-b border-dashed border-secondary/50 pb-2">
                    <input
                      className="h-6 w-6 flex-none accent-secondary"
                      type="checkbox"
                      id={`job-category-${category.id}`}
                      name={category.job_name}
                      value={category.id}
                      checked={selectedJobCategoryIds.includes(category.id)}
                      onChange={() => handleToggleCategory(category.id)}
                    />
                    <label className="min-w-0 flex-1 leading-tight" htmlFor={`job-category-${category.id}`}>{category.job_name}</label>
                </li>
            ))}
            <li className="flex h-17 w-full min-w-0 text-[1.2em] items-center gap-2 border-b border-dashed border-secondary/50 pb-2">
                <input
                  className="h-6 w-6 flex-none accent-secondary"
                  type="checkbox"
                  id="all"
                  name="all"
                  value="all"
                  checked={allCategoriesSelected}
                  onChange={handleToggleAllCategories}
                />
                <label className="min-w-0 flex-1 leading-tight" htmlFor="all">todos</label>
            </li>
        </ul>
    </section>
  )
}

export default CheckBoxes
