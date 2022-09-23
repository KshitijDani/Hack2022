import React, { useState, useEffect } from 'react';

function View() {

  const [workoutDetails, setWorkoutDetails] = useState([{date: "2021-10-05", exercises: [{name:"random", sets:"0",reps:"0",weight:"0"}]}]);
  const [fromDate, setFromDate] = useState("2021-10-05")
  const [toDate, setToDate] = useState("2021-10-12");

  const handleFromDate = (event) => {
    const { value } = event.target;
    setFromDate(value);
  }

  const handleToDate = (event) => {
    const { value } = event.target;
    setToDate(value);
  }

  useEffect(() => {
    let url = '/workoutDetails?fromDate='+fromDate+'&toDate='+toDate;
    fetch(url).then(res => res.json()).then(data => {
      console.log(data)
      setWorkoutDetails((data));
    });
  }, [fromDate, toDate]);

  return (
    <div className="view">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Your Workout details are below</h1>
            <div>
              <label htmlFor="date"> From Date: </label>
              <input id="fromDate" name="fromDate" type="date" value={fromDate}onChange={e => handleFromDate(e)}/>

              <label htmlFor="date"> To Date: </label>
              <input id="toDate" name="toDate" type="date" value={toDate} onChange={e => handleToDate(e)}/>
              </div>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Exercise Name</th>
                  <th>Sets</th>
                  <th>reps</th>
                  <th>weigth</th>
                </tr>
              {workoutDetails.map((workoutDetail) => <p>{workoutDetail.date}{workoutDetail.exercises.map((exercise) => <p>Name: {exercise.name} Sets:{exercise.sets} Reps:{exercise.reps} Weight:{exercise.weight}</p>)}</p>)}
              </table>
              
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;