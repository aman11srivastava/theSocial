import React, {ChangeEvent, Dispatch, SyntheticEvent, useState} from "react";
import './search.css';
import {Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../redux/actions/userActions";
import User from "../User/User";
import {userStructure} from "../../utils/utils";

export const Search = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch: Dispatch<any> = useDispatch();
    const {users, loading} = useSelector((state: RootStateOrAny) => state?.allUsers);

    function searchSubmitHandler(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(getAllUsers(search));
    }

    return (
        <>
            <div className={"search"}>
                <form className={"searchForm"} onSubmit={searchSubmitHandler}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>theSocial | Search</Typography>
                    <input
                        type={"text"} value={search} placeholder={"Search"} required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                    <Button disabled={loading} type={"submit"}>Search</Button>
                    <div className={"searchResults"}>
                        {users && users.length > 0 && users.map((user: userStructure) => (
                            <User key={user?._id} name={user?.name} userId={user?._id} avatar={user?.avatar?.url}/>
                        ))}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search;
