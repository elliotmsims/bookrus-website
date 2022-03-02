import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'

import Navigation from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Model from './components/Model'
import { Books, Book } from './components/Books'
import { Authors, Author } from './components/Authors'
import { Countries, Country } from './components/Countries'

export default function App() {
  return (
    <div class="App">
      <Navigation/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Model />} >
          <Route path=':bookId' element={<Book />} />
          <Route index element={<Books /> } />
        </Route>
        <Route path='/authors' element={<Model />} >
          <Route path=':authorId' element={<Author />} />
          <Route index element={<Authors />} />
        </Route>
        <Route path='/countries' element={<Model />} >
          <Route path=':countryId'element={<Country />} />
          <Route index element={<Countries />} />
        </Route>
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
