import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [
		isLoading,
		setIsLoading
  ] = useState(true);
  
  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setIsLoading(false)
        setColorList(res.data)
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false)
      })
  }, [])


  
  const updateColors = updatedColor => {
    setColorList(colorList.map(color => color.id === updatedColor.id ? updatedColor : color))
  }

  const removeColor = id => {
    setColorList(colorList.filter(color => color.id != id))
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} removeColor={removeColor} setColorList={setColorList}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
