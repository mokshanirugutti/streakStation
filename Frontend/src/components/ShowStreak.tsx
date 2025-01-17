import React from 'react'
import GetDetailsPopUp from './getDetailsPopUp';
import CurrentStreak from './CurrentStreak';


type ShowStreakProps = {
    title : string;
}
const ShowStreak : React.FC<ShowStreakProps> = ({ title } ) => {
    const Username = localStorage.getItem(`${title}Username`);
    const AuthToken = localStorage.getItem(`${title}AuthToken`);
    
    
    if (!Username || !AuthToken) {
        return(
            <GetDetailsPopUp title={title}/>
        ) ;
    }
  return (
    <div className='my-3'>
         <CurrentStreak title={title} username={Username} token={AuthToken}/>
    </div>
  )
}

export default ShowStreak