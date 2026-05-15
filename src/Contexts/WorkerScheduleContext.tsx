import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { fetchWithAuth } from '../Utils/fetchWithAuth'

export type WorkerScheduleDetails = {
  id: number
  user_id: number | null
  user_name: string | null
  user_surname: string | null
  username: string | null
  user_email: string | null
  [key: string]: unknown
}

const getWorkersSchedule = () => fetchWithAuth<WorkerScheduleDetails[]>('/schedule')

type WorkerScheduleContextValue = {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
  workersSchedule: WorkerScheduleDetails[]
  loadingWorkersSchedule: boolean
  workersScheduleError: string | null
  refetchWorkersSchedule: () => Promise<void>
}

const WorkerScheduleContext = createContext<WorkerScheduleContextValue | null>(null)

type WorkerScheduleProviderProps = {
  children: ReactNode
}

export const WorkerScheduleProvider = ({ children }: WorkerScheduleProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [workersSchedule, setWorkersSchedule] = useState<WorkerScheduleDetails[]>([])
  const [loadingWorkersSchedule, setLoadingWorkersSchedule] = useState(true)
  const [workersScheduleError, setWorkersScheduleError] = useState<string | null>(null)

  const refetchWorkersSchedule = useCallback(async () => {
    try {
      setLoadingWorkersSchedule(true)
      setWorkersScheduleError(null)

      const data = await getWorkersSchedule()
      setWorkersSchedule(data)
    } catch (error) {
      console.error('Error fetching workers schedule:', error)
      setWorkersSchedule([])
      setWorkersScheduleError(
        error instanceof Error ? error.message : 'Failed to fetch workers schedule',
      )
    } finally {
      setLoadingWorkersSchedule(false)
    }
  }, [])

  useEffect(() => {
    let isCurrent = true

    const loadWorkersSchedule = async () => {
      try {
        const data = await getWorkersSchedule()

        if (!isCurrent) {
          return
        }

        setWorkersSchedule(data)
        setWorkersScheduleError(null)
      } catch (error) {
        if (!isCurrent) {
          return
        }

        console.error('Error fetching workers schedule:', error)
        setWorkersSchedule([])
        setWorkersScheduleError(
          error instanceof Error ? error.message : 'Failed to fetch workers schedule',
        )
      } finally {
        if (isCurrent) {
          setLoadingWorkersSchedule(false)
        }
      }
    }

    void loadWorkersSchedule()

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <WorkerScheduleContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        workersSchedule,
        loadingWorkersSchedule,
        workersScheduleError,
        refetchWorkersSchedule,
      }}
    >
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
