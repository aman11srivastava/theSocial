import React, {Dispatch, useState} from 'react';
import {Avatar, Button, Typography} from "@mui/material";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import Loader from "../../Loader/Loader";
import FollowInfoModal from "./FollowInfoModal";
import {followers, following} from "../../../utils/utils";
import {logoutUser} from "../../../redux/actions/userActions";
import DeleteProfileModal from "../../DeleteProfileModal/DeleteProfileModal";

export const AccountDetailsSection = () => {
    const {user, loading} = useSelector((state: RootStateOrAny) => state?.user);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [isFollowersOpen, setIsFollowersOpen] = useState<boolean>(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);
    const [deleteProfileModalOpen, setDeleteProfileModalOpen] = useState<boolean>(false);

    async function logoutHandler() {
        await dispatch(logoutUser());
        navigate('/');
    }

    return (
        <>
            {
                loading ? <Loader color={"black"}/> : (
                    <>
                        <Avatar src={user?.avatar.url} sx={{height: '8vmax', width: '8vmax'}}/>
                        <Typography variant={"h5"}>{user?.name}</Typography>
                        <div>
                            <button onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                                <Typography>
                                    Followers
                                </Typography>
                            </button>
                            <Typography>{user?.followers.length || 0}</Typography>
                        </div>
                        <div>
                            <button onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                                <Typography>
                                    Following
                                </Typography>
                            </button>
                            <Typography>{user?.following.length || 0}</Typography>
                        </div>
                        <div>
                            <Typography>
                                Posts
                            </Typography>
                            <Typography>{user?.posts.length || 0}</Typography>
                        </div>
                        <Button variant={"contained"} onClick={logoutHandler}>Logout</Button>
                        <Link to={`/update/profile`}>Edit Profile</Link>
                        <Link to={`/update/password`}>Change Password</Link>
                        <Button onClick={() => setDeleteProfileModalOpen(!deleteProfileModalOpen)} variant={"text"}
                                style={{color: 'red', marginTop: '2vmax'}}>
                            Delete my Profile
                        </Button>
                        <FollowInfoModal errorMessage={"You don't have any followers!"} field={followers}
                                         open={isFollowersOpen} setOpen={setIsFollowersOpen}/>
                        <FollowInfoModal errorMessage={"You are not following anyone!"} field={following}
                                         open={isFollowingOpen} setOpen={setIsFollowingOpen}/>
                        <DeleteProfileModal setOpen={setDeleteProfileModalOpen} open={deleteProfileModalOpen}/>
                    </>
                )
            }
        </>
    )
}

export default AccountDetailsSection;
