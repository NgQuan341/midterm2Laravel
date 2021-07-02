
// require('./bootstrap');

import ReactDOM from 'react-dom'
import {Route,Switch,BrowserRouter as Router } from 'react-router-dom';
import CarList from './components/CarList'
import UpdateCar from './components/updateCar'
import CreateCar from './components/createCar'
import Login from './components/Login';
import Logup from './components/Logup';
import Forgot from './components/ForgotPassword';
import ResetPassword from './components/resetPassword';
if (document.getElementById('root')) {
    ReactDOM.render(
        <Router>
            <Switch>
                <Route
                    exact
                    path='/resetpassword/:id' 
                    component={({history, match}) => <ResetPassword history={history} match={match}/>}>
                 </Route>
                <Route
                    exact
                    path='/forgotpassword' 
                    component={({history, match}) => <Forgot history={history} match={match}/>}>
                 </Route>
                <Route
                    exact
                    path='/logup' 
                    component={({history, match}) => <Logup history={history} match={match}/>}>
                 </Route>
                <Route
                    exact
                    path='/login' 
                    component={({history, match}) => <Login history={history} match={match}/>}>
                 </Route>
                <Route
                    exact
                    path='/cars/:id/edit' 
                    component={({history, match}) => <UpdateCar history={history} match={match}/>}>
                 </Route>
                 <Route
                    exact
                    path='/cars/create' 
                    component={({history, match}) => <CreateCar history={history} match={match}/>}>
                 </Route>
                 <Route
                    exact
                    path='/cars' 
                    component={({history, match}) => <CarList history={history} match={match}/>}
                 >
                 </Route>
            </Switch>
        </Router>

        , document.getElementById('root'));
}
