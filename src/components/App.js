import MainHeap from "./MainHeap";
import GlobalStyle from "../assets/styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainHeap />} />
        </Routes>
      </BrowserRouter>
    </> 
  );
}
