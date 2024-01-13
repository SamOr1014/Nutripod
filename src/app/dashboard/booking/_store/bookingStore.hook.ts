import { create } from 'zustand'

type State = {
  bookingDate: string
}

type Actions = {
  setBookingDate: (date: Date) => void
}

export const formatDateToString = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

export const formatStringToDate = (dateString: string): Date =>
  new Date(dateString)

export const useBookingStore = create<State & Actions>((set) => ({
  bookingDate: formatDateToString(new Date()),
  setBookingDate: (date) =>
    set(() => ({ bookingDate: formatDateToString(date) })),
}))
