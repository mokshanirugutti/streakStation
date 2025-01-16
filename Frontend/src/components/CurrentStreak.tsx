import {Spinner} from "@nextui-org/spinner";
import React, { useState, useEffect } from "react";

import { GithubIcon } from "lucide-react";
import { getStreaks } from "../hooks/getStreaks";
// import { getLeetCodeStreak } from "../hooks/getLeetcodeStreak";
type CurrentStreakProps = {

  title : string
  username : string;
  token : string
}
const CurrentStreak: React.FC<CurrentStreakProps> = ({ title, username, token }) => {
  const [streak, setStreak] = useState<number | null>(null);
  const [contributedToday, setContributedToday] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  

  
  // useEffect(() => {
  //   getLeetCodeStreak();
  // })
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        setLoading(true);
        if(username && token){
          const currentStreak = await getStreaks({username, token,endpoint:'githubstreak'});
          setStreak(currentStreak.streak);
          setContributedToday(currentStreak.contributedToday);
          console.log('got streak')
          console.log(currentStreak);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [username, token]);

  if (loading) return   <Spinner color="primary" label="Fetching Data...." labelColor="primary" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`p-2 border ${ contributedToday ? 'border-green-500' : 'border-red-500'} shadow-md text-center rounded-md my-3`}>
      <h1 className="div flex  gap-2"><GithubIcon/> {title} - {streak}</h1>
    </div>
  );
};

export default CurrentStreak;


