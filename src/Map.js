import {useEffect, useState} from 'react'
import {ReactComponent as WorldMap} from './world.svg'

function Map () {

	const [highlightedCountry, setHighlightedCountry] = useState('')
  useEffect (() => {
    document.title = "Around the World at 889"
  }, [] )

		const handleMouseEnter = (e) => {
			const countryName = e.target.getAttribute('class');
			if (countryName) {
				// Display country name (you can implement this)
				console.log(countryName);
			}
		};

  return (
    <div>
      <div>
        <h1 className='tab-header'>{highlightedCountry ? highlightedCountry : "Select a Country"}</h1>
      </div>

			<div className='quiz-tv' style={{marginLeft: '15%', marginRight: '15%'}} >  
				<div>
					<WorldMap 
						style={{marginTop: '20px', marginBottom: '20px', width: '100%' }} 
						onMouseEnter={handleMouseEnter}
						/>
				</div>  
			</div>
  
    </div>
  )
}

export default Map