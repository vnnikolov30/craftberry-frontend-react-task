import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<Quiz />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
