import {useState} from 'react'
import { useHistory } from 'react-router-dom';
import StartScreen from './StartScreen';
import ActiveContinentQuiz from './ActiveContinentQuiz';

function ContinentQuiz ({countryData, continentHighScore, setContinentHighScore, fullUserObject, setUserScore}) {
  
  let history = useHistory ()

    // *** STATE VARIABLES *** //
  const [continentQuizCountry, setContinentQuizCountry] = useState(countryData[Math.floor(Math.random()*countryData.length)])
  const [continentResponseGiven, setContinentResponseGiven] = useState(false)
  const [currentContinentQuestion, setCurrentContinentQuestion] = useState(0)
  const [continentQuizScore, setContinentQuizScore] = useState (0)

  function resetButtonColors () {
    let continentButtons = document.getElementsByClassName("continent-button");
    let i;
    for (i = 0; i < continentButtons.length; i++) {
      continentButtons[i].style.backgroundColor = "lightgray";
      continentButtons[i].style.color = "#1F419B";
    }
  }

  function handleAnswer (event) {
    if (continentResponseGiven === false) {
      if (event.target.name === continentQuizCountry.continents[0]) {
        event.target.style.backgroundColor = 'green'
        event.target.style.color = 'white'
        event.target.style.borderColor = '#1F419B'
        setContinentQuizScore(continentQuizScore + 1)
      } else {
        event.target.style.backgroundColor = 'red'
      }
      setContinentResponseGiven(true)
    }
  }

  function setNextQuestion () {
    setContinentQuizCountry(countryData[Math.floor(Math.random()*countryData.length)])
    // if (continentQuizCountry.name.common === 'Russia' || continentQuizCountry.name.common === 'Turkey') {
    //   setContinentQuizCountry(countryData[Math.floor(Math.random()*countryData.length)])
    // }
    setCurrentContinentQuestion(currentContinentQuestion + 1)
    setContinentResponseGiven(false)
    resetButtonColors()
    if (currentContinentQuestion >= 25){
      if (continentQuizScore > continentHighScore) {
        setContinentHighScore(continentQuizScore)
        
        // ### Uncomment out once server is set up ### //
        // patchContinentUserData()
        document.getElementById('continent-quiz-tv').innerHTML = `<h1>NEW HIGH SCORE!</h1> <h1>Your Score: ${continentQuizScore}</h1> <button id='newHS'>View High Scores</button>`
        document.getElementById('newHS').addEventListener('click', function () {
          history.push('/quizzes')
        })
      } else if (continentQuizScore <= continentHighScore) {
        document.getElementById('continent-quiz-tv').innerHTML = `<h1>Your Score: ${continentQuizScore}</h1> <button id="newHS">View High Scores</button>`
        document.getElementById('newHS').addEventListener('click', function () {
          history.push('/quizzes')
        })
      }
    }
  }

  const patchContinentUserData = function () {  
    fetch(`http://localhost:3000/users/${fullUserObject.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({continentsHighScore: continentQuizScore}),
    })
     .then((res) => {
          return res.json()
        })
      .then(user => { 
        setUserScore(user.flagsHighScore + user.continentsHighScore + user.capitalsHighScore + user.populationHighScore)
        setContinentHighScore(user.continentsHighScore)
      }
    );
  }
  
    // *** JSX *** //
  return (
    <div>
      {currentContinentQuestion === 0
        ? 
        <StartScreen 
          startQuiz={setNextQuestion}
          message={'CONTINENTS - High Score:'}
          highScore={continentHighScore}/> 
        : 
        <ActiveContinentQuiz 
          setNextQuestion={setNextQuestion} 
          continentResponseGiven={continentResponseGiven}
          continentQuizCountry={continentQuizCountry} 
          handleAnswer={handleAnswer}
          currentContinentQuestion={currentContinentQuestion}
          continentQuizScore={continentQuizScore}/>
        }
    </div>
  )
}

export default ContinentQuiz