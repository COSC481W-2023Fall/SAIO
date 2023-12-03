import React, { useState, useEffect } from 'react';
// Import Config
import config from '../../config';
import axios from 'axios';

export default function Home() {
    const [name, setName] = useState("");
    const [dataList, setDataList] = useState([])
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: localStorage.getItem('token'),
        newName: '', 
        newEmail:'',
        newPass:'',
        confirmPass:''
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
      
  
        try {
        
            if(formData.confirmPass == formData.newPass){
                console.log(formData);
                const { confirmPass, ...dataToSend } = formData;
                const response2  = await axios.put(`${config.apiUrl}/edit/`, dataToSend, {
                headers: {
                'Content-Type': 'application/json',
                },
                });

            }
            else{
                setError('Passwords do not match');
            }
        
  
          //const response2 = await axios.get(`${config.apiUrl}/signup/check-password/${pass}`);
          //const data2 = response2.data;
    
         // setPasswordExists(data2.password_exists);
  
          
        } catch (error) {
          console.error(error);
          // Handle the error here, e.g. display an error message to the user
        }
       
       
    }
    // UseEffect for getting database calendar events and setting to dataList
    useEffect(() => {
        axios.get(`${config.apiUrl}/edit/${localStorage.getItem('token')}`)
        .then(res => {
            setName(res.data)
        })
    }, []);

    return (
        <main id="main" className="x-background primaryBackground relative flex place-content-center items-center h-full">
            <div className="x-content-section secondaryBackground oppositeShadeColor theme-shadow theme-border-radius p-8 flex flex-col text-left w-3/5 h-fit">
                <div className="flex items-center  justify-between pb-6 m-0">
                    <h1 className="sixthColor text-6xl m-0">SAIO</h1>
                    <h1 className="p-0 m-0">Welcome back, {name}</h1>
                </div>

                <h2>Let's get started! <span className="sixthColor">SAIO</span> has calendar, to-do, flashcard, and notebook features. Click the icons on the sidebar to get started!</h2>

                <div className="tertiaryBackground theme-shadow theme-border-radius mt-10 p-6 text-left">
                    <div className="flex justify-between items-center">
                        <h2 className="pb-2">Update Your Info</h2>
                        </div>
                   
                    <form className="grid grid-flow-col justify-stretch" onSubmit={handleSubmit}>
                   < div className="flex justify-between items-center">
                    <button className="sameShadeColor oppositeShadeBackground grid place-content-center h-8" type="submit">Update</button></div>
                        <div className="flex flex-col pr-6">
                            <label htmlFor="name">New Name</label>
                            <input className="input" value={formData.newName} onChange={handleChange} type="text" placeholder="newName" id="newName" name="newName" />
                            <label htmlFor="newEmail">New Email</label>
                        <input className="input" value={formData.newEmail} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="newEmail" name="newEmail" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">password</label>
                            <input className="input" value={formData.newPass} onChange={handleChange} type="password" placeholder="********" id="newPass" name="newPass" />
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirmPass" type="password" className="input" value={formData.confirmPass} onChange={handleChange} placeholder="********" name="confirmPass"/>
                        </div>
                    </form>
                </div>

                <div className="flex justify-end text-right">
                    <div className="tertiaryBackground theme-shadow theme-border-radius w-3/5 flex items-center justify-evenly p-3 mt-6">
                        <p className="w-1/2">Warning: Once your account is deleted, it cannot be recovered.</p>
                        <button className="oppositeShadeColor bg-red-500 h-8 grid place-content-center">Delete Account</button>
                </div>
                </div>
            </div>
        </main>
    )
}


