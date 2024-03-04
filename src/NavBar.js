import { NavLink } from 'react-router-dom'

const linkStyles = {
  display: "inline-block",
  width: "70px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "#F6D20C",
  textDecoration: "none",
  color: "#1F419B",
  borderRadius: '5px'
};

function NavBar({ login, setLogin, enterUserName, userName, userScore}) {

  function handleLoginType (event) {
    setLogin(event.target.value)
  }

  function alertNoServer () {
    window.alert('Server not yet set up. Login feature not available. You may take the quizzes, but your data will not be saved.')
  }

    // *** JSX *** //
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <div>
      <NavLink
        to='/'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Home
      </NavLink>
      <NavLink
        to='/countries'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Countries
      </NavLink>
      <NavLink
        to='/capitals'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Capitals
      </NavLink>
      <NavLink
        to='/continents'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Continents
      </NavLink>
      <NavLink
        to='/flags'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Flags
      </NavLink>
      <NavLink
        to='/population'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Population
      </NavLink>
      <NavLink
        to='/quizzes'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Quizzes
      </NavLink>
      {/* <NavLink
        to='/map'
        exact
        className='nav-link'
        style={linkStyles}
        activeStyle={{background: "#FBEE6E", color: '#1F419B', fontWeight: 'bold'}}
      >
        Map
      </NavLink> */}
      </div>
      {/* <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
        <h3 
          style={{paddingRight: '5px', 
          verticalAlign: 'top', 
          marginTop: '5px', 
          color: 'black'}}>
          {userName === '' 
        ? 
          null 
        : 
          `${userName}: ${userScore} ⭐`}
        </h3>
         <form 
          onChange={handleLoginType}


      //### Uncomment out once server is set up ### //
          // onSubmit={enterUserName}

          onSubmit={alertNoServer}
          value={login}
          id='username-form'>
          <input 
            style={{marginTop: '8px'}} 
            name='username_input'
            type='text' 

    placeholder='Future feature'>

  
          </input>
          <button
            type='submit'
            value="Enter"
            style={{marginTop: '2px'}} 
            id='login-button'
            text='Enter'>
              Enter
           </button>
        </form>
      </div> */}
    </div>
  )
}

export default NavBar