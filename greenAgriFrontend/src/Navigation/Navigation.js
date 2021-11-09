import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Pages/Home';
import Product from '../Pages/Product';
import Farmer from '../Pages/Farmer';
import VisitRequest from '../Pages/VisitRequest';

const Navigation = () =>
    <Switch>
        <Route exact path='/' >
            <Home />
        </Route>
        <Route path='/greenagri/products'>
            <Product/>
        </Route>
        <Route path='/greenagri/farmers'>
            <Farmer/>
        </Route>
        <Route path='/greenagri/visitingrequests'>
            <VisitRequest/>
        </Route>
    </Switch>

export default Navigation
