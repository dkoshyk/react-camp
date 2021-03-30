import { Button, Card, CardActions, CardContent, Grid, makeStyles, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import { deleteTask } from "../../api/TasksApi";
import { Link } from 'react-router-dom';
import { getTaskTypeLabel } from "../../constants/TaskTypes";
import ConfirmDialog from "../shared/dialog/ConfirmDialog";
import { useGetTaskList } from '../../hooks/useGetTaskList';

const useStyles = makeStyles({
    card: {
        marginTop: 10
    }
});

export default function TaskList() {
    const classes = useStyles();
    const [pageSize] = useState(5);
    const [page, setPage] = useState(1);
    const [containsTitle, setContainsTitle] = useState('');
    const { taskList, count, forceUpdate } = useGetTaskList({ pageSize, page, containsTitle });

    const handlePageChange = (event, value) => {
        console.log(event);
        setPage(value);
    };

    const handleDeleteTask = async (event, value) => {
        await deleteTask(value);
        forceUpdate();
    }

    return (
        <div>
            <Grid container direction="row" justify="space-between" alignItems="baseline">
                <Button component={Link} to="/tasks/create" variant="contained" color="primary">Create</Button>
                <TextField size="small" label="search title" variant="outlined" onChange={e => setContainsTitle(e.target.value)} />
                <Pagination count={Math.ceil(count / pageSize)} page={page} onChange={handlePageChange} />
            </Grid>
            {taskList.map((task) =>
                <div key={task.id}>
                    <Card className={classes.card}>
                        <CardContent>

                            <Grid container spacing={3}>
                                <Grid item xs={6}> <strong>{task.title}</strong></Grid>
                                <Grid item xs={6}> {getTaskTypeLabel(task.type)} </Grid>
                            </Grid>

                            {
                                task.description ?
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}> {task.description} </Grid>
                                    </Grid>
                                    : ''
                            }

                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={`/tasks/${task.id}/edit`} variant="outlined" color="primary" size="small">Edit</Button>
                            <ConfirmDialog buttonName="Delete" buttonColor="secondary" questionText="Do you agree to delete task?"
                                onAgreeAction={(e) => handleDeleteTask(e, task.id)}
                            ></ConfirmDialog>
                        </CardActions>
                    </Card>
                </div>)}
        </div>
    );
}