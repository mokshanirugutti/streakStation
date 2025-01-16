import './App.css'
import GithubStreak from './components/GithubStreak'

function App() {

  return (
    <div className='w-52 p-5 '>
      <h1 className='text-xl text-green-600 font-semibold mb-3'>Streak Station</h1>
        <GithubStreak/>
    </div>
  )
}

export default App
