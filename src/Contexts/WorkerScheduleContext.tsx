import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

type WorkerScheduleContextValue = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}

const WorkerScheduleContext = createContext<WorkerScheduleContextValue | null>(null)

type WorkerScheduleProviderProps = {
  children: ReactNode
}

export const WorkerScheduleProvider = ({ children }: WorkerScheduleProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())

  return (
    <WorkerScheduleContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </WorkerScheduleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkerSchedule = () => {
  const context = useContext(WorkerScheduleContext)

  if (!context) {
    throw new Error('useWorkerSchedule must be used within a WorkerScheduleProvider')
  }

  return context
}
