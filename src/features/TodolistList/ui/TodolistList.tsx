import React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Navigate } from "react-router-dom"
import { AddItemForm } from "common/components/AddItemForm"
import { Todolist } from "features/TodolistList/ui/Todolist"
import { useTodolistList } from "features/TodolistList/lib/useTodolistList"

export const TodolistList = () => {

  const { addTodolistCallback, todolists, tasks, isLoggedIn } = useTodolistList()

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <Container fixed maxWidth="xl" className="container">
      <Grid container sx={{ padding: "20px 0" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={6}>
        {todolists.map(el => {
          return (
            <Grid item key={el.id} sx={{ width: "400px" }}>
              <Paper elevation={4} sx={{ padding: "15px" }}>
                <Todolist
                  todolist={el}
                  tasks={tasks[el.id]}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}