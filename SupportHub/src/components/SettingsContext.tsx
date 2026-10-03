import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type SettingsContextType = {
  name: string
  email: string
  emailNotifications: boolean
  ticketNotifications: boolean

  setName: (name: string) => void
  setEmail: (email: string) => void
  setEmailNotifications: (enabled: boolean) => void
  setTicketNotifications: (enabled: boolean) => void
}

const SettingsContext =
  createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({
  children,
}: {
  children: ReactNode
}) {
  // Name
  const [name, setName] = useState(() => {
    return (
      localStorage.getItem('settings_name') ||
      'Support Admin'
    )
  })

  // Email
  const [email, setEmail] = useState(() => {
    return (
      localStorage.getItem('settings_email') ||
      'admin@supporthub.com'
    )
  })

  // Email notifications
  const [emailNotifications, setEmailNotifications] =
    useState(() => {
      const saved = localStorage.getItem(
        'settings_email_notifications'
      )

      if (saved === null) {
        return true
      }

      return saved === 'true'
    })

  // Ticket notifications
  const [ticketNotifications, setTicketNotifications] =
    useState(() => {
      const saved = localStorage.getItem(
        'settings_ticket_notifications'
      )

      if (saved === null) {
        return true
      }

      return saved === 'true'
    })

  // Automatically save settings
  useEffect(() => {
    localStorage.setItem(
      'settings_name',
      name
    )

    localStorage.setItem(
      'settings_email',
      email
    )

    localStorage.setItem(
      'settings_email_notifications',
      String(emailNotifications)
    )

    localStorage.setItem(
      'settings_ticket_notifications',
      String(ticketNotifications)
    )
  }, [
    name,
    email,
    emailNotifications,
    ticketNotifications,
  ])

  return (
    <SettingsContext.Provider
      value={{
        name,
        email,
        emailNotifications,
        ticketNotifications,

        setName,
        setEmail,
        setEmailNotifications,
        setTicketNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error(
      'useSettings must be used inside SettingsProvider'
    )
  }

  return context
}
