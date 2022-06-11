import React, {Dispatch} from "react";
import {Button, Dialog, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {deleteProfile, logoutUser} from "../../redux/actions/userActions";

interface DeleteProfileModalProps {
    open: boolean
    setOpen: (value: boolean) => void;
}

export const DeleteProfileModal = (props: DeleteProfileModalProps) => {
    const {open, setOpen} = props;
    const dispatch: Dispatch<any> = useDispatch();

    async function deleteProfileHandler() {
        await dispatch(deleteProfile());
        dispatch(logoutUser());
    }

    function cancelDeleteHandler() {
        setOpen(!open)
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(!open)}>
                <div style={{padding: '3vmax 5vmax'}}>
                    <Typography variant={"h5"} style={{marginBottom: '2vmax'}}>Delete Profile</Typography>
                    <Typography variant={"body1"}>Are you sure you want to delete your theSocial Profile?</Typography>
                    <Typography variant={"body2"} style={{color: 'gray'}}>This operation is permanent and cannot be
                        undone! You will loose all your profile data.</Typography>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2vmax'}}>
                        <Button onClick={cancelDeleteHandler}>Cancel</Button>
                        <Button style={{color: 'red'}} onClick={deleteProfileHandler}>Confirm Delete</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default DeleteProfileModal;
