import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import TicketTable from './components/TicketTable'
import TicketDetails from './components/TicketDetails'
import NewTicket from './components/NewTicket'
import Tickets from './components/Tickets'
import EditTicket from './components/EditTicket'

import { tickets } from './data/tickets'
import type { Ticket } from './data/tickets'
import Customers from './components/Customers'
import CustomerDetails from './components/CustomerDetails'
import Settings from './components/Settings'




function App() {
  const [ticketList, setTicketList] = useState<Ticket[]>(() => {
    const savedTickets = localStorage.getItem('tickets')

    if (savedTickets) {
      return JSON.parse(savedTickets) as Ticket[]
    }

    return tickets
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)


  // Save tickets to localStorage
  useEffect(() => {
    localStorage.setItem(
      'tickets',
      JSON.stringify(ticketList)
    )
  }, [ticketList])


  // Ticket statistics
  const openTickets = ticketList.filter(
    (ticket) => ticket.status === 'Open'
  ).length

  const pendingTickets = ticketList.filter(
    (ticket) => ticket.status === 'Pending'
  ).length

  const resolvedTickets = ticketList.filter(
    (ticket) => ticket.status === 'Resolved'
  ).length


  return (
    <div className="min-h-screen bg-gray-100">

      {/* =================================
          MOBILE TOP BAR
      ================================= */}
      <div className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">

        <h2 className="text-xl font-bold text-blue-600">
          SupportHub
        </h2>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

      </div>


      {/* =================================
          DESKTOP SIDEBAR + MAIN CONTENT
      ================================= */}
      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />


        {/* Main application */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}
          <Header />


          {/* Page content */}
          <main className="flex-1">

            <Routes>

              {/* =========================
                  DASHBOARD
              ========================= */}
              <Route
                path="/"
                element={
                  <div className="p-6">

                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Overview
                      </h2>

                      <p className="mt-1 text-gray-500">
                        Here's what's happening with your support tickets.
                      </p>
                    </div>


                    {/* Statistics */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                      <StatCard
                        title="Open Tickets"
                        value={openTickets}
                        color="bg-blue-100"
                      />

                      <StatCard
                        title="Pending Tickets"
                        value={pendingTickets}
                        color="bg-yellow-100"
                      />

                      <StatCard
                        title="Resolved Tickets"
                        value={resolvedTickets}
                        color="bg-green-100"
                      />

                    </div>


                    {/* Recent tickets */}
                    <TicketTable
                      tickets={ticketList}
                      setTickets={setTicketList}
                    />

                  </div>
                }
              />


              {/* =========================
                  ALL TICKETS
              ========================= */}
              <Route
                path="/tickets"
                element={
                  <Tickets
                    tickets={ticketList}
                    setTickets={setTicketList}
                  />
                }
              />


              {/* =========================
                  NEW TICKET
              ========================= */}
              <Route
                path="/tickets/new"
                element={
                  <NewTicket
                    setTickets={setTicketList}
                  />
                }
              />


              {/* =========================
                  TICKET DETAILS
              ========================= */}
              <Route
                path="/tickets/:id"
                element={
                  <TicketDetails />
                }
              />


              {/* =========================
                  EDIT TICKET
              ========================= */}
              <Route
                path="/tickets/:id/edit"
                element={
                  <EditTicket
                    tickets={ticketList}
                    setTickets={setTicketList}
                  />
                }
              />

              {/* =========================
                  CUSTOMER DETAIL
              ========================= */}
              <Route
                path="/customers"
                element={
                  <Customers
                    tickets={ticketList}
                  />
                }
              />

              {/* =========================
                  VIEW CUSTOMER DETAIL
              ========================= */}
                <Route
                  path="/customers/:email"
                  element={
                    <CustomerDetails
                      tickets={ticketList}
                    />
                  }
                />

                {/* =========================
                  SETTING
              ========================= */}
              <Route
                  path="/settings"
                  element={
                    <Settings />
                 }
                />



            </Routes>

          </main>

        </div>

      </div>

    </div>
  )
}

export default App
