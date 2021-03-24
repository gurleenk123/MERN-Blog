import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import CreatePost from './components/CreatePost';
import MyPosts from './components/MyPosts';
import store from "./redux/store";
import showPost from './components/showPost';
function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <Router>
    <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signup"  component={Signup}/>
        <Route path="/login"  component={Login}/>
        <Route path="/createpost"  component={CreatePost}/>
        <Route path="/myposts" component={MyPosts}/>
        <Route path="/showpost/:slug" component={showPost}/>
        <Route component={Notfound}/>
      </Switch>
    </Router>
    </Provider>
    </div>
  );
}

export default App;
