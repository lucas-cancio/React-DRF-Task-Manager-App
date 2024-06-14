import api from "./axios";

const getTasks = (csrfToken) => {

    return new Promise((resolve, reject) => {
        api.get("/api/tasks/", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
};

const createTask = (_task, csrfToken) => {

    const task = {
        'title': _task.title,
        'description': _task.description,
        'deadline': _task.deadline,
        'completed': _task.completed,
    };

    return new Promise((resolve, reject) => {
        api.post("/api/tasks/", 
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
};

const editTask = (_task, csrfToken) => {

    const task = {
        'id': _task.id,
        'title': _task.title,
        'description': _task.description,
        'deadline': _task.deadline,
        'completed': _task.completed,
    };

    return new Promise((resolve, reject) => {
        console.log("EDIT DISPATCH TASK ID: " + task.id);

        api.put(`/api/tasks/${task.id}/`,
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
};

const deleteTask = (taskID, csrfToken) => {

    return new Promise((resolve, reject) => {
        api.delete(`/api/tasks/${taskID}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
};

const createSubtask = (subtask, csrfToken) => {
    return new Promise((resolve, reject) => {
        api.post("/api/subtasks/", 
            subtask,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
};


const deleteSubtask = (subtaskID, csrfToken) => {

    return new Promise((resolve, reject) => {
        api.delete(`/api/subtasks/${subtaskID}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
};

const editSubtask = (subtask, csrfToken) => {

    return new Promise((resolve, reject) => {
        api.put(`/api/subtasks/${subtask.id}/`,
        subtask,
        {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
                "Require-Auth": true,
            },
            withCredentials: true,
        }
    )
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
    });
};

export {
    getTasks, 
    createTask,
    editTask, 
    deleteTask, 
    createSubtask,
    deleteSubtask,
    editSubtask,
};