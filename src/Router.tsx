import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { CreateVeg } from './pages/CreateVeg'
import { EditVeg } from './pages/EditVeg'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateVeg />} />
        <Route path="/edit" element={<EditVeg />} />
      </Route>
    </Routes>
  )
}
