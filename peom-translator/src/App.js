import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Forum from './components/Forum';
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import Myhomepage from './components/Myhomepage';
import SearchCharacter from './components/SearchCharacter';
import SearchVerse from './components/SearchVerse';
import SearchWord from './components/SearchWord';
import Volunteer from './components/Volunteer';
// import VolunteerVerse from './components/VolunteerVerse';
// import VolunteerWord from './components/VolunteerWord';
// import VolunteerCharacter from './components/VolunteerCharacter';
import VolunteerMain from './components/VolunteerMain';
import VolunteerApply from './components/VolunteerApply';
import AuditContent from './components/AuditContent';


const AV = require('leancloud-storage');

AV.init({
  appId: "ivcfWJ7jFJKH5dkcQv0mvS58-gzGzoHsz",
  appKey: "UrIl5Prm3V0Xpv74rSw4Tl7U",
  serverURL: "https://ivcfwj7j.lc-cn-n1-shared.com"
});

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/forum" component={Forum}></Route>
        <Route exact path="/post/:id" component={Post}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/myhomepage" component={Myhomepage}></Route>
        <Route exact path="/searchcharacter/:id" component={SearchCharacter}></Route>
        <Route exact path="/searchverse/:id" component={SearchVerse}></Route>
        <Route exact path="/searchword/:id" component={SearchWord}></Route>
        <Route exact path="/volunteer" component={Volunteer}></Route>
        {/* <Route exact path="/volunteercharacter" component={VolunteerCharacter}></Route>
        <Route exact path="/volunteerverse" component={VolunteerVerse}></Route>
        <Route exact path="/volunteerword" component={VolunteerWord}></Route> */}
        <Route exact path="/volunteermain" component={VolunteerMain}></Route>
        <Route exact path="/volunteerapply" component={VolunteerApply}></Route>
        <Route exact path="/audit" component={AuditContent}></Route>
      </Router>
    </div>

  );
}


export default App;
