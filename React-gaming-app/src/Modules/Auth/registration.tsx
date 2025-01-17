// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../App.css';

// const Registration: React.FC = () => {
//     const [formData, setFormData] = useState({
//         phone: '',
//         national_id: '',
//         player_name: '',
//         player_pin: '',
//     });
//     const [responseMessage, setResponseMessage] = useState<string | null>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://197.248.122.31:3000/api/auth/register', formData);
//             setResponseMessage(`Registration Successful: ${response.data.message}`);
//         } catch (error) {
            
//             if (axios.isAxiosError(error)) {
//                 setResponseMessage(`Error: ${error.response?.data?.message || 'An error occurred'}`);
//             } else {
//                 setResponseMessage('An unknown error occurred');
//             }
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h1 className="text-center">Player Registration</h1>
//             <form className="form-container" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="phone">Phone Number:</label>
//                     <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         className="form-control"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="national_id">National ID:</label>
//                     <input
//                         type="text"
//                         id="national_id"
//                         name="national_id"
//                         className="form-control"
//                         value={formData.national_id}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="player_name">Player Name:</label>
//                     <input
//                         type="text"
//                         id="player_name"
//                         name="player_name"
//                         className="form-control"
//                         value={formData.player_name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="player_pin">Player PIN:</label>
//                     <input
//                         type="password"
//                         id="player_pin"
//                         name="player_pin"
//                         className="form-control"
//                         value={formData.player_pin}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary mt-3">Register</button>
//             </form>
//             {responseMessage && <p className="response-message mt-3">{responseMessage}</p>}
//         </div>
//     );
// };

// export default Registration;
