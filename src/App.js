import React, { useState, useEffect } from "react";
import './App.css';
import Draggable from "react-draggable";

function App() {
  const randomColor = () => {
    const random = Math.floor(Math.random()*16777215).toString(16);
    return `#${random}`;
  }
  const createId = () => {
    let id = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 24; i++ ) {
      id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return id;
  }
  const [item, setItem] = useState("")
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  )
  useEffect(()=>{
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])
  const newItem = () => {
   if(item.trim() !== ""){
     const newItem = {
       id: createId(),
       item,
       color: randomColor(),
       defaultPos: {
         x: 200,
         y: -500
       },
     }
     setItems((items)=> [...items, newItem])
     setItem("")
   }
   else{
     alert("Write your notice")
     setItem("")
   }
  }

  const updatePosition = (data, index) => {
    const newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }

  const deleteNode = (id) => {
    const result = [];
    for(const item of [...items]){
        if(item.id !== id){
          result.push(item)
        }
    }
   setItems(result)
  }

  const keyPress = (e) => {
    const code = e.keyCode || e.which
    if(code === 13){
      newItem()
    }
  }

  return (
	  <div className="App">
<div className="wrapper">
<input value={item} type="text" placeholder="Write your notice..." onChange={(e)=> setItem(e.target.value)} 
onKeyPress={(e)=> keyPress(e)}/>
	  <button className="enter" onClick={newItem}>ENTER</button>
	  </div>
    {
      items.map((item, index) => {
        return (
          <Draggable key={index} defaultPosition={item.defaultPos}
          onStop={(_, data)=> {
            updatePosition(data, index)
          }}>
            <div className="todo__item" style={{backgroundColor: item.color}}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteNode(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        )
      })    }
	  </div>
  );
}

export default App;
