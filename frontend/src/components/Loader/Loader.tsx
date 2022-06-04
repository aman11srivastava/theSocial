import React from "react";
import {CircularProgress} from "@mui/material";

interface LoaderProps {
    color: string
}

export const Loader = ({color}: LoaderProps) => {
    return (
        <>
            <CircularProgress style={{color}}/>
        </>
    )
}

export default Loader;
