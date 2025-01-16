import React, { useState, useEffect } from "react";
import '../../App.css';

interface Categories {
  category_id: number;
  category_name: string;
  gc_description: string;
  gc_status: number;
  createdby: number;
  createdon: number;
  updatedon: number | null;
  updatedby: number | null;
  daily_amount: number; // Add daily_amount to Categories interface
}

const Categories: React.FC = () => {
  const [activeForm, setActiveForm] = useState<"insert" | "update" | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gameCategories, setGameCategories] = useState<Categories[]>([]);

  const [categoryName, setCategoryName] = useState<string>("");
  const [gcStatus, setGcStatus] = useState<number>(1); // 1 for active, 0 for inactive
  const [gcDescription, setGcDescription] = useState<string>("");
  const [dailyAmount, setDailyAmount] = useState<number>(0.00); // Added daily_amount state
  const [createdBy, setCreatedBy] = useState<number>(1); // Default to user ID 1

  const [categoryId, setCategoryId] = useState<number>(0);
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");

  const fetchGameCategories = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setResponseMessage("Authentication token is missing. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://197.248.122.31:3000/api/games/fetch-game-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ game_id: 1 }),
      });
  
      const data = await response.json();
      if (response.ok && data.success) {
        const categories = (data.data || []).map((category: any) => ({
          ...category,
          daily_amount: Number(category.daily_amount || 0), // Convert to number or default to 0
        }));
        setGameCategories(categories);
        setResponseMessage("");
      } else {
        throw new Error(data.message || "Failed to fetch categories.");
      }
    } catch (error: unknown) {
      setResponseMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };
  

  const handleInsertCategory = async (e: React.FormEvent) => {
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
      const response = await fetch("http://197.248.122.31:3000/api/insert-game-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          game_id: 1, // Example game_id, change based on actual logic
          category_name: categoryName,
          gc_status: gcStatus,
          gc_description: gcDescription,
          daily_amount: dailyAmount, // Include daily_amount in the payload
          createdby: createdBy,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResponseMessage("Category inserted successfully!");
        fetchGameCategories(); // Fetch the updated categories after insert
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

  const handleUpdateCategory = async (e: React.FormEvent) => {
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
      const response = await fetch("http://197.248.122.31:3000/api/update-game-category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_id: categoryId,
          category_name: updatedCategoryName,
          daily_amount: dailyAmount, // Include daily_amount in the update request
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResponseMessage("Category updated successfully!");
        fetchGameCategories(); // Fetch the updated categories after update
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
    fetchGameCategories();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Game Category Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveForm(activeForm === "insert" ? null : "insert")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: activeForm === "insert" ? "#007BFF" : "#f0f0f0",
            color: activeForm === "insert" ? "#fff" : "#000",
            borderRadius: "5px",
          }}
        >
          Insert Category
        </button>
        <button
          onClick={() => setActiveForm(activeForm === "update" ? null : "update")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeForm === "update" ? "#007BFF" : "#f0f0f0",
            color: activeForm === "update" ? "#fff" : "#000",
            borderRadius: "5px",
          }}
        >
          Update Category
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

      {/* Insert Category Form */}
      {activeForm === "insert" && (
        <form onSubmit={handleInsertCategory}>
          <div style={{ marginBottom: "10px" }}>
            <label>Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Game Status:</label>
            <select
              value={gcStatus}
              onChange={(e) => setGcStatus(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <input
              type="text"
              value={gcDescription}
              onChange={(e) => setGcDescription(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Daily Amount:</label>
            <input
              type="number"
              value={dailyAmount}
              onChange={(e) => setDailyAmount(parseFloat(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Created By:</label>
            <input
              type="number"
              value={createdBy}
              onChange={(e) => setCreatedBy(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" disabled={isLoading} style={{ padding: "10px 20px" }}>
            {isLoading ? "Processing..." : "Insert Category"}
          </button>
        </form>
      )}

      {/* Update Category Form */}
      {activeForm === "update" && (
        <form onSubmit={handleUpdateCategory}>
          <div style={{ marginBottom: "10px" }}>
            <label>Category ID:</label>
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Updated Category Name:</label>
            <input
              type="text"
              value={updatedCategoryName}
              onChange={(e) => setUpdatedCategoryName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Daily Amount:</label>
            <input
              type="number"
              value={dailyAmount}
              onChange={(e) => setDailyAmount(parseFloat(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" disabled={isLoading} style={{ padding: "10px 20px" }}>
            {isLoading ? "Processing..." : "Update Category"}
          </button>
        </form>
      )}

      {/* Display Game Categories */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
  <thead>
    <tr>
      <th>Category ID</th>
      <th>Category Name</th>
      <th>Status</th>
      <th>Description</th>
      <th>Created By</th>
      <th>Daily Amount</th>
    </tr>
  </thead>
  <tbody>
    {gameCategories && gameCategories.length > 0 ? (
      gameCategories.map((category) => (
        <tr key={category.category_id}>
          <td>{category.category_id}</td>
          <td>{category.category_name}</td>
          <td>{category.gc_status === 1 ? "Active" : "Inactive"}</td>
          <td>{category.gc_description}</td>
          <td>{category.createdby}</td>
          <td>{typeof category.daily_amount === "number" ? category.daily_amount.toFixed(2) : "N/A"}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6} style={{ textAlign: "center" }}>No categories available</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default Categories;
