import CreateUser from "./pages/CreateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import DocumentPage from "./pages/DocumentPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/app" element={<CreateUser />} />
          <Route path="/user/:filter" element={<UserProfile />} />
          <Route path="/document/:filter" element={<DocumentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
