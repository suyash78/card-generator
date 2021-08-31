import React , { useState, useEffect } from 'react';
import userStore, { useStoreActions, useStoreState } from '../userStore/userStore';
import { UserData } from '../userStore/interfaces';
import { IFormActionProps, ReactForm } from 'react-forms';
import { Box, makeStyles, useMediaQuery } from '@material-ui/core';
import { FormikHelpers } from 'formik';

export default function UserForm() {
    
    const addData = useStoreActions((action) =>  action.addUser );
    const updateData = useStoreActions((action) => action.updateUser );
    const clearEdit = useStoreActions((action) => action.clear);

    const editData = useStoreState( state => state.editUserData );

    const [userInfo, setUserInfo] = useState<UserData>({ id : 0 , name : '' , age : '' , gender : '' });

    useEffect(() => {
        if(editData !== undefined) {
            setUserInfo(editData);
        }
    }, [editData]);

    const styleClass = useStyles();
    const mediaQueryMatch = useMediaQuery('(min-width:600px)');

    const actionConfig : IFormActionProps = {
        submitButtonText: (editData === undefined) ? 'Add' : 'Update',
        submitButtonLayout: 'center',
        submitButtonProps: {
            size: 'large',
            fullWidth: true,
            color: 'secondary',
        },      
    };
     
    const formConfig = [{
            type : 'text',
            valueKey : 'name',
            
            fieldProps : { label : 'Name' , fullWidth: true , className: styleClass.bottomMargin , color: 'secondary', } ,
        },
        {
            type : 'text',
            valueKey : 'age',
            fieldProps : { label : 'Age' , fullWidth: true , className: styleClass.bottomMargin , color: 'secondary', } ,
        },
        {
            type: 'mui-plain-text',
            valueKey: 'gender-title',
            fieldProps:{
                isTextHtmlString: false, 
                text: "Gender :",
            }
        },
        {
            type : 'radio' ,
            valueKey : 'gender' ,
            fieldProps : {
                options : [
                    {name : 'Female' , value : 'Female'} , 
                    {name : 'Male' , value : 'Male'} , 
                    {name : 'Others' , value : 'Others'}
                ],
                label : 'Gender',
                className: styleClass.bottomMargin
            }
        }];
     


    const handleSubmit = ( values : UserData , onSubmitProps: FormikHelpers<UserData> ) => {
        
        if(editData !== undefined) {
            updateData(values);
            clearEdit(undefined);
        } else {
            addData(values);
        }

        setUserInfo({ id : (userStore.getState().userList.length) , name : '' , age : '' , gender : '' }); 
        onSubmitProps.setSubmitting(false);

    }

    return (
        <>
            {/* User Form component */}
                
            <Box display='flex' justifyContent='center' alignItems='center' minHeight={mediaQueryMatch ? '100vh' : '500px'}  >
                <Box p={4} borderRadius={15} boxShadow={3} className={styleClass.basicBoxStyle}>

                    <ReactForm
                    formId='userForm'
                    actionConfig={actionConfig}
                    config={formConfig}
                    initialValues={userInfo}
                    onSubmit = {handleSubmit} 
                    enableReinitialize 
                    />

                </Box>
            </Box>
        </>
    );
}

const useStyles = makeStyles({
    basicBoxStyle: {
        background: '#fff',
        width: '90%',
        maxWidth: '400px',
        margin: 'auto'
    },
    bottomMargin: {
        marginBottom: '20px'
    }
});