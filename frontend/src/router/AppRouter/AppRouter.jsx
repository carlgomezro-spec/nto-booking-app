import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Search from "../../pages/Search";
import Booking from "../../pages/Booking";
import Profile from "../../pages/Profile";
import Main from "../../layout/Main";

const AppRouter = () => {
  return (
     <BrowserRouter>
      <Routes>
        {/* Login y Register fuera de Main */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas dentro de Main */}
        <Route
          path="/"
          element={
            <Main>
              <Home />
            </Main>
          }
        />
        <Route
          path="/search"
          element={
            <Main>
              <Search />
            </Main>
          }
        />
        <Route
          path="/booking"
          element={
            <Main>
              <Booking />
            </Main>
          }
        />
        <Route
          path="/profile"
          element={
            <Main>
              <Profile />
            </Main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};


export default AppRouter;
