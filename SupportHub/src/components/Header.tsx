import { useSettings } from '../components/SettingsContext'

function Header() {
  const { name } = useSettings()

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, {name}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        A
      </div>
    </header>
  )
}

export default Header
