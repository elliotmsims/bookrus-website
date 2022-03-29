import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/NavBar";
import Home from "./views/Home/HomePage";
import About from "./views/About/AboutPage";
import Books from "./views/Books/BooksPage";
import Book from "./views/Books/BookInstance";
import Authors from "./views/Authors/AuthorsPage";
import Author from "./views/Authors/AuthorInstance";
import Countries from "./views/Countries/CountriesPage";
import Country from "./views/Countries/CountryInstance";
import "./App.scss";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books/0"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>There&apos;s nothing here!</h1>
            </main>
          }
        />
        <Route
          path="authors/0"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>There&apos;s nothing here!</h1>
            </main>
          }
        />
        <Route
          path="countries/0"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>There&apos;s nothing here!</h1>
            </main>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:authorId" element={<Author />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryId" element={<Country />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>There&apos;s nothing here!</h1>
            </main>
          }
        />
      </Routes>
    </>
  );
}

/* do we need Outlet? */
