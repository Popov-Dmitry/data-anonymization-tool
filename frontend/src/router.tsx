import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./routes/not-found/NotFound";
import Home from "./routes/home/Home";
import Tables from "./routes/tables/Tables";
import Table from "./routes/table/Table";
import Header from "./components/header/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-1200px m-auto">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/tables/:name" element={<Table />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
