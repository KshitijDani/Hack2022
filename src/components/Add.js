import React, { useState }  from "react";

function tabularData(){
  return (
    <div>
      <p>This is a table of your data</p>
    </div>
  )
}

function Add() {
  const [rowElementsList, setRowElementsList] = useState([{ name: "", sets: "", reps: "", weight: ""}])

    // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rowElementsList];
    list[index][name] = value;
    setRowElementsList(list);
  };
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...rowElementsList];
    list.splice(index, 1);
    setRowElementsList(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setRowElementsList([...rowElementsList, { name: "", sets: "", reps: "", weight: ""}]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    let workoutDetail = {}
    workoutDetail['date'] = data.get('date')
    workoutDetail['exercises'] = []
    for(var i=0; i < rowElementsList.length; i++){
      workoutDetail['exercises'].push({
        'name': rowElementsList[i]['name'],
        'sets': rowElementsList[i]['sets'],
        'reps': rowElementsList[i]['reps'],
        'weight': rowElementsList[i]['weight']
      });
    }
    

    console.log("workoutDetail",workoutDetail)
    
    fetch('/workoutDetails', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutDetail),
    }).then(res => {
      if(res.status === 200){
      alert('Successfully added data')
      } else {
        alert('Failed to add data')
      }
      });
  }

  return (
    <div>
    <div><tabularData/></div>
    <div>
      <form onSubmit={handleSubmit}>

          <label htmlFor="date">Enter date</label>
          <input id="date" name="date" type="date" />
          <br/><br/>
          {rowElementsList.map((x, i) => {
            return (
              <div className="box">
                <label htmlFor="name"> exercise name: </label>
                <input id="name" name="name" type="text" value={x.name} onChange={e => handleInputChange(e, i)}/>

                <label htmlFor="sets">  sets: </label>
                <input id="sets" name="sets" type="text" value={x.sets} onChange={e => handleInputChange(e, i)}/>

                <label htmlFor="reps"> reps: </label>
                <input id="reps" name="reps" type="text" value={x.reps} onChange={e => handleInputChange(e, i)}/>

                <label htmlFor="weight"> weight(kg): </label>
                <input id="weight" name="weight" type="text" value={x.weight} onChange={e => handleInputChange(e, i)}/>

                {rowElementsList.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                <br/>
                {rowElementsList.length - 1 === i && <button onClick={handleAddClick}>Add Exercise</button>}
              </div>
            );
          })}
          <br/><br/>
          <button>Send data!</button>
        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(rowElementsList)}</div> */}

      </form>
      </div>
      </div>
  );
}

export default Add;