import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

interface InventoryData {
    id: number;
    category: string;
    ticketsSold: number;
    pricePerTicket: number;
    totalAmount: number;
    date: string;
}

const InventoryTracker: React.FC = () => {
    const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchInventoryData = async () => {
            try {
                const response = await axios.get<InventoryData[]>('https://api.example.com/inventory'); // Replace with your actual API endpoint
                setInventoryData(response.data);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventoryData();
    }, []);

    // Calculate total money made per day
    const calculateTotalPerDay = (date: string) => {
        return inventoryData
            .filter((item) => item.date === date)
            .reduce((total, item) => total + item.totalAmount, 0);
    };

    // Get unique dates from inventory data
    const uniqueDates = Array.from(new Set(inventoryData.map((item) => item.date)));

    return (
        <div className="container mt-4">
            <h1 className="text-center">Inventory </h1>
            <div className="table-container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Tickets Sold</th>
                            <th>Price per Ticket</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.length > 0 ? (
                            inventoryData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td>{item.category}</td>
                                    <td>{item.ticketsSold}</td>
                                    <td>{item.pricePerTicket.toFixed(2)}</td>
                                    <td>{item.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2 className="mt-5">Total Money Made Per Day</h2>
            <div className="table-container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueDates.map((date) => (
                            <tr key={date}>
                                <td>{date}</td>
                                <td>{calculateTotalPerDay(date).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryTracker;
