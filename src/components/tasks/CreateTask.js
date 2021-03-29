import { Button, Card, CardContent, Grid, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core";
import { useContext, useState } from "react";
import { createTask } from "../../api/TasksApi";
import { taskTypes } from "../../constants/TaskTypes";
import { SnackbarContext } from "../shared/snackbar/SnackbarContext";
import { Link, useHistory } from 'react-router-dom';
import { taskAdded } from "../../redux/actions/tasksActions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
    textField: {
        'marginBottom': 10
    },
    cardTitle: {
        marginBottom: 10
    }
}));

function CreateTask({ taskAdded }) {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('');
    const [type, setType] = useState('task');
    const [description, setDescription] = useState('');
    const { showErrors, showSuccess } = useContext(SnackbarContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const task = await createTask({ name, description, type });
            taskAdded(task);
            showSuccess();
            history.push('/tasks')
        } catch (error) {
            showErrors(error.response);
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography className={classes.cardTitle}>Create Task</Typography>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <TextField label='Name' variant="outlined" className={classes.textField}
                            onChange={e => setName(e.target.value)}
                            value={name}
                            fullWidth>
                        </TextField>
                        <TextField label="Type" variant="outlined" className={classes.textField}
                            select
                            fullWidth
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            {
                                taskTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField label="Description" variant="outlined" className={classes.textField} fullWidth
                            multiline
                            rowsMax={4}
                            onChange={e => setDescription(e.target.value)}
                        >

                        </TextField>
                    </div>

                    <div>
                        <Grid container justify="space-between">
                            <Button type='submit' variant='contained' color='primary'>
                                Create
                            </Button>
                            <Button component={Link} to={'/tasks'} variant='outlined' color='primary'>
                                Cancel
                            </Button>
                        </Grid>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default connect(null, { taskAdded })(CreateTask);