import { useEffect, useState } from "react";
import { getPublicTasks } from "../api/TasksApi";

export function useGetTaskList({ pageSize, page, containsTitle }) {
    const [taskList, setTaskList] = useState([]);
    const [count, setCount] = useState(0);
    const [state, setState] = useState(0);
    const forceUpdate = () => setState(state + 1);

    useEffect(() => {
        (async () => {
            let result = await getPublicTasks({ pageSize, page, containsTitle });
            setTaskList(result.items);
            setCount(result.count);
        })()
    }, [page, pageSize, containsTitle, state])

    return { taskList, count, forceUpdate }
}