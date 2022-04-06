import React from "react";
import { HashRouter, Route,  Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
// import Login from "../pages/login"
import Schema from "../pages/schema";
import { getUserInfo } from '../store/actions';

const Router = ( props: any ) => {
  const { token } = props
  return (
    <HashRouter>
      <Switch>
        {/* <Route path="/login" element={}></Route> */}
        <Route path="/">
          <Schema />
        </Route>
        <Redirect form="/*" to="/" />
      </Switch>
    </HashRouter>
  )
}

// 将 state 映射到props上，getUserInfo 映射成 Action
// export default connect((state) => state.user, { getUserInfo })(Router)
export default Router