import { useState, useEffect } from "react";

import "./task.css";
import Card from "../card/card";
import Subtask from "../subtask/subtask";

import { useTasksDispatch } from "../../store/tasksContext";
import { useCSRFToken, useCSRFTokenSetter } from "../../store/csrfContext";
import { GetCSRFToken } from "../../services/getCSRFToken";
import { editTask, editSubtask, createSubtask, deleteSubtask } from "../../services/tasks";


export default function Task({task, handleDeleteTask}) {

    const tasksDispatch = useTasksDispatch();
    const csrfToken = useCSRFToken();
    const csrfTokenSetter = useCSRFTokenSetter();

    const [completed, setCompleted] = useState(task.completed);
    const [subtasksEdited, setSubtasksEdited] = useState([]);
    const [inEditMode, setInEditMode] = useState(false);

    // Get CSRF token
    useEffect(() => {
        GetCSRFToken({csrfToken, csrfTokenSetter});
    }, []);

    const handleChangeTitle = (event) => {
        event.preventDefault();

        const editedTask = task;
        editedTask.title = event.target.value;
        tasksDispatch({
            'type': 'editTask',
            'task': editedTask,
        });
    };

    const handleChangeDeadline = (event) => {
        event.preventDefault();

        const editedTask = task;
        editedTask.deadline = event.target.value;
        tasksDispatch({
            'type': 'editTask',
            'task': editedTask,
        });
    };

    const handleChangeDescription = (event) => {
        event.preventDefault();

        const editedTask = task;
        editedTask.description = event.target.value;
        tasksDispatch({
            'type': 'editTask',
            'task': editedTask,
        });
    };

    const handleChangeCompleted = (event) => {

        const editedTask = task;
        editedTask.completed = event.target.checked;
        
        editTask(editedTask, csrfToken)
        .then((res) => {
            tasksDispatch({
                'type': 'editTask',
                'task': editedTask,
            });
        })
        .catch((err) => console.error(err));
    };


    const handleDeleteTaskBtnClick = (event) => {
        event.preventDefault();
        handleDeleteTask(task.id);
    };
    
    const toggleEditMode = (event) => {
        event.preventDefault();
        
        if (inEditMode) {
            
            // update subtasks in database
            task.subtasks.forEach((subtask) => {
                if (subtasksEdited.includes(subtask.id)) {
                    editSubtask(subtask, csrfToken)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                }
            });
            
            // update task in database
            editTask(task, csrfToken)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            
            setSubtasksEdited([]);
        }
        setInEditMode(!inEditMode);
    };

    /* Subtask Handler Functions */

    const handleCreateSubtask = (event) => {
        event.preventDefault();

        let newSubtask = {
            'parentTask': task.id,
            'title': "Edit title",
            'completed': false,
            'deadline': new Date().toISOString().slice(0, 10),
            'description': "Edit description",
        }

        createSubtask(newSubtask, csrfToken)
        .then((res) => {
            console.log(res);
            const editedTask = task;
            editedTask.subtasks.push(res);
            tasksDispatch({
                'type': 'editTask',
                'task': editedTask,
            });
        })
        .catch((err) => console.log(err));
    };

    const handleDeleteSubtask = (subtaskID) => {
        deleteSubtask(subtaskID, csrfToken)
        .then((res) => {
            const editedTask = task;
            editedTask.subtasks = editedTask.subtasks.filter(subtask => subtask.id != subtaskID);
            tasksDispatch({
                'type': 'editTask',
                'task': editedTask,
            });
        })
        .catch((err) => console.error(err));
    };

    const handleEditSubtask = (
            subtaskID,
            subtaskTitle,
            subtaskCompleted,
            subtaskDeadline,
            subtaskDescription,
            immediate=false,
        ) => {

        let doUpdateTaskState = true;

        if (immediate) {
            const editedSubtask = {
                'id': subtaskID,
                'title': subtaskTitle,
                'completed': subtaskCompleted,
                'deadline': subtaskDeadline,
                'description': subtaskDescription,
                'parentTask': task.id,
            };
            editSubtask(editedSubtask, csrfToken)
            .then((res) => console.log(res))
            .catch((err) => {
                console.error(err);
                doUpdateTaskState = false;
            })
        } else if (!subtasksEdited.includes(subtaskID)) {
            subtasksEdited.push(subtaskID);
        }

        if (!doUpdateTaskState) 
            return;

        const editedTask = task;
        editedTask.subtasks = editedTask.subtasks.map((subtask) => {
            if (subtask.id == subtaskID) {
                return {
                    'parentTask': task.id,
                    'id': subtaskID,
                    'title': subtaskTitle,
                    'completed': subtaskCompleted,
                    'deadline': subtaskDeadline,
                    'description': subtaskDescription,
                };
            } else {
                return subtask;
            }
        });
        tasksDispatch({
            'type': 'editTask',
            'task': editedTask,
        });
    };

    const renderSubtasks = () => {
        return task.subtasks.map((subtask) => (
                <li key={subtask.id} style={{width: 100 + "%", listStyle: 'none'}}>
                    <Subtask 
                        subtask={subtask} 
                        handleEditSubtask={handleEditSubtask} 
                        handleDeleteSubtask={handleDeleteSubtask}
                        inEditMode={inEditMode} />
                </li>
        ));
    };

    return (
        <div key={task.id} className="my-2">
                <Card>
                    <form id={`task-#${task.id}-form`}>

                        <div className="d-flex flex-column col-12 py-3 px-4">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center">
                                        {inEditMode ? (
                                            <>
                                                <label>Task Title</label>
                                                <input form={`task-#${task.id}-form`} value={task.title} onChange={handleChangeTitle}></input>
                                            </>
                                        ) : (
                                            <>
                                                <input className="big-checkbox mx-2" type="checkbox" checked={task.completed} onChange={handleChangeCompleted}></input>
                                                <h2 className="taskTitle">{task.title}</h2>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <p className="taskDeadline">
                                            {inEditMode ? (
                                                <>
                                                    <label>Deadline</label>
                                                    <input form={`task-#${task.id}-form`} type="date" value={task.deadline} onChange={handleChangeDeadline}></input>
                                                </>
                                            ): (
                                                <strong>
                                                    {task.deadline}    
                                                </strong>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="taskDescriptionContainer d-flex flex-row mt-3 ms-4">
                                <div className="d-flex flex-columm col-12">
                                    {inEditMode ? (
                                        <>
                                            <label>Task Description</label>
                                            <input form={`task-#${task.id}-form`} type="text" value={task.description} onChange={handleChangeDescription}></input>
                                        </>
                                    ) : (
                                        <>
                                            <p className="taskDescription"> {task.description} </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {
                                task.subtasks.length > 0 ? (
                                    <div className="subtasksContainer d-flex flex-row py-2 px-3">
                                        <div className="d-flex flex-column col-12 align-items-start">
                                            <ul style={{width: 100 + "%",}}>
                                                {renderSubtasks(task)}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            
                            <div className="actionItemsContainer d-flex flex-row justify-content-end pb-2 px-3">
                                <div className="mx-2">
                                    <button title="Create new subtask" onClick={handleCreateSubtask}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mx-2">
                                    {inEditMode ? (
                                        <button title="Save changes" onClick={toggleEditMode} style={{backgroundColor: 'green'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                            </svg>
                                        </button>
                                        
                                    ) : (
                                        <button title="Edit task" onClick={toggleEditMode}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                            </svg>
                                        </button>   
                                    )}
                                </div>
                                <div className="mx-2">
                                    <button title="Delete task" onClick={handleDeleteTaskBtnClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
    );
}