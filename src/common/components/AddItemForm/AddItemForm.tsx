import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { BaseResponseType } from "common/types"
import Box from "@mui/material/Box"

type Props = {
  addItem: (title: string) => Promise<unknown>
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: Props) => {

  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }
  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
        .then(() => {
          setTitle("")
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setError(err.messages[0])
          }
        })
    } else {
      setError("Title is required")
    }
  }
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      return setError(null)
    }
    if (e.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <Box>
      <TextField label={error ? "Error" : "Type out something"}
                 variant="outlined"
                 size="small"
                 sx={{ width: "210px" }}
                 error={!!error}
                 value={title}
                 onChange={changeTitleHandler}
                 onKeyDown={keyDownHandler}
                 disabled={disabled}
                 type="search" />

      <Button variant="contained"
              disabled={disabled}
              sx={{ height: "39px", minWidth: "49px", marginLeft: "5px" }}
              onClick={addItemHandler}>
        +
      </Button>
      {error && <Box color={'red'}>{error}</Box>}
    </Box>
  )
})
