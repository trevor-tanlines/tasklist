import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'completed', or 'pending'

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            const taskObject = {
                text: newTask,
                isCompleted: false
            };
            setTasks((prevTasks) => [...prevTasks, taskObject]);
            setNewTask('');
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function setTaskFilter(filterType) {
        setFilter(filterType);
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.isCompleted;
        if (filter === 'pending') return !task.isCompleted;
        return true;
    });

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <div className="filters">
                <button onClick={() => setTaskFilter('all')}>All</button>
                <button onClick={() => setTaskFilter('completed')}>Completed</button>
                <button onClick={() => setTaskFilter('pending')}>Pending</button>
            </div>

            <ol>
                {filteredTasks.map((task, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleTaskCompletion(index)}
                                disabled={task.isCompleted} // Disable if completed
                            />
                            <span className={task.isCompleted ? 'completed' : ''}>
                                {task.text}
                            </span>
                        </label>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            ↑
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            ↓
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
