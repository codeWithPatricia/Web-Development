import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Ticket } from '../data/tickets'

type CustomersProps = {
  tickets: Ticket[]
}

type Customer = {
  name: string
  email: string
  tickets: Ticket[]
}

function Customers({
  tickets,
}: CustomersProps) {
  const [search, setSearch] = useState('')

  /*
    Build a unique customer list
    from the existing tickets.
  */
  const customerMap = new Map<string, Customer>()

  tickets.forEach((ticket) => {
    const key = ticket.email.toLowerCase()

    if (!customerMap.has(key)) {
      customerMap.set(key, {
        name: ticket.customer,
        email: ticket.email,
        tickets: [],
      })
    }

    customerMap.get(key)?.tickets.push(ticket)
  })

  const customers = Array.from(customerMap.values())

  /*
    Search customers by
    name or email.
  */
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())
  )

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage customers who have submitted support tickets.
        </p>
      </div>


      {/* Statistics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total Customers */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {customers.length}
          </p>
        </div>


        {/* Customers with Open Tickets */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Customers with Open Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {
              customers.filter((customer) =>
                customer.tickets.some(
                  (ticket) => ticket.status === 'Open'
                )
              ).length
            }
          </p>
        </div>


        {/* Customers with Resolved Tickets */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Customers with Resolved Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              customers.filter((customer) =>
                customer.tickets.some(
                  (ticket) => ticket.status === 'Resolved'
                )
              ).length
            }
          </p>
        </div>

      </div>


      {/* Customer Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        {/* Search */}
        <div className="border-b px-6 py-5">

          <h2 className="text-lg font-semibold text-gray-900">
            All Customers
          </h2>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full max-w-md rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Tickets
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Open
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Resolved
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y">

              {filteredCustomers.map((customer) => {

                const openCount =
                  customer.tickets.filter(
                    (ticket) =>
                      ticket.status === 'Open'
                  ).length

                const resolvedCount =
                  customer.tickets.filter(
                    (ticket) =>
                      ticket.status === 'Resolved'
                  ).length

                return (
                  <tr
                    key={customer.email}
                    className="hover:bg-gray-50"
                  >

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {customer.name}
                      </p>
                    </td>


                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {customer.email}
                    </td>


                    {/* Total Tickets */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {customer.tickets.length}
                      </span>
                    </td>


                    {/* Open */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-blue-600">
                        {openCount}
                      </span>
                    </td>


                    {/* Resolved */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-green-600">
                        {resolvedCount}
                      </span>
                    </td>


                    {/* Actions */}
                    <td className="px-6 py-4">

                      <Link
                        to={`/customers/${encodeURIComponent(customer.email)}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View
                      </Link>

                    </td>

                  </tr>
                )
              })}


              {/* No customers */}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Customers
