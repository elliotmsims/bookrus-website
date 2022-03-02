import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'

import Navigation from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Models from './components/Models'
import { Books, Book } from './components/Books'
import { Authors } from './components/Authors'
import { Countries } from './components/Countries'

export default function App() {
  return (
    <div class="App">
      <Navigation/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Models />} >
          <Route path=':bookId' element={<Book />} />
          <Route index element={<Books /> } />
        </Route>
        <Route path='/authors' element={<Authors />} />
        <Route path='/countries' element={<Countries />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Outlet />
    </div>
  )
}
