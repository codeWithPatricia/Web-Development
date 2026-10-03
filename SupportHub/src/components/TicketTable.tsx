import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Ticket } from '../data/tickets'

type TicketTableProps = {
  tickets: Ticket[]
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

function TicketTable({
  tickets,
  setTickets,
}: TicketTableProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  // Used to navigate to the Edit Ticket page
  const navigate = useNavigate()

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      status === 'All' || ticket.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Tickets
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your latest customer support requests.
        </p>

        {/* Search and Filter */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">

          <thead className="bg-gray-50">
            <tr>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Customer
              </th>

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
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y">

            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50"
              >

                {/* Customer */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {ticket.customer}
                    </p>

                    <p className="text-sm text-gray-500">
                      {ticket.email}
                    </p>
                  </div>
                </td>

                {/* Subject */}
                <td className="px-6 py-4 text-sm">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {ticket.subject}
                  </Link>
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <span className="text-sm font-medium">
                    {ticket.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <select
                    value={ticket.status}
                    onChange={(event) => {
                      const newStatus = event.target.value as
                        | 'Open'
                        | 'Pending'
                        | 'Resolved'

                      setTickets((currentTickets) =>
                        currentTickets.map((currentTicket) =>
                          currentTicket.id === ticket.id
                            ? {
                                ...currentTicket,
                                status: newStatus,
                              }
                            : currentTicket
                        )
                      )
                    }}
                    className="rounded-full border px-3 py-1 text-xs font-medium outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {ticket.date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">

                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/tickets/${ticket.id}/edit`)
                      }
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        const confirmed = window.confirm(
                          'Are you sure you want to delete this ticket?'
                        )

                        if (!confirmed) {
                          return
                        }

                        setTickets((currentTickets) =>
                          currentTickets.filter(
                            (currentTicket) =>
                              currentTicket.id !== ticket.id
                          )
                        )
                      }}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}

            {/* No results */}
            {filteredTickets.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No tickets found.
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default TicketTable
