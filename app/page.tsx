import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect root to tables view (default page)
  redirect('/tables')
}
