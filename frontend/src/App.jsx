import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Auth from "./pages/Auth"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App
