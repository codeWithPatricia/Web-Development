import { Link } from 'react-router-dom'
import type { Ticket } from '../data/tickets'
import TicketTable from './TicketTable'

type TicketsProps = {
  tickets: Ticket[]
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>
}

function Tickets({
  tickets,
  setTickets,
}: TicketsProps) {
  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tickets
          </h1>

          <p className="mt-1 text-gray-500">
            View and manage all customer support tickets.
          </p>
        </div>

        {/* Add Ticket Button */}
        <Link
          to="/tickets/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Add New Ticket
        </Link>

      </div>

      {/* Ticket Table */}
      <TicketTable
        tickets={tickets}
        setTickets={setTickets}
      />

    </div>
  )
}

export default Tickets
