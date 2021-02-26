import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    updateList();
  }, []);

  const updateList = async () => {
    await Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "foodName") {
      setFoodName(value);
    } else if (name === "days") {
      setDays(value);
    } else if (name === "updateFood") {
      setNewFoodName(value);
    }
  };

  const addToList = async () => {
    console.log(foodName, days);
    await Axios.post("http://localhost:3001/insert", {
      foodName,
      days,
    });
    updateList();
  };

  const updateFood = async (id) => {
    await Axios.put("http://localhost:3001/update", { id, newFoodName });
    updateList();
  };

  const deleteFood = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    updateList();
  };
  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food Name:</label>
      <input type="text" name="foodName" onChange={onChange} />
      <label>Days Since You Ate it::</label>
      <input type="number" name="days" onChange={onChange} />
      <button onClick={addToList}>Add to List</button>

      <h1>Food List</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key} className="food">
            <h1>{val.foodName}</h1>
            <h2>{val.daysSinceIAte} days</h2>
            <input
              name="updateFood"
              type="text"
              placeholder="New Food Name...."
              onChange={onChange}
            />
            <button onClick={() => updateFood(val._id)}>update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
