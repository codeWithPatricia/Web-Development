import { useSettings } from '../components/SettingsContext'

function Settings() {
  const {
    name,
    email,
    emailNotifications,
    ticketNotifications,
    setName,
    setEmail,
    setEmailNotifications,
    setTicketNotifications,
  } = useSettings()

  return (
    <div className="min-h-full bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your SupportHub preferences.
        </p>

      </div>


      <div className="mx-auto max-w-3xl space-y-6">

        {/* Profile */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your account information.
              Changes are saved automatically.
            </p>

          </div>


          <div className="space-y-5">

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />

            </div>


            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />

            </div>

          </div>

        </div>


        {/* Notifications */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose which notifications you want to
              receive. Changes are saved automatically.
            </p>

          </div>


          <div className="space-y-6">

            {/* Email Notifications */}
            <label className="flex cursor-pointer items-center justify-between gap-6">

              <div>

                <p className="font-medium text-gray-900">
                  Email notifications
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Receive important updates by email.
                </p>

              </div>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(event) =>
                  setEmailNotifications(
                    event.target.checked
                  )
                }
                className="h-5 w-5 cursor-pointer accent-blue-600"
              />

            </label>


            {/* Ticket Notifications */}
            <label className="flex cursor-pointer items-center justify-between gap-6">

              <div>

                <p className="font-medium text-gray-900">
                  Ticket notifications
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Get notified when tickets are updated.
                </p>

              </div>

              <input
                type="checkbox"
                checked={ticketNotifications}
                onChange={(event) =>
                  setTicketNotifications(
                    event.target.checked
                  )
                }
                className="h-5 w-5 cursor-pointer accent-blue-600"
              />

            </label>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Settings
