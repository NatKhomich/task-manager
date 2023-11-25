import React from "react"
import Container from "@mui/material/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { TodolistList } from "features/TodolistList/ui/TodolistList"
import { Login } from "features/auth/ui/Login"
import { NotFound } from "common/components/NotFound"

export const Routing = () => {
  return (
    <Container fixed maxWidth="xl">
      <Routes>
        <Route path={"/"} element={<TodolistList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </Container>
  )
}

