import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Books from "./components/Books";
import { Container } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Header />
      <Container maxW="container.xl" p={4}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
