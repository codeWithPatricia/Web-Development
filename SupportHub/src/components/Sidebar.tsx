import { NavLink } from 'react-router-dom'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-white border-r shadow-xl
          transition-transform duration-300 ease-in-out

          md:sticky md:top-0 md:h-screen
          md:translate-x-0 md:shadow-none

          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col">

          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b px-6">

            <NavLink
              to="/"
              onClick={onClose}
            >
              <h2 className="text-xl font-bold text-blue-600">
                SupportHub
              </h2>
            </NavLink>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

          </div>


          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">

            {/* Dashboard */}
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={({ isActive }) =>
                `mb-2 block rounded-lg px-4 py-3 font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Dashboard
            </NavLink>


            {/* Tickets */}
            <NavLink
              to="/tickets"
              onClick={onClose}
              className={({ isActive }) =>
                `mb-2 block rounded-lg px-4 py-3 font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Tickets
            </NavLink>


            {/* Customers */}
            <NavLink
              to="/customers"
              onClick={onClose}
              className={({ isActive }) =>
                `mb-2 block rounded-lg px-4 py-3 font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Customers
            </NavLink>


            {/* Settings */}
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Settings
            </NavLink>

          </nav>

        </div>
      </aside>
    </>
  )
}

export default Sidebar
