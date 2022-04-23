import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Navigate to={{
                    pathname: '/',
                    state: { from: props.location }
                }}
                />
            )}
    />
);

export default PrivateRoute