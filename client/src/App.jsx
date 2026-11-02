import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import MainPage from './pages/ManePage/MainPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import TeamPage from './pages/TeamPage/TeamPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
                    path="/"
                    element={<MainPage />}
                />

                <Route
                    path="/catalog"
                    element={<CatalogPage />}
                />

                <Route
    path="/team"
    element={<TeamPage />}
/>

<Route
  path="*"
  element={<NotFoundPage />}
/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
