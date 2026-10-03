import { Link, useParams } from 'react-router-dom'
import type { Ticket } from '../data/tickets'

type CustomerDetailsProps = {
  tickets: Ticket[]
}

function CustomerDetails({
  tickets,
}: CustomerDetailsProps) {
  const { email } = useParams()

  const customerEmail = email
    ? decodeURIComponent(email)
    : ''

  const customerTickets = tickets.filter(
    (ticket) =>
      ticket.email.toLowerCase() ===
      customerEmail.toLowerCase()
  )

  // Customer not found
  if (customerTickets.length === 0) {
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">

          <h1 className="text-xl font-bold text-gray-900">
            Customer not found
          </h1>

          <p className="mt-2 text-gray-500">
            We couldn't find a customer with that email address.
          </p>

          <Link
            to="/customers"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Back to Customers
          </Link>

        </div>
      </div>
    )
  }

  const customer = customerTickets[0]

  const openTickets = customerTickets.filter(
    (ticket) => ticket.status === 'Open'
  ).length

  const pendingTickets = customerTickets.filter(
    (ticket) => ticket.status === 'Pending'
  ).length

  const resolvedTickets = customerTickets.filter(
    (ticket) => ticket.status === 'Resolved'
  ).length

  return (
    <div className="p-6">

      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/customers"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Customers
        </Link>
      </div>


      {/* Customer information */}
      <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customer.customer}
            </h1>

            <p className="mt-1 text-gray-500">
              {customer.email}
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-3">
            <p className="text-sm text-blue-600">
              Total Tickets
            </p>

            <p className="text-2xl font-bold text-blue-700">
              {customerTickets.length}
            </p>
          </div>

        </div>

      </div>


      {/* Statistics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        {/* Open */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Open Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {openTickets}
          </p>

        </div>


        {/* Pending */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Pending Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingTickets}
          </p>

        </div>


        {/* Resolved */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <p className="text-sm font-medium text-gray-500">
            Resolved Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {resolvedTickets}
          </p>

        </div>

      </div>


      {/* Customer tickets */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b px-6 py-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Customer Tickets
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            All support requests submitted by this customer.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Subject
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Priority
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y">

              {customerTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50"
                >

                  {/* Subject */}
                  <td className="px-6 py-4">

                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {ticket.subject}
                    </Link>

                  </td>


                  {/* Priority */}
                  <td className="px-6 py-4 text-sm">
                    {ticket.priority}
                  </td>


                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        ${
                          ticket.status === 'Open'
                            ? 'bg-blue-100 text-blue-700'
                            : ticket.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }
                      `}
                    >
                      {ticket.status}
                    </span>

                  </td>


                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {ticket.date}
                  </td>


                  {/* Action */}
                  <td className="px-6 py-4">

                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Ticket
                    </Link>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default CustomerDetails
