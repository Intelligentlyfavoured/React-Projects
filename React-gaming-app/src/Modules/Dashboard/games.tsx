import React, { useState, useEffect } from "react";
import '../../App.css'
interface Game {
  game_id: number;
  game_name: string;
  game_description: string;
  game_status: string;
  winner_amount: string;
  win_factor: string;
  createdby: number;
}

const Games: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"insert" | "update" | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);

  const [gameName, setGameName] = useState<string>("");
  const [gameDescription, setGameDescription] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<string>("1");
  const [winnerAmount, setWinnerAmount] = useState<string>("");
  const [winFactor, setWinFactor] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("1");

  const [gameId, setGameId] = useState<string>("");
  const [updatedGameName, setUpdatedGameName] = useState<string>("");
  const [updatedBy, setUpdatedBy] = useState<string>("1");
  const fetchGames = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://197.248.122.31:3000/api/games/fetch-games", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setGames(data.data.games || []);
        setResponseMessage("");
      } else {
        throw new Error(data.message || "Failed to fetch games.");
      }
    } catch (error: unknown) {
      setResponseMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  const handleInsertGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");
    setIsLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://197.248.122.31:3000/api/insert-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game_name: gameName,
          game_description: gameDescription,
          game_status: gameStatus,
          winner_amount: winnerAmount,
          win_factor: winFactor,
          createdby: createdBy,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResponseMessage("Game inserted successfully!");
        fetchGames();
        setActiveForm(null); // Close form after successful insert
      } else {
        throw new Error(data.message || "Insert failed.");
      }
    } catch (error: unknown) {
      setResponseMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage("");
    setIsLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://197.248.122.31:3000/api/update-game", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game_id: parseInt(gameId, 10),
          game_name: updatedGameName,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResponseMessage("Game updated successfully!");
        fetchGames();
        setActiveForm(null); // Close form after successful update
      } else {
        throw new Error(data.message || "Update failed.");
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
    fetchGames();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Game Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveForm(activeForm === "insert"? null : "insert")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: activeForm === "insert" ? "#007BFF" : "#f0f0f0",
            color: activeForm === "insert" ? "#fff" : "#000",
            borderRadius: "5px",
          }}
        >
             Insert Game
        
         
        </button>
        <button
    onClick={() =>
      setActiveForm(activeForm === "update" ? null : "update")
    }
    style={{
      padding: "10px 20px",
      backgroundColor: activeForm === "update" ? "#007BFF" : "#f0f0f0",
      color: activeForm === "update" ? "#fff" : "#000",
      borderRadius: "5px",
    }}
  >
   

          Update Game
        </button>
      </div>

      {responseMessage && (
        <p
          style={{
            color: responseMessage.includes("successfully") ? "green" : "red",
          }}
        >
          {responseMessage}
        </p>
      )}

     {/* Update Form */}
     {activeForm === "update" && (
        <form onSubmit={handleUpdateGame}>
          <div style={{ marginBottom: "10px" }}>
            <label>Game ID:</label>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Updated Game Name:</label>
            <input
              type="text"
              value={updatedGameName}
              onChange={(e) => setUpdatedGameName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="updatedBy">Updated By:</label>
            <input
              type="number"
              id="updatedBy"
              value={updatedBy}
              onChange={(e) => setUpdatedBy(e.target.value)}

              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" disabled={isLoading} style={{ padding: "10px 20px" }}>
            {isLoading ? "Processing..." : "Update Game"}
          </button>
        </form>
     )
    }
{activeForm === "insert" && (
    <form onSubmit={handleInsertGame}>
      <div style={{ marginBottom: "10px" }}>
        <label>Game Name:</label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Game Description:</label>
        <input
          type="text"
          value={gameDescription}
          onChange={(e) => setGameDescription(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Game Status:</label>
        <select
          value={gameStatus}
          onChange={(e) => setGameStatus(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Winner Amount:</label>
        <input
          type="number"
          value={winnerAmount}
          onChange={(e) => setWinnerAmount(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Win Factor:</label>
        <input
          type="text"
          value={winFactor}
          onChange={(e) => setWinFactor(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Created By (User ID):</label>
        <input
          type="number"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <button type="submit" disabled={isLoading} style={{ padding: "10px 20px" }}>
        {isLoading ? "Processing..." : "Insert Game"}
      </button>
    </form>
  )}

<h2>Games List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Game Name</th>
            <th>Game Description</th>
            <th>Game Status</th>
            <th>Winner Amount</th>
            <th>Win Factor</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
        {games && games.length > 0 ? (
        games.map((game: any) => (
              <tr key={game.game_id}>
                <td>{game.game_id}</td>
                <td>{game.game_name}</td>
                <td>{game.game_description}</td>
                <td>{game.game_status === "1" ? "Active" : "Inactive"}</td>
                <td>{game.winner_amount}</td>
                <td>{game.win_factor}</td>
                <td>{game.createdby}</td>
              </tr>
            ))
          ) :
           (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}></td>
            </tr>
          ) 
          }
        </tbody>
      </table>
      
    </div>
    

  );
};

export default Games;


