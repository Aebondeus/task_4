import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LoginPage} from './pageRouters/loginPage';
import {RegPage} from './pageRouters/authpage';
import {MainPage} from './pageRouters/tablePage';

export const toRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/main' component={MainPage} exact/>
                <Redirect to='/main'/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/login' component={LoginPage} exact />
            <Route path='/register' component={RegPage} exact />
            <Redirect to='/login' />
        </Switch>
    )
}