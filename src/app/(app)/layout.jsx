import { getEvents } from '@/data'
import { ApplicationLayout } from '../(profile)/application-layout'

export default async function RootLayout({ children }) {
  let events = await getEvents()

  return <div events={events}>{children}</div>
}
