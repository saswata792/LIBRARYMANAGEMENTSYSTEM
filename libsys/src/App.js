import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Lib from "./pages/librarian/librarian";
import Book from "./pages/librarian/books";
import LibProfile from "./pages/librarian/profile";
import Student from "./pages/student/student";
import StudProfile from "./pages/student/profile"; 
import BookBank from "./pages/librarian/bookbank";
import EngageBooks from "./pages/librarian/bookengage";
import BooksReturn from "./pages/librarian/bookreturn";
import React from "react";
function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/lib" element={<Lib />} />
          <Route exact path="/book" element={<Book />} />
          <Route exact path="/bookbank" element={<BookBank />} />
          <Route exact path="/stud" element={<Student />} />
          <Route exact path="/studprof" element={<StudProfile />} />
          <Route exact path="/libprofile" element={<LibProfile />} />
          <Route exact path="/engagebooks" element={<EngageBooks />} />
          <Route exact path="/bookreturn" element={<BooksReturn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
