import { Redirect, Route } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
    //check if user logged in
    const user = useSelector((state) => state?.users);
    const { userAuth } = user;

    return (
        <Route
            {...rest}
            render={() =>
                userAuth ? <Component {...rest} /> : <Redirect to="/signin" />
            }
        />
    );
};

export default PrivateProtectRoute;
