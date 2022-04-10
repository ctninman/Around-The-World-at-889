import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import ActiveFlagQuiz from './ActiveFlagQuiz';
import StartScreen from './StartScreen';


function FlagQuiz ({countryData, flagHighScore, setFlagHighScore, fullUserObject, setUserScore}) {

  let history = useHistory()

    // *** STATE VARIABLES *** //
  const [flagQuizCountry, setFlagQuizCountry] = useState({})
  const [incorrectFlagOne, setIncorrectFlagOne] = useState({})
  const [incorrectFlagTwo, setIncorrectFlagTwo] = useState({})
  const [incorrectFlagThree, setIncorrectFlagThree] = useState({})
  const [flagResponseGiven, setFlagResponseGiven] = useState(false)
  const [currentFlagQuestion, setCurrentFlagQuestion] = useState(0)
  const [flagQuizScore, setFlagQuizScore] = useState (0)

  function resetButtonColors () {
    let flagButtons = document.getElementsByClassName("flag-button");
    let i;
    for (i = 0; i < flagButtons.length; i++) {
      flagButtons[i].style.backgroundColor = "lightgray";
      flagButtons[i].style.color = "black";
    }
  }

  function handleFlagAnswer (event) {
    if (flagResponseGiven === false) {
      if (event.target.value === flagQuizCountry.name.common) {
        event.target.style.backgroundColor = 'green'
        event.target.style.color = 'white'
        event.target.style.borderColor = 'black'
        setFlagQuizScore(flagQuizScore + 1)
      } else {
        event.target.style.backgroundColor = 'red'
        document.getElementById('correct-answer').style.backgroundColor = 'green'
      }
      setFlagResponseGiven(true)
    }
  }

  function setNextFlagQuestion () {
    setFlagQuizCountry(countryData[Math.floor(Math.random()*countryData.length)])
    setIncorrectFlagOne(countryData[Math.floor(Math.random()*countryData.length)])
    setIncorrectFlagTwo(countryData[Math.floor(Math.random()*countryData.length)])
    setIncorrectFlagThree(countryData[Math.floor(Math.random()*countryData.length)])
    setCurrentFlagQuestion(currentFlagQuestion + 1)
    setFlagResponseGiven(false)
    resetButtonColors()
    if (currentFlagQuestion >= 25){
      if (flagQuizScore > flagHighScore) {
        setFlagHighScore(flagQuizScore)
        
        // ### Uncomment out once server is set up ### //
        // patchFlagUserData()
        document.getElementById('flag-quiz-tv').innerHTML = `<h1>NEW HIGH SCORE!</h1> <h1>Your Score: ${flagQuizScore}</h1> <button id='newHS'>View High Scores</button>`
        document.getElementById('newHS').addEventListener('click', function () {
          history.push('/quizzes')
        })
      } else if (flagQuizScore <= flagHighScore) {
        document.getElementById('flag-quiz-tv').innerHTML = `<h1>Your Score: ${flagQuizScore}</h1> <button id="newHS">View High Scores</button>`
        document.getElementById('newHS').addEventListener('click', function () {
          history.push('/quizzes')
        })
      }
    }
  }

  const patchFlagUserData = function () {  
    fetch(`http://localhost:3000/users/${fullUserObject.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({flagsHighScore: flagQuizScore}),
    })
    .then((res) => {
      return res.json()
    })
    .then(user => {
      setUserScore(user.flagsHighScore + user.continentsHighScore + user.capitalsHighScore + user.populationHighScore)
      setFlagHighScore(user.flagsHighScore)
    });
  }

    // *** JSX *** //
  return (
    <div>
      {currentFlagQuestion === 0
        ? 
        <StartScreen 
          startQuiz={setNextFlagQuestion}
          message={'FLAGS - High Score:'}
          highScore={flagHighScore}/> 
        : 
        <ActiveFlagQuiz
          flagQuizCountry={flagQuizCountry}
          incorrectFlagOne={incorrectFlagOne}
          incorrectFlagTwo={incorrectFlagTwo}
          incorrectFlagThree={incorrectFlagThree}
          handleFlagAnswer={handleFlagAnswer}
          setNextFlagQuestion={setNextFlagQuestion}
          flagQuizScore={flagQuizScore}
          currentFlagQuestion={currentFlagQuestion}
          flagResponseGiven={flagResponseGiven}
          />}
    </div>
  )
}

export default FlagQuiz