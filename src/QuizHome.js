import { useState } from "react"

function QuizHome ({continentHighScore, flagHighScore, capitalHighScore, populationHighScore, fullUserObject, userScore}) {

  const [ score, setScore ] = useState(userScore)
  return (
    <div className='quiz-tv'>
      {/* <h1 style={{color: 'red'}}>{fullUserObject.userName === "Player" ? 'Enter a username to save your high scores' : null}</h1> */}
      <h1 
        className='tab-header' 
        style={{backgroundColor: '#1F419B', 
        color: 'white', marginLeft: '15%', 
        marginRight: '15%'}}>
          {/* {fullUserObject.userName}'s Total Score: {userScore} */}
          Total Score: {score}
        </h1>
      <h2 style={{cursor: 'default'}}>
        Continents High Score: {continentHighScore}
      </h2>
      <h2 style={{cursor: 'default'}}>
        Flags High Score: {flagHighScore}
      </h2>
      <h2 style={{cursor: 'default'}}>
        Capitals High Score: {capitalHighScore}
      </h2>
      <h2 style={{cursor: 'default'}}>
        Population High Score: {populationHighScore}
      </h2>
    </div>
  )
}

export default QuizHome