import React, { useState } from "react";

const GameManagement: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"insert" | "update" | null>(null); // Track which form is active
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Insert Game State
  const [gameName, setGameName] = useState<string>("");
  const [gameDescription, setGameDescription] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<string>("1"); // Default
  const [winnerAmount, setWinnerAmount] = useState<string>("");
  const [winFactor, setWinFactor] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("1");

  // Update Game State
  const [gameId, setGameId] = useState<string>("");
  const [updatedGameName, setUpdatedGameName] = useState<string>("");
  const [updatedBy, setUpdatedBy] = useState<number>(1);

  // Handle Insert Game
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

      if (!response.ok) {
        throw new Error(data.message || "Insert failed.");
      }

      if (data.success) {
        setResponseMessage("Game inserted successfully!");
      } else {
        setResponseMessage("Insert operation failed.");
      }
    } catch (error: any) {
      setResponseMessage(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Update Game
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
          updatedby: createdBy,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed.");
      }

      if (data.success) {
        setResponseMessage("Game updated successfully!");
      } else {
        setResponseMessage("Update operation failed.");
      }
    } catch (error: any) {
      setResponseMessage(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Game Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveForm("insert")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: activeForm === "insert" ? "#007BFF" : "#f0f0f0",
            color: activeForm === "insert" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Insert Game
        </button>
        <button
          onClick={() => setActiveForm("update")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeForm === "update" ? "#007BFF" : "#f0f0f0",
            color: activeForm === "update" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Game
        </button>
      </div>

      {responseMessage && (
        <p style={{ color: responseMessage.includes("successfully") ? "green" : "red" }}>
          {responseMessage}
        </p>
      )}

      {/* Insert Form */}
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
            onChange={(e) => setUpdatedBy(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
          </div>
          <button type="submit" disabled={isLoading} style={{ padding: "10px 20px" }}>
            {isLoading ? "Processing..." : "Update Game"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GameManagement;
