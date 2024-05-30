import Layout from "../components/layout/Layout";
import Task from "../components/task/task";
import { useContext, useEffect } from "react";

import { getTasks, createTask, deleteTask } from "../services/tasks";
import { useTasks, useTasksDispatch } from "../store/tasksContext";

import { useCSRFToken, useCSRFTokenSetter } from "../store/csrfContext";
import { GetCSRFToken } from "../services/getCSRFToken";



const DashboardPage = () => {

    const tasks = useTasks();
    const tasksDispatch = useTasksDispatch();

    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    // Get CSRF token
    useEffect(() => {
        GetCSRFToken({csrfToken, csrfTokenSetter});
        refreshTasks(csrfToken);
    }, [])

    // // Get tasks once CSRF token is set
    // useEffect(() => {
    // }, [csrfToken]);

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
        <Layout>
            <div className='container-fluid d-flex  justify-content-center'>
                <div className="d-flex flex-column col-md-12 col-lg-6 text-center">
                    <h1 className="mt-5 my-3 pt-5">
                        <strong>
                            Todo List
                        </strong>
                    </h1>
                    <div className="d-flex flex-row justify-content-center my-3">
                        <div className="d-flex flex-column col-3">
                            <button title="Create new task" onClick={handleCreateNewTask} >Create New Task</button>
                        </div>
                    </div>
                    {renderTasks()}
                </div>
            </div>
        </Layout>
    );
}

export default DashboardPage;