import React, { PropsWithChildren } from 'react'
import TopNavigation from './components/TopNavigation'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-full px-2 pt-1">
      <TopNavigation />
      <section className="container h-full mx-auto mt-5">
        <section className="w-full h-full mx-auto border rounded-xl min-h-[700px] lg:w-[1024px]">
          {children}
        </section>
      </section>
    </main>
  )
}

export default Layout
