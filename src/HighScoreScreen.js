import { useHistory } from "react-router"

function HighScoreScreen ({currentScore, savedHighScore}) {

  console.log('currentscore', currentScore);
  console.log('savedhighscore', savedHighScore);
  
  let history = useHistory()

  function finishQuiz () {
    history.push('/quizzes')
  }
  
  return (
    <div>
      
      <h1>Your Score: {currentScore}</h1> 
      <h1>High Score: {savedHighScore}</h1>
      {currentScore > savedHighScore ? <h1>NEW HIGH SCORE!</h1> : null}
      <button onClick={finishQuiz}>View High Scores</button>
    </div>
  )
}

export default HighScoreScreen