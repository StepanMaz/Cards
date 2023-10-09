import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/game";
import SignUpPage from "./pages/auth/signup";
import SignInPage from "./pages/auth/signin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="game" element={<GamePage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
