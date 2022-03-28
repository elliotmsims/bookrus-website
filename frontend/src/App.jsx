import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/NavBar";
import Home from "./views/Home/HomePage";
import About from "./views/About/AboutPage";
import { Books, Book } from "./views/Books/BooksPage";
import { Authors, Author } from "./views/Authors/AuthorsPage";
import { Countries, Country } from "./views/Countries/CountriesPage";
import "./App.scss";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
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
