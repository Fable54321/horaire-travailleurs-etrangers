import { useEffect, useState } from 'react'
import { useWorkerSchedule } from '../Contexts/WorkerScheduleContext'
import { formatDate } from '../Utils/formatDate'
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import ConductorsList from './111--ConductorsList/ConductorsList'
import DayOffList from './112-DayOffList/DayOffList'

const dateInputFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const getDateInputValue = (date: Date) => dateInputFormatter.format(date)

const monthFormatter = new Intl.DateTimeFormat('fr-CA', {
  month: 'long',
  year: 'numeric',
})

const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const getDateFromInputValue = (value: string) => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return null
  }

  const [, yearValue, monthValue, dayValue] = match
  const year = Number(yearValue)
  const month = Number(monthValue)
  const day = Number(dayValue)
  const parsedDate = new Date(year, month - 1, day)

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null
  }

  return parsedDate
}

const isSameDate = (firstDate: Date, secondDate: Date) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate()

const getCalendarDays = (monthDate: Date) => {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingEmptyDays = firstDayOfMonth.getDay()

  return [
    ...Array.from({ length: leadingEmptyDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, dayIndex) => new Date(year, month, dayIndex + 1)),
  ]
}

const Lists = () => {
  const { selectedDate, setSelectedDate, workersSchedule } = useWorkerSchedule()
  const [dateInputValue, setDateInputValue] = useState<string | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate)
  const selectedDateInputValue = getDateInputValue(selectedDate)
  const displayedDateInputValue = dateInputValue ?? selectedDateInputValue
  const calendarDays = getCalendarDays(calendarMonth)


  


  useEffect(() => {
    console.log(workersSchedule)
  },[workersSchedule])

  const handleSetNextDay = () => {
    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() + 1)
    setDateInputValue(null)
    setCalendarMonth(nextDate)
    setSelectedDate(nextDate)
  }

  const handleSetPreviousDay = () => {
    const previousDate = new Date(selectedDate)
    previousDate.setDate(previousDate.getDate() - 1)
    setDateInputValue(null)
    setCalendarMonth(previousDate)
    setSelectedDate(previousDate)
  }

  const handleSubmitDate = () => {
    const nextDate = getDateFromInputValue(displayedDateInputValue)

    if (nextDate) {
      setCalendarMonth(nextDate)
      setSelectedDate(nextDate)
    }

    setDateInputValue(null)
  }

  const handleSelectCalendarDate = (date: Date) => {
    setDateInputValue(null)
    setCalendarMonth(date)
    setSelectedDate(date)
    setIsCalendarOpen(false)
  }

  const handleSetPreviousMonth = () => {
    setCalendarMonth((currentMonth) => {
      const previousMonth = new Date(currentMonth)
      previousMonth.setMonth(previousMonth.getMonth() - 1)
      return previousMonth
    })
  }

  const handleSetNextMonth = () => {
    setCalendarMonth((currentMonth) => {
      const nextMonth = new Date(currentMonth)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      return nextMonth
    })
  }

  const handleOpenCalendar = () => {
    setCalendarMonth(selectedDate)
    setIsCalendarOpen(true)
  }



  return (
    <article className="flex flex-col items-center mt-5 w-full ">
      <div className="flex items-center gap-3">
        <button className="text-secondary hover:cursor-pointer" onClick={handleSetPreviousDay}>
          <ChevronLeftIcon size={30} strokeWidth={3} />
        </button>
        <h2 className="font-tertiary text-[2em] font-bold text-center">{formatDate(selectedDate)}</h2>
        <button className="text-secondary hover:cursor-pointer" onClick={handleSetNextDay}>
          <ChevronRightIcon size={30} strokeWidth={3} />
        </button>
      </div>

      <div
        className="relative mt-3 w-full flex flex-col items-center"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            handleSubmitDate()
            setIsCalendarOpen(false)
          }
        }}
      >
        <label className="flex items-center gap-2 text-secondary">
          <button
            className="hover:cursor-pointer"
            type="button"
            aria-label="Ouvrir le calendrier"
            onClick={() => {
              if (isCalendarOpen) {
                setIsCalendarOpen(false)
                return
              }

              handleOpenCalendar()
            }}
          >
            <CalendarDaysIcon size={22} strokeWidth={2.5} aria-hidden="true" />
          </button>
          <span className="sr-only">Choisir une date</span>
          <input
            className="custom-input w-38 bg-white px-2 py-1 font-secondary text-base text-black"
            inputMode="numeric"
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="AAAA-MM-JJ"
            value={displayedDateInputValue}
            onFocus={handleOpenCalendar}
            onChange={(event) => setDateInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmitDate()
                setIsCalendarOpen(false)
                event.currentTarget.blur()
              }

              if (event.key === 'Escape') {
                setDateInputValue(null)
                setIsCalendarOpen(false)
                event.currentTarget.blur()
              }
            }}
          />
        </label>

        {isCalendarOpen && (
          <div className="absolute left-1/2 z-10 mt-2 w-[min(102%,400px)] -translate-x-1/2 rounded-md border border-secondary/30 bg-white p-1 font-secondary text-black shadow-lg">
            <div className="mb-3 flex items-center justify-between text-secondary">
              <button
                className="rounded-sm p-1 hover:cursor-pointer hover:bg-tertiary"
                type="button"
                aria-label="Mois precedent"
                onClick={handleSetPreviousMonth}
              >
                <ChevronLeftIcon size={22} strokeWidth={3} />
              </button>
              <p className="font-tertiary text-base font-bold capitalize">{monthFormatter.format(calendarMonth)}</p>
              <button
                className="rounded-sm p-1 hover:cursor-pointer hover:bg-tertiary"
                type="button"
                aria-label="Mois suivant"
                onClick={handleSetNextMonth}
              >
                <ChevronRightIcon size={22} strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-secondary">
              {weekDays.map((weekDay) => (
                <span key={weekDay}>{weekDay}</span>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-y-4 gap-x-3">
              {calendarDays.map((date, index) =>
                date ? (
                  <button
                    key={getDateInputValue(date)}
                    className={`h-9 rounded-sm text-[1.5em]  hover:cursor-pointer hover:bg-tertiary ${
                      isSameDate(date, selectedDate) ? 'bg-secondary font-bold text-white hover:bg-secondary' : ''
                    }`}
                    type="button"
                    onClick={() => handleSelectCalendarDate(date)}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <span key={`empty-${index}`} className="h-9" aria-hidden="true" />
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <ConductorsList />

      <DayOffList />
    </article>
  )
}

export default Lists
