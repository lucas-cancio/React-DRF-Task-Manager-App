import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

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


function tasksReducer(tasks, action) {

    switch(action.type) {
        case 'resetTasks': {
            return action.tasks;
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
        case 'createTask': {
            return [...tasks, action.task];
        }
        case 'deleteTask': {
            return tasks.filter(task => task.id != action.id);
        }
        default: {
            return tasks;
        }
    }
}

// Task
    // ID, Title, Description, Deadline, Completed
    // Subtasks[]
        // ID, Title, Description, Deadline, Completed