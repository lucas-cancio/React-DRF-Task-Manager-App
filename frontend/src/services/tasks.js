import axios from "axios";

const getTasks = () => {

    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/api/tasks/")
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}

const createTask = (_task, csrfToken) => {

    const task = {
        'title': _task.title,
        'description': _task.description,
        'deadline': _task.deadline,
        'completed': _task.completed,
    };

    const subtasks = _task.subtasks;

    return new Promise((resolve, reject) => {
        axios.post("http://locallhost:8000/api/tasks/", 
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    })
}

const editTask = (_task, csrfToken) => {

    const task = {
        'id': _task.id,
        'title': _task.title,
        'description': _task.description,
        'deadline': _task.deadline,
        'completed': _task.completed,
    };

    const subtasks = _task.subtasks;

    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8000/api/tasks/${task.id}/`,
            task,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });

}

const deleteTask = (taskID, csrfToken) => {

    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/api/tasks/${taskID}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                withCredentials: true,
            }
        )
        .then((res) => resolve(console.log(res)))
        .catch((err) => reject(err));
    })
}

export {getTasks, createTask, editTask, deleteTask};