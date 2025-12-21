import { BrowserRouter, Route, Routes } from "react-router-dom"
import Range from "./pages/Range"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Range/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
