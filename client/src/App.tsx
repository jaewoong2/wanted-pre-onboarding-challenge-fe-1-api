import React from 'react'
import Routers from './features/routes/Routers'
import Layout from './layout/Layout'

type Props = {}

const App = ({ ...props }: Props) => {
  return (
    <Layout {...props}>
      <Routers />
    </Layout>
  )
}

export default App
