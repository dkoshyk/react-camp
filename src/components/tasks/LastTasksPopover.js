import { Badge, Box, Button, List, ListItem, ListItemText, makeStyles, Popover, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

function LastTasksPopover({ newTasks }) {
    const classes = useStyles();
    const [isTaskPopoverOpen, setIsTaskPopoverOpen] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const tasks = newTasks;

    function onPopoverButtonClick(event) {
        if (!popoverAnchor)
            setPopoverAnchor(event.currentTarget);
        setIsTaskPopoverOpen(true);
    }

    return (
        <>
            <Badge badgeContent={tasks.length} color="secondary" className={classes.menuButton}>
                <Button onClick={onPopoverButtonClick} variant="contained"> Show new tasks </Button>
            </Badge>
            <Popover anchorEl={popoverAnchor}
                open={isTaskPopoverOpen}
                onClose={() => setIsTaskPopoverOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                {tasks && tasks.length
                    ?
                    <List>
                        {tasks.map(task =>
                            <ListItem key={task.id}>
                                <ListItemText primary={task.title} secondary={task.description} />
                            </ListItem>
                        )}
                    </List>
                    :
                    <Box p={1}>
                        <Typography>Task notification list is empty</Typography>
                    </Box>
                }
            </Popover>
        </>
    );
}

export default connect(({ newTasks }) => ({ newTasks }))(LastTasksPopover);