import React , { FormEvent, useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, OutlinedInput, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@material-ui/core';
import userStore, { useStoreActions, useStoreState } from '../userStore/userStore';
import { UserData } from '../userStore/interfaces';

export default function UserForm() {
    
    const addData = useStoreActions((action) =>  action.addUser );
    const updateData = useStoreActions((action) => action.updateUser );
    const clearEdit = useStoreActions((action) => action.clear);

    const editData = useStoreState( state => state.editUserData );

    const [userInfo, setUserInfo] = useState<UserData>({ id : 0 , name : '' , age : 0 , gender : '' });

    useEffect(() => {
        if(editData !== undefined) {
            setUserInfo(editData);
        }
    }, [editData]);

    const handleSubmit = (event : FormEvent) => {

        event.preventDefault();

        if(editData !== undefined) {
            updateData(userInfo);
            clearEdit(undefined);
        } else {
            addData(userInfo);
        }

        setUserInfo({ id : (userStore.getState().userList.length) , name : '' , age : 0 , gender : '' });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name , value } = event.target;
        setUserInfo({...userInfo , [name] : value});
    }
    
    return (
        <>
                {/* User Form component */}
                <Box p={3} borderRadius={15} boxShadow={3} style={{backgroundColor:"#fff"}}>
                    <form onSubmit={handleSubmit}>
                        <FormControl variant="outlined" color='secondary' style={{display:'block', marginBottom:'20px'}}>
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput id="component-outlined" value={userInfo.name} onChange={handleChange} name="name" label="Name" required />
                        </FormControl>
                        <FormControl variant="outlined" color='secondary' style={{display:'block', marginBottom:'20px'}}>
                            <InputLabel htmlFor="component-outlined">Age</InputLabel>
                            <OutlinedInput id="component-outlined" value={userInfo.age} onChange={handleChange} name="age" label="Age" />
                        </FormControl>
                        <FormControl component="fieldset" style={{display:'block', marginBottom:'20px'}}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={userInfo.gender} onChange={handleChange}>
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <Button fullWidth type="submit" style={{backgroundColor:"#4caf50", color:"#fff"}} size="large" variant="contained" className="userForm-card-btn">
                            {(editData === undefined) ? 'Add' : 'Update' }
                        </Button>
                    </form>
                </Box>
        </>
    );
}


