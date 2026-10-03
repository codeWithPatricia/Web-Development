export interface Ticket {
  id: number
  customer: string
  email: string
  subject: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'Pending' | 'Resolved'
  date: string
}

export const tickets: Ticket[] = [
  {
    id: 1,
    customer: 'John Doe',
    email: 'john@example.com',
    subject: 'Unable to log into my account',
    priority: 'High',
    status: 'Open',
    date: 'Oct 1, 2026',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Payment was charged twice',
    priority: 'High',
    status: 'Pending',
    date: 'Sep 30, 2026',
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    subject: 'How do I change my password?',
    priority: 'Low',
    status: 'Resolved',
    date: 'Sep 29, 2026',
  },
  {
    id: 4,
    customer: 'Sarah Williams',
    email: 'sarah@example.com',
    subject: 'Dashboard is not loading',
    priority: 'Medium',
    status: 'Open',
    date: 'Sep 28, 2026',
  },
  {
    id: 5,
    customer: 'David Brown',
    email: 'david@example.com',
    subject: 'Refund has not arrived',
    priority: 'Medium',
    status: 'Pending',
    date: 'Sep 27, 2026',
  },
]
