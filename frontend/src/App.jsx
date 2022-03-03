import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
// test
import Navigation from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Models from "./components/Models";
import { Books, Book } from "./components/Books";
import { Authors, Author } from "./components/Authors";
import { Countries, Country } from "./components/Countries";

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Models />}>
          <Route path=":bookId" element={<Book />} />
          <Route index element={<Books />} />
        </Route>
        <Route path="/authors" element={<Models />}>
          <Route path=":authorId" element={<Author />} />
          <Route index element={<Authors />} />
        </Route>
        <Route path="/countries" element={<Models />}>
          <Route path=":countryId" element={<Country />} />
          <Route index element={<Countries />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There&aposs nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}
