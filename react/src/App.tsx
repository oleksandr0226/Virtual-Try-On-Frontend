import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import CreateChatbotPage from "./pages/upload.page";
import Layout from "./components/Layout";
import LandingPage from "./pages/landing.page";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="upload" element={<CreateChatbotPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
