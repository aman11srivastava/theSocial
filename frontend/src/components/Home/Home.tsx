import React, {Dispatch, useEffect} from "react";
import './home.css';
import User from "../User/User";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {userStructure} from "../../utils/utils";
import {getAllUsers} from "../../redux/actions/userActions";

export const Home = () => {
    const {users} = useSelector((state: RootStateOrAny) => state?.allUsers);
    const dispatch: Dispatch<any> = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    return (
        <>
            <div className={"home"}>
                <div className={"homeleft"}>

                </div>

                <div className={"homeright"}>
                    {users && users.map((user: userStructure) => (
                        <User key={user._id} name={user.name} userId={user._id} avatar={user.avatar.url}/>))}
                </div>
            </div>

        </>
    )
}

export default Home;
