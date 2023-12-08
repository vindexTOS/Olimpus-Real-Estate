import React from 'react'

import { useSelector } from 'react-redux'
import Loading from './components/Status-components/Loading'
import Success from './components/Status-components/Success'
import Error from './components/Status-components/Error'
import Nav from './components/navbar/Nav'
import Footer from './components/footer/Footer'
function Layout({ children }: { children: any }) {
  const { error, succsess, loading } = useSelector(
    (state: any) => state.propertyReducer,
  )
  return (
    <div className="backgroundphoto   ">
      <Success success={succsess} />
      <Error error={error} />
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
