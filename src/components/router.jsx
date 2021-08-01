import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layout/layout";

import weatherForecast from "./weaterForecast/weatherForecast";
const PATHNAME = process.env.REACT_APP_PATHNAME;




const Router = () => {
    
   
    return (
        <BrowserRouter basename= {PATHNAME}>
            <Switch>                
                <RouteWrapper exact path="/" component={weatherForecast} layout={Layout} />                                 
            </Switch>
        </BrowserRouter>
    );


}



function RouteWrapper({
    component: Component,
    layout: Layout,
    ...rest
}) {    
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}








export default Router;