import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"
import styles from "./EditableSpan.module.css"

type Props = {
  value: string
  callBack: (newTitle: string) => void
  disabled: boolean
}

export const EditableSpan = memo(({ value, disabled, callBack }: Props) => {

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    if (disabled) {
      return
    }
    setEditMode(!editMode)
    if (editMode) {
      callBack(title)
    }
  }
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditMode(false)
      callBack(title)
    }
  }

  return (
    editMode
      ? <TextField size="small" value={title}
                   onChange={changeTitleHandler}
                   onKeyDown={keyDownHandler}
                   onBlur={activateEditModeHandler}
                   autoFocus
      />
      : <span onDoubleClick={activateEditModeHandler} className={styles.span}>{value} </span>
  )
})

