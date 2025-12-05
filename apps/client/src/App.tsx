import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news" element={<NewsDetail />} />
        <Route path="/ai-summary" element={<AiSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
