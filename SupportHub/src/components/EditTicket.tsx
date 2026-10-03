import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Ticket } from '../data/tickets'

type EditTicketProps = {
  tickets: Ticket[]
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

function EditTicket({
  tickets,
  setTickets,
}: EditTicketProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const ticket = tickets.find(
    (ticket) => ticket.id === Number(id)
  )

  if (!ticket) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">
          Ticket not found
        </h1>
      </div>
    )
  }

  const [customer, setCustomer] = useState(ticket.customer)
  const [email, setEmail] = useState(ticket.email)
  const [subject, setSubject] = useState(ticket.subject)
  const [priority, setPriority] = useState<
    'Low' | 'Medium' | 'High'
  >(ticket.priority)
  const [status, setStatus] = useState<
    'Open' | 'Pending' | 'Resolved'
  >(ticket.status)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    setTickets((currentTickets) =>
      currentTickets.map((currentTicket) =>
        currentTicket.id === Number(id)

          ? {
              ...currentTicket,
              customer,
              email,
              subject,
              priority,
              status,
            }
          : currentTicket
      )
    )

    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Ticket
        </h1>

        <p className="mt-1 text-gray-500">
          Update the information for this support ticket.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >

        {/* Customer */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Customer Name
          </label>

          <input
            type="text"
            value={customer}
            onChange={(event) =>
              setCustomer(event.target.value)
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value as
                  | 'Low'
                  | 'Medium'
                  | 'High'
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | 'Open'
                  | 'Pending'
                  | 'Resolved'
              )
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-lg border px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </form>
    </div>
  )
}

export default EditTicket
