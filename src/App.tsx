import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Books from "./components/book/Books";
import Register from "./components/Register";
import Home from "./components/Home";
import BookDetails from "./components/book/BookDetails";
import { Container } from "@chakra-ui/react";
import LoansComponent from "./components/loan/LoansComponent";
import UserComponent from "./components/user/UserComponent";
import { ProtectedRoutes } from "./components/routing/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Header />
      <Container maxW="container.xl" p={4}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/loans" element={<LoansComponent />} />
            <Route path="/profile" element={<UserComponent />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
