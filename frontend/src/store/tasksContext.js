import { createContext, useContext, useReducer } from "react";

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({children}) {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useTasks() {
    return useContext(TasksContext);
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}


export function tasksReducer(tasks, action) {

    switch(action.type) {
        case 'resetTasks': {
            return action.tasks;
        }
        case 'createTask': {
            return [...tasks, action.task];
        }
        case 'editTask': {
            return tasks.map((task) => {
                if (task.id == action.task.id) {
                    return {
                        'id': task.id,
                        'title': action.task.title,
                        'description': action.task.description,
                        'deadline': action.task.deadline,
                        'completed': action.task.completed,
                        'subtasks': action.task.subtasks,
                    }
                } else {
                    return task;
                }
            });
        }
        case 'deleteTask': {
            return tasks.filter(task => task.id !== action.id);
        }
        case 'createSubtask': {
            return tasks.map((task) => {

                if (task.id !== action.subtask.parentTask) {
                    return task;
                }

                if (task.subtasks.includes(action.subtask)) return task;

                let editedTask = task;
                editedTask.subtasks = [...task.subtasks, action.subtask];
                return editedTask;
            });
        }
        case 'editSubtask': {
            if (action.subtask == null) {
                console.log("Subtask not provided.");
                return tasks;
            }

            return tasks.map((task) => {
                if (task.id !== action.subtask.parentTask) {
                    return task;
                } 
                let editedTask = task;
                editedTask.subtasks = editedTask.subtasks.map((subtask) => {
                    if (subtask.id !== action.subtask.id) {
                        return subtask;
                    }
                    return action.subtask;
                });
                return editedTask;
            });
        }
        case 'deleteSubtask': {
            return tasks.map((task) => {
                if (task.id !== action.subtask.parentTask) {
                    return task;
                }
                let editedTask = task;
                editedTask.subtasks = editedTask.subtasks.filter((subtask) => subtask.id !== action.subtask.id);
                return editedTask;
            });
        }
        default: {
            return tasks;
        }
    }
};