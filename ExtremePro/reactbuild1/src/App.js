import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import image from './film1.png';
import ReactDOM from 'react-dom';
import API from './utils/API';
import API2 from './utils/API2';
import MyMapComponent from './Map.js';
import Mern from './components/Mern';

class App extends Component {


  componentDidMount(){

    const video = ReactDOM.findDOMNode(this.refs.video)

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }

    //Legacy code below: getUserMedia 
    else if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia({ video: true }, function (error, stream) {
        if(error) console.log(error);
        video.src = stream;
        video.play();
        console.log("Stream1: " + stream);
      });
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia({ video: true }, function (error, stream) {
        if (error) console.log (error);
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
        console.log("Stream2: " + stream);
      });
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
      navigator.mozGetUserMedia({ video: true }, function (error,stream) {
        if (error) console.log (error);
        video.src = window.URL.createObjectURL(stream);
        video.play();
        console.log("Stream3: " + stream);
      });
    }
  }


 takePicture = (snap) =>{
   //Initialize variables 
   var result;
   var anger;
   var contempt;
   var disgust;
   var happy;
   var neutral;
   var sad;
   var surprise;
   var fear;

  //Function used in takePicture
  //Reads all data sent by the api call and assings it to variables
  const getData = (res) =>{
    anger = res.data["0"].scores.anger;
    contempt = res.data["0"].scores.contempt;
    disgust = res.data["0"].scores.disgust;
    fear = res.data["0"].scores.fear;
    happy = res.data["0"].scores.happiness;
    neutral = res.data["0"].scores.neutral;
    sad = res.data["0"].scores.sadness;
    surprise = res.data["0"].scores.surprise;

    let height = res.data["0"].faceRectangle.height;
    let width = res.data["0"].faceRectangle.width;
    let left = res.data["0"].faceRectangle.left;
    let top = res.data["0"].faceRectangle.top;

    console.log("anger: " + anger);
    console.log("contempt: " + contempt);
    console.log("disgust: " + disgust);
    console.log("fear: " + fear);
    console.log("happiness: " + happy);
    console.log("neutral: " + neutral);
    console.log("sadness: " + sad);
    console.log("surprise: " + surprise);

  };

  var getMood = (first, second, third, num1, num2, num3) => {
    let result;
    if (first == "neutral") {
      result = second.concat(" slightly");
      return result;
    }

    result = first.concat(" strongly")

    return result;

  };

  var getEmotionName = (emotion) => {

    let result;

    if (emotion == neutral) {
      result = "neutral";
    }
    if (emotion == happy) {
      result = "happy";
    }
    if (emotion == contempt) {
      result = "contempt";
    }
    if (emotion == sad) {
      result = "sad";
    }
    if (emotion == anger) {
      result = "anger";
    }
    if (emotion == surprise) {
      result = "surprise";
    }
    if (emotion == disgust) {
      result = "disgust";
    }
    if (emotion == fear) {
      result = "fear";
    }

    return result;
  };


  var calculateBigEmotion = (arrayOfEmotions) => {
    var index = 0;
    var mainEmotion = 0;
    var foundBigest = false;

    console.log("This is the array", arrayOfEmotions);

    var size = arrayOfEmotions.length;

    for (var i = size; i >= 0; i--) {
      //console.log(`Emotion at ${i}`, arrayOfEmotions[i]);

      if (arrayOfEmotions[i] > arrayOfEmotions[i - 1]) {
        if (mainEmotion < arrayOfEmotions[i]) {
          mainEmotion = arrayOfEmotions[i];
          console.log("This is the main emotion", mainEmotion)
          foundBigest = true;
          index = i;
        }
      }
    }

    if (mainEmotion < arrayOfEmotions[0]) {
      mainEmotion = arrayOfEmotions[0];
    }

    return mainEmotion;

  };

  //Function used in takePicture
  //Interprets the data sent by the API and returns the prominent emotion
  const processData = () =>{

    var arrayOfEmotions = [happy, anger, fear, disgust, neutral, contempt, sad, surprise];

    var primaryEmotion = calculateBigEmotion(arrayOfEmotions);

    var nameOfPrimary = getEmotionName(primaryEmotion);

    var indexOfPrimary = arrayOfEmotions.indexOf(primaryEmotion);

    arrayOfEmotions.splice(indexOfPrimary, 1);

    console.log(`${nameOfPrimary} : ${primaryEmotion}`);


    var secondaryEmotion = calculateBigEmotion(arrayOfEmotions);

    var nameOfSecondary = getEmotionName(secondaryEmotion);

    var indexOfSecondary = arrayOfEmotions.indexOf(secondaryEmotion);

    arrayOfEmotions.splice(indexOfSecondary, 1);

    console.log(`${nameOfSecondary} : ${secondaryEmotion}`);


    var thirdEmotion = calculateBigEmotion(arrayOfEmotions);

    var nameOfThird = getEmotionName(thirdEmotion);

    var indexOfThird = arrayOfEmotions.indexOf(thirdEmotion);

    arrayOfEmotions.splice(indexOfThird, 1);


    console.log(`${nameOfThird} : ${thirdEmotion}`);


    var masterEmotion = getMood(nameOfPrimary, nameOfSecondary, nameOfThird, primaryEmotion, secondaryEmotion, thirdEmotion);

    console.log(masterEmotion);

  }



    let video = ReactDOM.findDOMNode(this.refs.video);

    const canvas = ReactDOM.findDOMNode(this.refs.canvas);

    const context = canvas.getContext("2d");

    console.log(context);

    context.drawImage(video, 0, 0, 640, 400);

  
    canvas.toBlob(function (blob) {
      API.search(blob)
        .then(res => {
          console.log("It worked");
          console.log(res);
          getData(res);
          processData();

        })
        .catch(err => console.log(err));
      console.log(blob);
    })

    return context;

};//Main Close
  

  geoMaps = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log("This is the coordinates", pos);

        let cuisineID = 25;

        let api = `a39dc6d6f11e4a9ba81caba88c332778`;

        var url= `${pos.lat} &lon= ${pos.lng} &cuisines= ${cuisineID} &radius=16090&apikey= ${api}`;

        API2.search(url)
          .then(res => {
            console.log("It worked");
            console.log(res);
          })
          .catch(err => console.log("This is the error",err));

    });
  };
}

  
  
  render() {
    return (
    <div className= "container" >
       <Mern /> 
      <div className="camera-frame text-center">
        <video className="video" width="1000" height="1000" ref="video" autoPlay></video>
        <div className="text-center">
          <button type="button" className="btn-primary" id="snap" onClick={this.takePicture}>Snap a Photo</button>
        </div>
        <canvas id="canvas" ref="canvas" width="642" height="400"></canvas>
      </div>

        <MyMapComponent containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
        <button type="button" id="map" onClick={this.geoMaps}>Use the maps API</button>         



    </div>
    );
  }
};

export default App;
