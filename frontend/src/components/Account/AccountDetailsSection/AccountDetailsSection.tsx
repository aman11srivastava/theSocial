import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import {Avatar, Button, Typography} from "@mui/material";
import {Link, NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import Loader from "../../Loader/Loader";
import FollowInfoModal from "./FollowInfoModal";
import {followers, following, userStructure} from "../../../utils/utils";
import {followUnfollowUser, getSingleUserProfile, logoutUser} from "../../../redux/actions/userActions";
import DeleteProfileModal from "../../DeleteProfileModal/DeleteProfileModal";
import {toast, ToastContainer} from 'react-toastify';

interface AccountDetailsSectionProps {
    isUserPage: boolean
    user: userStructure
    loading: boolean
}

export const AccountDetailsSection = (props: AccountDetailsSectionProps) => {
    const {user, loading} = props;
    const {message, user: me} = useSelector((state: RootStateOrAny) => state?.follow);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [isFollowersOpen, setIsFollowersOpen] = useState<boolean>(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);
    const [deleteProfileModalOpen, setDeleteProfileModalOpen] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const {id} = useParams();

    console.log(id)

    async function logoutHandler() {
        await dispatch(logoutUser());
        navigate('/');
    }

    async function followHandler(e: SyntheticEvent) {
        e.preventDefault();
        setIsFollowing(!isFollowing);
        await dispatch(followUnfollowUser(user?._id))
        await getSingleUserProfile(id as string);
        toast.success(message);
    }

    useEffect(() => {
        // if (user?._id === id) {
        //     setIsMyProfile(true);
        // }
    }, [])

    useEffect(() => {
        if (user) {
            user.followers?.forEach((item) => {
                console.log(item?._id, me?._id)
                if (item?._id === me?._id) {
                    setIsFollowing(true);
                }
                else setIsFollowing(false);
            })
        }
    }, [dispatch, id, me?._id])

    return (
        <>
            {
                loading ? <Loader color={"black"}/> : (
                    <>
                        <Avatar src={user?.avatar && user?.avatar.url} sx={{height: '8vmax', width: '8vmax'}}/>
                        <Typography variant={"h5"}>{user?.name}</Typography>
                        <div>
                            <button onClick={() => setIsFollowersOpen(!isFollowersOpen)}>
                                <Typography>
                                    Followers
                                </Typography>
                            </button>
                            <Typography>{user?.followers?.length || 0}</Typography>
                        </div>
                        <div>
                            <button onClick={() => setIsFollowingOpen(!isFollowingOpen)}>
                                <Typography>
                                    Following
                                </Typography>
                            </button>
                            <Typography>{user?.following?.length || 0}</Typography>
                        </div>
                        <div>
                            <Typography>
                                Posts
                            </Typography>
                            <Typography>{user?.posts?.length || 0}</Typography>
                        </div>
                        {!props.isUserPage && (
                            <>
                                <Button variant={"contained"} onClick={logoutHandler}>Logout</Button>
                                <Link to={`/update/profile`}>Edit Profile</Link>
                                <Link to={`/update/password`}>Change Password</Link>
                                <Button onClick={() => setDeleteProfileModalOpen(!deleteProfileModalOpen)}
                                        variant={"text"}
                                        style={{color: 'red', marginTop: '2vmax'}}>
                                    Delete my Profile
                                </Button>
                            </>
                        )}
                        {
                            props.isUserPage && (
                                <Button style={{backgroundColor: isFollowing ? "#EF424B" : ""}}
                                        onClick={followHandler}
                                        variant={"contained"}>{
                                    isFollowing ? 'Unfollow' : 'Follow'
                                }</Button>
                            )
                        }
                        <FollowInfoModal user={user} errorMessage={"You don't have any followers!"} field={followers}
                                         open={isFollowersOpen} setOpen={setIsFollowersOpen}/>
                        <FollowInfoModal user={user} errorMessage={"You are not following anyone!"} field={following}
                                         open={isFollowingOpen} setOpen={setIsFollowingOpen}/>
                        <DeleteProfileModal setOpen={setDeleteProfileModalOpen} open={deleteProfileModalOpen}/>
                    </>
                )
            }
            <ToastContainer/>
        </>
    )
}

export default AccountDetailsSection;
