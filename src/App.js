import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from "./components/List"
import Card from "./components/Card"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route exact path="/hidden/:id" element={<Card hidden={true} />} />
        <Route exact path="/showed/:id" element={<Card hidden={false} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
