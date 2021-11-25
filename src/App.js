import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'

const App = () => {

    return(
        <>
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movieDetail/:id" component={MovieDetail} />
            </Switch>
        </Router>
        </>
    )
}
export default App;