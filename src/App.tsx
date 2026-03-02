import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const BlogsPage = lazy(() => import("./components/blogs/BlogsPage"));
const BlogDetail = lazy(() => import("./components/blogs/BlogDetail"));
const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));

import { LoadingProvider } from "./context/LoadingProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { BlogProvider } from "./context/BlogContext";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BlogProvider>
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <LoadingProvider>
                  <Suspense>
                    <MainContainer>
                      <Suspense>
                        <CharacterModel />
                      </Suspense>
                    </MainContainer>
                  </Suspense>
                </LoadingProvider>
              }
            />
            {/* Blog Pages */}
            <Route
              path="/blogs"
              element={
                <Suspense fallback={null}>
                  <BlogsPage />
                </Suspense>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Suspense fallback={null}>
                  <BlogDetail />
                </Suspense>
              }
            />
            {/* Admin Panel */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={null}>
                  <AdminPanel />
                </Suspense>
              }
            />
          </Routes>
        </BlogProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
