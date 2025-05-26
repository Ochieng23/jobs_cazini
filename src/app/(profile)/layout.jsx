import { getEvents } from '@/data'
import { ApplicationLayout } from '@/app/(profile)/application-layout'

export default async function RootLayout({ children }) {
  let events = await getEvents()

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>
}
