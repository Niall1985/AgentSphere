import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ModeSelect from "../pages/ModeSelect";
import AgentSelect from "../pages/AgentSelect";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mode" element={<ModeSelect />} />
      <Route path="/agents" element={<AgentSelect />} />
    </Routes>
  );
}