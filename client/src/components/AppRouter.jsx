import React, {useContext} from 'react';
import {Routes, Route, Navigate, useInRouterContext} from "react-router-dom"
import {authRouters, publicRouters} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRouters.map(({path, Component}) => <Route path={path} key={path} element={Component}/>)}
            {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>)}
            <Route path={"*"} element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>

    );
};

export default AppRouter;