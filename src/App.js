import React, { useState, useEffect } from "react";
import "./App.css";
import cat1 from "./Assets/cat_1.png";
import cat2 from "./Assets/cat_2.png";
import cat3 from "./Assets/cat_3.png";
import cat4 from "./Assets/cat_4.png";
import cat5 from "./Assets/cat_5.png";
import cat6 from "./Assets/cat_6.png";
import cat7 from "./Assets/cat_7.png";
import cat8 from "./Assets/cat_8.png";
import cat9 from "./Assets/cat_9.png";
import cat10 from "./Assets/cat_10.png";
import cat11 from "./Assets/cat_11.png";
import cat12 from "./Assets/cat_12.png";


function Stock({ items = [], handleClick }) {
  if (Array.isArray(items) && items.length) {
    return items.map((item, i) => (
      <div key={item}>
        <img
          alt="cat"
          className="each-cat-image"
          src={item}
          onClick={() => handleClick(i)} />
      </div>
    ))
  }
}

function Playground({ data }) {
  if (Array.isArray(data) && data.length) {
    return data.map((image, index) => (
      <div key={index} className="new-image-div">
        {image && (
          <img alt="cat" className="each-cat-image-new" src={image} />
        )}
      </div>
    ))
  }
}

function App() {
  const imageArr = [
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    cat7,
    cat8,
    cat9,
    cat10,
    cat11,
    cat12
  ];

  const numOfCols = 3;

  const initResultGridImages = new Array(12).fill(null);

  const [finalImages, setfinalImages] = useState(initResultGridImages);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [isWinning, setWinningStatus] = useState(true);
  const checkIfDuplicateExists = w => {
    return new Set(w).size !== w.length;
  };

  const onImageClick = index => {
    const imageSetArray = finalImages.map((elem, elemIndex) => {
      return currentIndex === elemIndex ? imageArr[index] : elem;
    });
    setfinalImages(imageSetArray);
    if (currentIndex === initResultGridImages.length - 1) {
      let newArr = [];
      let tempTempArr = [...imageSetArray];
      while (tempTempArr.length) newArr.push(tempTempArr.splice(0, numOfCols));
      const checkDupArr = newArr.map(elem => {
        return checkIfDuplicateExists(elem);
      });
      if (checkDupArr.includes(true)) {
        setWinningStatus(false)
      }
    } else {
      setcurrentIndex(index => index + 1);
    }
  };

  const showResult = () => {
    let isNull = false;
    finalImages.map((value) => {
      if (value === null) {
        isNull = true;
      }
    })
    return isNull;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="existing-images-grid">
          <div className="container">
            <Stock items={imageArr} handleClick={onImageClick} />
          </div>
        </div>
        <div className="new-images-grid">
          <div className="container-new">
            <Playground data={finalImages} />
            {
              !showResult() && isWinning && <div>You win</div>

            }
            {
              !showResult() && !isWinning && <div>You lose</div>
            }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
