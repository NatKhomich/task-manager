import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../state/store';
import {setTodolistsTC} from '../state/todoListsReducer';

export const useTodolists = () => {
    const todolists = useAppSelector(state => state.todoLists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    return {
        todolists, tasks, dispatch
    }
}
