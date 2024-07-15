import api from "../axios";
import { getTasks, createTask, editTask, deleteTask, createSubtask, deleteSubtask, editSubtask } from "../tasks";

describe("API Service Calls Related to Tasks", () => {

    const mockCSRFToken = "dummyToken";

    it("Correctly performs the API call to retrieve the tasks", async () => {

        const mockTasks = [
            { title: "task 1"},
            { title: "task 2"}
        ];

        const mockAPIGET = jest
            .spyOn(api, "get")
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    data: mockTasks,
                });
            });
        
            await expect(getTasks(mockCSRFToken)).resolves.toBe(mockTasks);
            expect(mockAPIGET).toHaveBeenLastCalledWith("/api/tasks/", {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });

    it("Correctly performs the API call to create a task", async () => {

        const mockTask = { title: "task 1"};

        const mockAPIPOST = jest
            .spyOn(api, "post")
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    data: mockTask,
                });
            });
        
        await expect(createTask(mockTask, mockCSRFToken)).resolves.toBe(mockTask);
        expect(mockAPIPOST).toHaveBeenLastCalledWith("/api/tasks/", 
            mockTask,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });

    it("Correctly performs the API call to edit a task", async () => {
        const mockTask = { 
            id: 3,
            title: "task 1",
        };

        const mockAPIPUT = jest
            .spyOn(api, "put")
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    data: mockTask,
                });
            });

        await expect(editTask(mockTask, mockCSRFToken)).resolves.toBe(mockTask);
        expect(mockAPIPUT).toHaveBeenLastCalledWith(`/api/tasks/${mockTask.id}/`,
            mockTask,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });

    it("Correctly performs the API call to delete a task", async () => {
        const mockTaskID = 3;

        const fakeResponse = {
            status: 200,
            statusText: "Successfully deleted task",
        };

        const mockAPIDELETE = jest
            .spyOn(api, "delete")
            .mockImplementationOnce(() => {
                return Promise.resolve(fakeResponse);
            });

        await expect(deleteTask(mockTaskID, mockCSRFToken)).resolves.toBe(fakeResponse);
        expect(mockAPIDELETE).toHaveBeenLastCalledWith(`/api/tasks/${mockTaskID}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });

    it("Correctly performs the API call to create a subtask", async () => {

        const mockSubtask = {
            parentTask: 4,
            id: 6,
            title: "Fake subtask",
        };

        const mockAPIPOST = jest
            .spyOn(api, "post")
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    data: mockSubtask
                });
            });

        await expect(createSubtask(mockSubtask, mockCSRFToken)).resolves.toBe(mockSubtask);
        expect(mockAPIPOST).toHaveBeenLastCalledWith("/api/subtasks/", 
            mockSubtask,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            })
    });

    it("Correctly performs the API call to delete a subtask", async () => {
        const subtaskID = 5;

        const fakeResponse = {
            status: 200,
            statusText: "Successfully deleted task",
        };

        const mockAPIDELETE = jest
            .spyOn(api, "delete")
            .mockImplementationOnce(() => {
                return Promise.resolve(fakeResponse);
            });

        await expect(deleteSubtask(subtaskID, mockCSRFToken)).resolves.toBe(fakeResponse);
        expect(mockAPIDELETE).toHaveBeenLastCalledWith(`/api/subtasks/${subtaskID}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });

    it("Correctly performs the API call to edit a subtask", async () => {
        const fakeSubtask = {
            parentTask: 5,
            id: 8,
            title: "Changed title",
        };

        const mockAPIPUT = jest
            .spyOn(api, "put")
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    data: fakeSubtask,
                });
            });

        await expect(editSubtask(fakeSubtask, mockCSRFToken)).resolves.toBe(fakeSubtask);
        expect(mockAPIPUT).toHaveBeenLastCalledWith(`/api/subtasks/${fakeSubtask.id}/`,
            fakeSubtask,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": mockCSRFToken,
                    "Require-Auth": true,
                },
                withCredentials: true,
            });
    });
});