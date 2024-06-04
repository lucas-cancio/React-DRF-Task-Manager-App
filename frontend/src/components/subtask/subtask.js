import { useState } from "react";

import { useTasks, useTasksDispatch } from "../../store/tasksContext";
import { useCSRFToken } from "../../store/csrfContext";
import { editSubtask, deleteSubtask } from "../../services/tasks";

import "./subtask.css"
import { useTheme } from "../../store/themeContext";

export default function Subtask({subtask, updateEditedSubtaskList, inEditMode=false}) {

    const tasksDispatch = useTasksDispatch();
    const csrfToken = useCSRFToken();

    const theme = useTheme();

    const handleTitleChange = (event) => {
        event.preventDefault();
        let editedSubtask = {...subtask, title: event.target.value};
        tasksDispatch({
            'type': 'editSubtask',
            'subtask': editedSubtask,
        });
        updateEditedSubtaskList(subtask.id);
    };

    const handleCompletedChange = (event) => {
        let editedSubtask = {...subtask, completed: event.target.checked};
        editSubtask(editedSubtask, csrfToken)
        .then((res) => {
            tasksDispatch({
                'type': 'editSubtask',
                'subtask': res,
            });
        })
        .catch((err) => console.log(err));
    };

    const handleDeadlineChange = (event) => {
        event.preventDefault();
        let editedSubtask = {...subtask, deadline: event.target.value};
        tasksDispatch({
            'type': 'editSubtask',
            'subtask': editedSubtask,
        });
        updateEditedSubtaskList(subtask.id);
    };

    const handleDescriptionChange = (event) => {
        event.preventDefault();
        let editedSubtask = {...subtask, description: event.target.value};
        tasksDispatch({
            'type': 'editSubtask',
            'subtask': editedSubtask,
        });
        updateEditedSubtaskList(subtask.id);
    };

    const handleDeleteSubtask = (event) => {
        event.preventDefault();
        deleteSubtask(subtask.id, csrfToken)
        .then((res) => {
            tasksDispatch({
                'type': 'deleteSubtask',
                'subtask': subtask,
            });
        })
        .catch((err) => console.log(err));
    };

    return (
        <>
        {
            !inEditMode ? (
                <>
                    <div className="subtaskContainer d-flex flex-row justify-content-between mb-2" style={{width: 100 + "%"}}>
                            <div className="d-flex flex-column justify-content-center">
                                <div className="d-flex flex-row">
                                    <input 
                                        className={`subtask-input ${theme} mx-2`} 
                                        type="checkbox" 
                                        checked={subtask.completed} 
                                        onChange={handleCompletedChange}
                                        title="subtask checkbox"
                                        data-testid={`subtask-${subtask.id}-completed-checkbox`}></input>
                                    <h5 className="subtaskTitle m-0" title="subtask title">{subtask.title}</h5>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <p className="subtask1Deadline m-0">{subtask.deadline}</p>
                            </div>
                    </div>
                    <div className="subtaskDescriptionContainer d-flex flex-row ms-5">
                        <div className="d-flex flex-columm col-12">
                            <p className="taskDescription"> {subtask.description} </p>
                        </div>
                    </div>
                </>

            ) : (
                <>
                    <div className="my-3" >
                        <div className="subtaskContainer d-flex flex-row justify-content-between mb-2" style={{width: 100 + "%"}}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <label htmlFor={`subtask-#${subtask.id}-title`}>Subtask Title</label>
                                        <input className={`subtask-input ${theme}`} id={`subtask-#${subtask.id}-title`} type="text" value={subtask.title} onChange={handleTitleChange}></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor={`subtask-#${subtask.id}-deadline`}>Deadline</label>
                                    <input className={`subtask-input ${theme}`} id={`subtask-#${subtask.id}-deadline`} type="date" value={subtask.deadline} onChange={handleDeadlineChange}></input>
                                </div>
                                <div className="">
                                    <button className={`subtask-input ${theme}`} title="Delete subtask" onClick={handleDeleteSubtask}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                        </div>
                        <div className="subtaskDescriptionContainer d-flex flex-row justify-content-between ms-5">
                            <div className="d-flex flex-columm">
                                <label htmlFor={`subtask-#${subtask.id}-description`}>Description</label>
                                <input className={`subtask-input ${theme}`} id={`subtask-#${subtask.id}-description`} type="text" value={subtask.description} onChange={handleDescriptionChange}></input>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </>
    );
}