import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const res = await fetch(`${API_URL}quizzes/ranking`);
      const data = await res.json();
      console.log("Ranking data:", data);
      setRanking(data);
    };
    fetchRanking();
  }, []);

  return (
    <div>
      <h1>Podio de usuarios</h1>
      <ol>
        {ranking.map((user, idx) => (
          <li key={user.userID}>
            {user.displayName} ({user.email}) - {user.totalPoints} puntos
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Ranking;