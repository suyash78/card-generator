import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Typography, Box, Tooltip, Fab, makeStyles } from '@material-ui/core';
import { useStoreActions, useStoreState } from '../userStore/userStore';

export default function UserCardList() {

    const userListRef = useStoreState(state => state.userList);

    const deleteClick = useStoreActions((action) =>  action.deleteUser );
    const editClick = useStoreActions((action) => action.editUser );

    const styleClass = useStyles();

    return (

        // User Card List Component 
        <div>
            {(userListRef.length) > 0 ? (
                userListRef.map(userRef => {
                    return(
                        
                        <div key={userRef.id}>
                            <Box p={2} borderRadius={10} mb={2} className={styleClass.boxStyle}>
                                <Typography variant='h6' className={styleClass.textStyle}> Name : {userRef.name}  |</Typography>
                                <Typography variant='h6' className={styleClass.textStyle}>  Age : {userRef.age}  |</Typography>
                                <Typography variant='h6' className={styleClass.textStyle}>  Gender : {userRef.gender}  </Typography>
                                <Box mx={2} display='inline'>
                                    <Tooltip title="Edit" aria-label="edit">
                                        <Fab onClick={() => editClick(userRef.id)} className={styleClass.editStyle} >
                                            <EditIcon />
                                        </Fab>
                                    </Tooltip>
                                </Box>
                                <Tooltip title="Delete" aria-label="delete">
                                    <Fab color='secondary' onClick={() => deleteClick(userRef.id)} >
                                        <DeleteIcon />
                                    </Fab>
                                </Tooltip>
                                    
                            </Box>
                        </div>

                    );
                })
            ) : (
                <Box p={2} borderRadius={10} mb={2} className={styleClass.boxStyle}><Typography>No Cards Present</Typography></Box>
            )}
        </div>
    );
}

const useStyles = makeStyles({
    boxStyle: { backgroundColor:'#d8f3dc' },
    textStyle: { display:'inline' },
    editStyle: {
        backgroundColor:"#ee9b00",
        color:"#fff"
    }
});