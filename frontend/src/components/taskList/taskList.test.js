import Task from "../task/task";
import { getTasks, createTask } from "../../services/tasks";

import { TasksContext, TasksDispatchContext, TasksProvider, tasksReducer } from "../../store/tasksContext";
import { CSRFTokenContext, SetCSRFTokenContext } from "../../store/csrfContext";
import { GetCSRFToken } from "../../services/getCSRFToken";

import { ThemeContext } from "../../store/themeContext";
import { TaskList } from "./taskList";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useReducer } from "react";
import { wait } from "@testing-library/user-event/dist/utils";

// Mock the getTasks and createTask API service calls
jest.mock("../../services/tasks", () => ({
    getTasks: jest.fn(),
    createTask: jest.fn(),
}));

// Mock the GetCSRFToken API service call
jest.mock("../../services/getCSRFToken", () => ({
    GetCSRFToken: jest.fn(),
}));

describe("Task List Component", () => {

    // Mock CSRF Token setter function
    const mockCSRFTokenSetter = jest.fn();

    // // Mock Tasks Dispatch function
    // const mockTasksDispatch = jest.fn();

    let testTask1 = {
        'title': 'Test Task 1',
        'description': 'Test description 1',
        'deadline': new Date().toISOString().slice(0, 10),
        'completed': false,
        'subtasks': [],
    };

    let testTask2 = {
        'title': 'Test Task 2',
        'description': 'Test description 2',
        'deadline': new Date().toISOString().slice(0, 9),
        'completed': false,
        'subtasks': [],
    };

    let testTasks = [];

    beforeEach(() => {
        jest.clearAllMocks();

        testTasks = [testTask1];
    });


    const renderTaskList = () => {

        return render(
            <ThemeContext.Provider value={'light'}>
                <CSRFTokenContext.Provider value={null}>
                    <SetCSRFTokenContext.Provider value={mockCSRFTokenSetter}>
                        <TasksProvider>
                            <TaskList />
                        </TasksProvider>
                    </SetCSRFTokenContext.Provider>
                </CSRFTokenContext.Provider>
            </ThemeContext.Provider>
        );
    };

    it("Fetches tasks upon page load", async () => {
        testTasks = [...testTasks, testTask2];

        getTasks.mockImplementation(() => Promise.resolve(testTasks))
        
        renderTaskList([]);
        
        // Check that the getTasks service call is made on mount
        await waitFor(() => {
            expect(getTasks).toHaveBeenCalled();
        });

        expect(GetCSRFToken).toHaveBeenCalledTimes(1);

        // Check that create-task button renders correctly
        expect(screen.getByRole("button", { name: "Create New Task"} )).toBeInTheDocument();
       
        // Check that first sample task renders correctly
        expect(screen.getByText(testTask1.title)).toBeInTheDocument();
        expect(screen.getByText(testTask1.description)).toBeInTheDocument();
        expect(screen.getByText(testTask1.deadline)).toBeInTheDocument();

        // Check that second sample task renders correctly
        expect(screen.getByText(testTask2.title)).toBeInTheDocument();
        expect(screen.getByText(testTask2.description)).toBeInTheDocument();
        expect(screen.getByText(testTask2.deadline)).toBeInTheDocument(); 
    });

    it("Correctly handles the click of the create-task button", async () => {
        
        const newTask = {
            'id': 11,
            'title': 'Newly Created Task',
            'description': 'Give this new task a description',
            'deadline': new Date().toISOString().slice(0, 10),
            'completed': false,
            'subtasks': [],
        };
        
        getTasks.mockImplementation(() => Promise.resolve(testTasks));
        createTask.mockImplementation(() => Promise.resolve(newTask));

        renderTaskList([]);

        const createTaskBtn = screen.getByRole("button", { name: "Create New Task"});
        
        fireEvent.click(createTaskBtn);

        await waitFor(() => {
            expect(createTask).toHaveBeenCalled();
        });
        
        expect(screen.getByText("Newly Created Task")).toBeInTheDocument();
        expect(screen.getByText("Give this new task a description")).toBeInTheDocument();
    });
});