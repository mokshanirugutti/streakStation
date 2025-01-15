import React, { useState, useEffect } from "react";
import { CurrentStreakProps } from "../types";
import { getGithubStreak } from "../hooks/getGithubStreak";
import { GithubIcon } from "lucide-react";
// import { getLeetCodeStreak } from "../hooks/getLeetcodeStreak";

const CurrentStreak: React.FC<CurrentStreakProps> = ({ title }) => {
  const [streak, setStreak] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  
  const username = import.meta.env.VITE_GITHUB_USERNAME; 
  const token = import.meta.env.VITE_GITHUB_AUTH_TOKEN;
  
  // useEffect(() => {
  //   getLeetCodeStreak();
  // })
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        setLoading(true);
        if(username && token){
          const currentStreak = await getGithubStreak(username, token);
          setStreak(currentStreak);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [username, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-2 border border-gray-400 shadow-md text-center rounded-md my-3">
      <h1 className="div flex  gap-2"><GithubIcon/> {title} - {streak}</h1>
    </div>
  );
};

export default CurrentStreak;
