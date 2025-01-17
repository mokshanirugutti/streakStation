import './App.css'
import ShowStreak from './components/ShowStreak'

function App() {

  return (
    <div className='w-60 p-5 h-80'>
      <h1 className='text-xl text-green-600 font-semibold mb-3'>Streak Station</h1>
        <ShowStreak title='Github'/>
        <ShowStreak title='Leetcode'/>
    </div>
  )
}

export default App
