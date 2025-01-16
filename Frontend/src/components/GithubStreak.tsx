import React, { useState } from 'react'
import CurrentStreak from './CurrentStreak';
import RequiredInput from './ui/RequiredInput';
import ButtonWithArrow from './ui/buttonWithArrow';

const GithubStreak: React.FC = () => {
    const githubUsername = localStorage.getItem('githubUsername');
    const githubAuthToken = localStorage.getItem('githubAuthToken');
    if (!githubUsername || !githubAuthToken) {
        return <GetGithubDetails />
    }
  return (
    <div>
        <CurrentStreak title='Github' username={githubUsername} token={githubAuthToken}/>
    </div>
  )
}

export default GithubStreak

const GetGithubDetails = () => {
    const [githubUsername, setGithubUsername] = useState<string>('')
    const [githubAuthToken, setGithubAuthToken] = useState<string>('')

    const handleSave = () => {
        localStorage.setItem('githubUsername', githubUsername)
        localStorage.setItem('githubAuthToken', githubAuthToken)

    }
    
    return (
        <form>
            <RequiredInput
                title="Username"
                placehoder="Github Username"
                type="text"
                name="githubUsername"
                onChange={(value) => setGithubUsername(value)}
            />
                <RequiredInput
                title="Token"
                placehoder="Enter github AuthToken"
                type="password"
                name="githubAuthToken"
                onChange={(value) => setGithubAuthToken(value)}
            />
            <ButtonWithArrow title="Save" onClick={handleSave}/>
        </form>
    )
}