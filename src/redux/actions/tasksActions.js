import { TASKS_ADDED_ACTION } from "./actionTypes";

export function taskAdded(task) {
    return { type: TASKS_ADDED_ACTION, task }
}