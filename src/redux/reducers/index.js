import { combineReducers } from "redux";
import newTasks from './tasksReducer';

const rootReducer = combineReducers({
    newTasks
});

export default rootReducer;