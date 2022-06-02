import React from "react";
import {RootStateOrAny, useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";

export function ProtectedRoute({component: Component, ...rest}: { component: any, rest?: any }) {
    const {isAuthenticated, loading} = useSelector((state: RootStateOrAny) => state?.user);

    return (
        <>
            {!loading && (
                <Route {...rest} element={(props: any) => {
                    if (!isAuthenticated) {
                        return <Navigate to={"/"}/>
                    }
                    return <Component {...props}/>
                }}/>
            )}
        </>
    )
}

export default ProtectedRoute;
