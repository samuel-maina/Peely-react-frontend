import './App.css';
import Home from './Home'
import Article from './Article';
import Upload from './ArticleCreator';
import ArticleQuery from './ArticleQuery';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, Switch, withRouter}
from 'react-router-dom';

function App() {
    
    axios.defaults.baseURL='http://192.168.0.102:3030';
    return (
            <div className="App">
                <Router>
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path ="/publish" component={Upload}/>
                    <Route exact path ="/articles/:id/" component={ArticleQuery}/>
                    <Route exact path ="/article/:id/" component={Article}/>
                    </Switch>
                </Router>
            </div>
            );
}

export default App;
