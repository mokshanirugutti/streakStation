import {Spinner} from "@nextui-org/spinner";
import React, { useState, useEffect } from "react";

import { CodeXmlIcon, GithubIcon } from "lucide-react";
import { getStreaks } from "../hooks/getStreaks";
// import { getLeetCodeStreak } from "../hooks/getLeetcodeStreak";
type CurrentStreakProps = {

  title : string
  username : string;
  token : string
  endpoint:string;
}
const CurrentStreak: React.FC<CurrentStreakProps> = ({ title, username, token,endpoint }) => {
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
          const currentStreak = await getStreaks({username, token,endpoint});
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
    <div className={`p-2 border-2 ${ contributedToday ? 'border-t-green-500 bg-gradient-to-b from-white from-30%  to-green-600' : ' border-t-red-400 bg-gradient-to-b from-white from-30%  to-red-600'} shadow-md text-center rounded-md my-3`}> 
      <h1 className="div flex  gap-2  text-base font-semibold text-neutral-700 drop-shadow-md"> { title==='Github' ? <GithubIcon/> : <CodeXmlIcon/> }{title} - {streak} 🔥 </h1>
    </div>
  );
};

export default CurrentStreak;


