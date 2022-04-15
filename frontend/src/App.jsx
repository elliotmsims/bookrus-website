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
import Search from "./views/Search/SearchPage";
import ErrorPage from "./views/Error/ErrorPage";
import "./App.scss";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/0" element={<ErrorPage />} />
        <Route path="authors/0" element={<ErrorPage />} />
        <Route path="countries/0" element={<ErrorPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<Book />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:authorId" element={<Author />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryId" element={<Country />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
