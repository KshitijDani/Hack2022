import React, { useState, useEffect } from 'react';
import './App.css';
import {constantStrings} from "./constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navigation, View, Add} from "./components";


function App() {
  const [workoutDetails, setWorkoutDetails] = useState([{date: "2021-10-05", exercises: [{name:"random", sets:"0",reps:"0",weight:"0"}]}]);

  useEffect(() => {
    fetch('/workoutDetails').then(res => res.json()).then(data => {
      console.log(data)
      setWorkoutDetails((data));
    });
  }, []);

  return (
    <div className="App">
        <p>{constantStrings.header}</p>
        <p>Welcome {constantStrings.name}.</p>
        <p>
          <Router>
            <Navigation />
              <Switch>
                <Route path="/view" exact component={() => <View />} />
                <Route path="/add" exact component={() => <Add />} />
              </Switch>
          </Router>
        </p>
    </div>
  );
}

export default App;


