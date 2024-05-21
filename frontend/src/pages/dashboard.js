import Layout from "../components/Layout";
import Card from "../components/card/card";

import { getTasks, createTask, editTask, deleteTask } from "../services/tasks";
import { useTasks, useTasksDispatch } from "../store/tasksContext";
import { useContext, useEffect } from "react";



const DashboardPage = () => {

    const tasks = useTasks();
    const tasksDispatch = useTasksDispatch();

    const refreshTasks = () => {
        getTasks()
        .then((_tasks) => {
            tasksDispatch({
                type: 'resetTasks',
                tasks: _tasks,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <Layout>
            <div className='container-fluid d-flex vh-100'>
                <div className="d-flex flex-column col-12 text-center">
                    <h1 className="my-5">
                        <strong>
                            Todo List
                        </strong>
                    </h1>
                    <div className="my-2">

                        <Card>
                            <div className="d-flex flex-column col-12 py-3 px-4">
                                <div className="d-flex flex-row justify-content-between">
                                    <h2 id="taskTitle">Go grocery shopping.</h2>
                                    <p id="taskDeadline">
                                        <strong>
                                            March 15th    
                                        </strong>
                                    </p>
                                </div>
                                <div id="taskDescriptionContainer" className="d-flex flex-row">
                                    <div className="d-flex flex-columm col-12">
                                        <p id="taskDescription"> Get food from the super market so that you can have food to cook and eat so you don't die of starvation. </p>
                                    </div>
                                </div>


                                <div id="subtasksContainer" className="d-flex flex-row p-3">
                                    <div className="d-flex flex-column col-12 align-items-start">
                                        <ul style={{width: 100 + "%",}}>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="my-2">

                        <Card>
                            <div className="d-flex flex-column col-12 py-3 px-4">
                                <div className="d-flex flex-row justify-content-between">
                                    <h2 id="taskTitle">Go grocery shopping.</h2>
                                    <p id="taskDeadline">
                                        <strong>
                                            March 15th    
                                        </strong>
                                    </p>
                                </div>
                                <div id="taskDescriptionContainer" className="d-flex flex-row">
                                    <div className="d-flex flex-columm col-12">
                                        <p id="taskDescription"> Get food from the super market so that you can have food to cook and eat so you don't die of starvation. </p>
                                    </div>
                                </div>


                                <div id="subtasksContainer" className="d-flex flex-row p-3">
                                    <div className="d-flex flex-column col-12 align-items-start">
                                        <ul style={{width: 100 + "%",}}>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    
                    <div className="my-2">

                        <Card>
                            <div className="d-flex flex-column col-12 py-3 px-4">
                                <div className="d-flex flex-row justify-content-between">
                                    <h2 id="taskTitle">Go grocery shopping.</h2>
                                    <p id="taskDeadline">
                                        <strong>
                                            March 15th    
                                        </strong>
                                    </p>
                                </div>
                                <div id="taskDescriptionContainer" className="d-flex flex-row">
                                    <div className="d-flex flex-columm col-12">
                                        <p id="taskDescription"> Get food from the super market so that you can have food to cook and eat so you don't die of starvation. </p>
                                    </div>
                                </div>


                                <div id="subtasksContainer" className="d-flex flex-row p-3">
                                    <div className="d-flex flex-column col-12 align-items-start">
                                        <ul style={{width: 100 + "%",}}>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                            <li  style={{width: 100 + "%"}}>
                                                <div id="subtask1Container" className="d-flex flex-row justify-content-between" style={{width: 100 + "%"}}>
                                                        <h5 id="subtask1Title">Number 1</h5>
                                                        <p id="subtask1Deadline">February 12th</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DashboardPage;