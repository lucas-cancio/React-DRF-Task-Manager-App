import Task from "../task/task";
import { getTasks, createTask } from "../../services/tasks";
import { useTasks, useTasksDispatch } from "../../store/tasksContext";

import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { GetCSRFToken } from "../../services/getCSRFToken";

import { useEffect } from "react";

export const TaskList = () => {
    const tasks = useTasks() || [];
    const tasksDispatch = useTasksDispatch();
    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    // Get CSRF token
    useEffect(() => {
        GetCSRFToken({csrfToken, csrfTokenSetter});
        refreshTasks(csrfToken);
    }, []);

    const refreshTasks = () => {
        getTasks()
        .then((_tasks) => {
            console.log(_tasks);
            sortTasksByDeadline(_tasks);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const sortTasksByDeadline = (_tasks) => {
        const sortedTasks = [..._tasks].sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
        tasksDispatch({
            type: 'resetTasks',
            tasks: sortedTasks,
        });
    };

    const handleCreateNewTask = (e) => {
        e.preventDefault();
        
        const newTask = {
            'title': 'Empty Task',
            'description': 'Give this new task a description',
            'deadline': new Date().toISOString().slice(0, 10),
            'completed': false,
        };

        // create task in database
        createTask(newTask, csrfToken)
        .then((res) => {
            console.log("Created new task: " + res);            
            tasksDispatch({
                'type': 'createTask',
                'task': res,
            });
        })
        .catch((err) => console.error(err));
    };

    const renderTasks = () => {
        return tasks.map((task) => (
            <Task key={task.id} 
                task={task} ></Task>
        ));
    };

    return (
        <div className="d-flex flex-column col-md-12 col-lg-6 text-center">
            <h1 className="mt-5 my-3 pt-5">
                <strong>
                    Your Tasks
                </strong>
            </h1>
            <div className="d-flex flex-row justify-content-center my-3">
                <div className="d-flex flex-column col-3">
                    <button title="Create new task" onClick={handleCreateNewTask} >Create New Task</button>
                </div>
            </div>
            {renderTasks()}
        </div>
    );
};