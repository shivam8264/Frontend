import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import HomePage from "./Components/HomePage"
import Login from './Components/Login';
import Signup from './Components/Signup';
// import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from './Components/NewsBookComponents/About';
// import Bookmark from './Components/Bookmark';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/store';
import Notes from './Components/NewsBookComponents/Note';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import MessageBoard from './Components/MessageBoard';
import Bookmark from './Components/Bookmark';

export class App extends Component {

  state = {
    progress: 0,
    country: 'in',
    searchQuery: ''
  }

  apiKey = process.env.REACT_APP_NEWS_API;

  setProgress = (progress) => {
    this.setState({ progress })
  }

  handleCountryChange = (country) => {
    this.setState({ country });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <NavBar onCountryChange={this.handleCountryChange} onSearch={this.handleSearch} />
            {/* <ToastContainer /> */}
            <LoadingBar
              height={3}
              color='#f11946'
              progress={this.state.progress}
            />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={6} category='business' country={this.state.country} color='primary' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} category='general' country={this.state.country} color='warning' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={6} category='entertainment' country={this.state.country} color='dark' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={6} category='health' country={this.state.country} color='info' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={6} category='science' country={this.state.country} color='secondary' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={6} category='sports' country={this.state.country} color='success' searchQuery={this.state.searchQuery} />} />
              <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={6} category='technology' country={this.state.country} color='danger' searchQuery={this.state.searchQuery} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/newsbook' element={<Notes />} />
              <Route path='/bookmarks' element={<Bookmark/>}/>
              <Route path='/about' element={<About />} />
              <Route path='/forget-password' element={<ForgotPassword/>} />
              <Route path='/reset-password/:token' element={<ResetPassword/>}/>
              <Route path='/message-board' element={<MessageBoard/>}/>
            </Routes>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App