import './App.css'
import CurrentStreak from './components/CurrentStreak'

function App() {

  return (
    <div className='w-52 p-5 bg-neutral-800 text-white'>
      <h1 className='text-xl text-green-600 font-semibold'>Streak Station</h1>
        <CurrentStreak title='Github'/>
    </div>
  )
}

export default App
