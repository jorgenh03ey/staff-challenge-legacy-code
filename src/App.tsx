import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Import from "./pages/Import";
import Run from "./pages/Run";
import Docs from "./pages/Docs";
import Architecture from "./pages/Architecture";
import Translate from "./pages/Translate";
import Validate from "./pages/Validate";
import Export from "./pages/Export";
import "./App.css";

// Initialize Fluent UI icons
initializeIcons();

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/import" element={<Import />} />
          <Route path="/run" element={<Run />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
