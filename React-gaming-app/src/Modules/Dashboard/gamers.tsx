import React, { useState, useEffect } from "react";
import "./gamers.css";

interface Player {
  player_id: number;
  player_name: string;
  phone: string;
  account_balance: string; 
}

const Gamers: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPlayers = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("https://bonanza.tililtech.com/api/fetch-players", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debug log to inspect the response structure

      if (response.ok && data.success) {
      if (data.data && typeof data.data === "object") {
        const playersArray = Object.values(data.data).map((player: any) => ({
          player_id: player.player_id,
          player_name: player.player_name,
          phone: player.phone,
          account_balance: player.account_balance,
        }));
        setPlayers(playersArray);
        setResponseMessage("");
      }else {
          throw new Error("Unexpected data format: 'data.data' is not an array.");
        }
      } else {
        throw new Error(data.message || "Failed to fetch players.");
      }
    } catch (error: unknown) {
      setResponseMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Gamers List</h1>
      {responseMessage && (
        <p
          style={{
            color: responseMessage.includes("Failed") || responseMessage.includes("missing") ? "red" : "green",
          }}
        >
          {responseMessage}
        </p>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : players && players.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Player ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_id}</td>
                <td>{player.player_name}</td>
                <td>{player.phone}</td>
                <td>{player.account_balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players found.</p>
      )}
    </div>
  );
};

export default Gamers;
