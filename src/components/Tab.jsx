import { Link } from "react-router-dom"
import '../Mainpage.css'
import { useState } from "react"

const Tab = () => {
  const [active, setActive] = useState('');

const handleTabClick = (tab)=>{
  setActive(tab)
}

    return (
    
      
        <ul className="tab-container" >
        <li>
            <Link to={'/Tailormade'}>
              <button
               className={active === 'Tailormade' ? 'active' : ''}
               onClick={() => handleTabClick('Tailormade')}
              >
              Tailor Made
              </button>
            </Link>
          </li>
          
          <li>
            <Link to={'/posts/Food'}><button>
              Food
              </button></Link>
          </li>
          <li>
            <Link to={'/posts/Activities'}><button>
              Activities
              </button></Link>
          </li>
          <li>
            <Link to={`/posts/Tours`}><button>
              Tours
              </button></Link>
          </li>
        </ul>
      
    
      )
    }
    
    export default Tab;