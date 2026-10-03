import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Ticket } from '../data/tickets'

type NewTicketProps = {
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

function NewTicket({ setTickets }: NewTicketProps) {
    const navigate = useNavigate()

  const [customer, setCustomer] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium')

  const [message, setMessage] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const newTicket: Ticket = {
      id: Date.now(),
      customer,
      email,
      subject,
      priority,
      status: 'Open',
      date: new Date().toLocaleDateString(),
    }

    setTickets((currentTickets) => [
      ...currentTickets,
      newTicket,
    ])

    navigate('/')

    setCustomer('')
    setEmail('')
    setSubject('')
    setPriority('Medium')
    setMessage('')
  }

  return (
    <div className="mx-auto max-w-3xl">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Ticket
        </h1>

        <p className="mt-1 text-gray-500">
          Create a new customer support ticket.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Customer Name
          </label>

          <input
            type="text"
            value={customer}
            onChange={(event) => setCustomer(event.target.value)}
            placeholder="John Doe"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>


        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="john@example.com"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>


        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Unable to login"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>


        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) =>
  setPriority(
    event.target.value as 'Low' | 'Medium' | 'High'
  )
}

            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>


        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </label>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Describe the customer's issue..."
            rows={5}
            className="w-full resize-none rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>


        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </div>

      </form>
    </div>
  )
}

export default NewTicket
