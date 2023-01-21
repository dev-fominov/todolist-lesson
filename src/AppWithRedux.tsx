import { Reducer, useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { TaskType, Todolist, FilterValueType } from './components/Todolist';
import { v1 } from 'uuid';
import { Input } from './components/Input';
import { addTaskAC, addTaskTodolistAC, changeStatusAC, deleteTaskTodolistAC, removeTaskAC, tasksReducer, updateTaskAC } from './state/tasksReducer';
import { AllType, addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './state/todolistsReducer';
import { AppRootStateType } from './state/store';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksTodolistsType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    //     { id: todolistID1, title: 'What to learn', filter: 'all' },
    //     { id: todolistID2, title: 'What to buy', filter: 'all' },
    // ])

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         { id: v1(), title: 'HTML&CSS', isDone: true },
    //         { id: v1(), title: 'JS', isDone: true },
    //         { id: v1(), title: 'ReactJS', isDone: false },
    //         { id: v1(), title: 'WordPress', isDone: false }
    //     ],
    //     [todolistID2]: [
    //         { id: v1(), title: 'Rest API', isDone: true },
    //         { id: v1(), title: 'GraphQL', isDone: false },
    //         { id: v1(), title: "Rest API", isDone: false },
    //     ]
    // })

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksTodolistsType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }, [dispatch])
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])
    const changeStatus = useCallback((todolistID: string, taskID: string, checkedValue: boolean) => {
        dispatch(changeStatusAC(todolistID, taskID, checkedValue))
    }, [dispatch])
    const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(todolistID, taskID, newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
        dispatch(deleteTaskTodolistAC(todolistID))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const todolistID = v1()
        dispatch(addTodolistAC(todolistID, title))
        dispatch(addTaskTodolistAC(todolistID))
    }, [dispatch])
    const changeFilter = useCallback((todolistID: string, filterValue: FilterValueType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
    }, [dispatch])
    const updateTodolist = useCallback((todolistID: string, newTitle: string) => {
        dispatch(updateTodolistAC(todolistID, newTitle))
    }, [dispatch])

    return (
        <div className="App">
            <Input callBack={addTodolist} />
            {todolists.map(todolist => {

                // let filteredTasks = tasks[todolist.id]
                // if (todolist.filter === 'active') {
                //     filteredTasks = tasks[todolist.id].filter(el => !el.isDone)
                // }
                // if (todolist.filter === 'completed') {
                //     filteredTasks = tasks[todolist.id].filter(el => el.isDone)
                // }

                return (
                    <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
                        title={todolist.title}
                        tasks={tasks[todolist.id]}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                        changeStatus={changeStatus}
                        filter={todolist.filter}
                    />
                )
            })}

        </div>
    );
}

export default AppWithRedux;
