import { useParams, Link } from 'react-router-dom'
import { tickets } from '../data/tickets'


function TicketDetails() {
  const { id } = useParams()

  const ticket = tickets.find(
    (ticket) => ticket.id === Number(id)
  )

  if (!ticket) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Ticket not found
        </h1>

        <Link
          to="/"
          className="mt-4 inline-block text-blue-600"
        >
          ← Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-blue-600"
        >
          ← Back to Dashboard
        </Link>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          
          <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row">
            <div>
              <p className="text-sm text-gray-500">
                Ticket #{ticket.id}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900">
                {ticket.subject}
              </h1>
            </div>

            <span className="h-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {ticket.status}
            </span>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            
            <div>
              <p className="text-sm text-gray-500">
                Customer
              </p>

              <p className="mt-1 font-medium">
                {ticket.customer}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-medium">
                {ticket.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Priority
              </p>

              <p className="mt-1 font-medium">
                {ticket.priority}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="mt-1 font-medium">
                {ticket.date}
              </p>
            </div>

          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold">
              Customer Message
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Hello, I am having an issue with my account.
              I have tried several times but I am still
              unable to resolve the problem. Could you please
              help me?
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TicketDetails
