import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feedback";
import Getfeed from "./pages/GetFeedback";
import Feedup from "./pages/FeedUpdata";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/Feedpage" element={<Getfeed />} />
          <Route path="/update-warehous/:feedId" element={<Feedup />} />
        </Route>

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
