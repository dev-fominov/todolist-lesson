import { Reducer, useReducer } from 'react';
import './App.css';
import { TaskType, Todolist, FilterValueType } from './components/Todolist';
import { v1 } from 'uuid';
import { Input } from './components/Input';
import { addTaskAC, addTaskTodolistAC, changeStatusAC, deleteTaskTodolistAC, removeTaskAC, tasksReducer, updateTaskAC } from './reducers/tasksReducer';
import { AllType, addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './reducers/todolistsReducer';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksTodolistsType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'WordPress', isDone: false }
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
        ]
    })

    const removeTask = (todolistID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }
    const addTask = (todolistID: string, title: string) => {
        dispatchTasks(addTaskAC(todolistID, title))
    }
    const changeStatus = (todolistID: string, taskID: string, checkedValue: boolean) => {
        dispatchTasks(changeStatusAC(todolistID, taskID, checkedValue))
    }
    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatchTasks(updateTaskAC(todolistID, taskID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolists(removeTodolistAC(todolistID))
        dispatchTasks(deleteTaskTodolistAC(todolistID))
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        dispatchTodolists(addTodolistAC(todolistID, title))
        dispatchTasks(addTaskTodolistAC(todolistID))
    }
    const changeFilter = (todolistID: string, filterValue: FilterValueType) => {
        dispatchTodolists(changeFilterAC(todolistID, filterValue))
    }
    const updateTodolist = (todolistID: string, newTitle: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <Input callBack={addTodolist} />
            {todolists.map(todolist => {

                let filteredTasks = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    filteredTasks = tasks[todolist.id].filter(el => !el.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks[todolist.id].filter(el => el.isDone)
                }

                return (
                    <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
                        title={todolist.title}
                        tasks={filteredTasks}
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

export default AppWithReducer;
