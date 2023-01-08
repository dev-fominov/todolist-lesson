import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';



function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
    ])

    const removeTask = (id: string) => {
        tasks = tasks.filter(el => el.id !== id)
        setTasks(tasks)
    }

    const addTask = (title: string) => {
        const newTasks = [{ id: v1(), title, isDone: false }, ...tasks]
        setTasks(newTasks)
    }

    const checkBoxChange = (newId: string, checkedValue: boolean) => {
        setTasks(tasks.map(task => task.id === newId ? { ...task, isDone: checkedValue } : task))
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn 1"}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                checkBoxChange={checkBoxChange}
            />
        </div>
    );
}

export default App;
