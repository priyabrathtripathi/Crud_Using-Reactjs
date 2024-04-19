import React, { useState } from 'react'
import "./Add.css"
import { Link, useNavigate, } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
export const Add = () => {
    const users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    }
    const [user, setUser] = useState(users);
    const navigate =useNavigate();
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);

    }
    const submitForm =async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8000/api/create",user).then((response)=>{
                toast.success(response.data.msg,{position:"top-right"})
                navigate("/")

            }).catch(error=>console.log(error))
    }

    return (
        <div className='addUser'>
            <Link to={"/"}>Back</Link>
             <h3>Add new user</h3>
             <form className='addUserForm' onSubmit={submitForm}>
                 <div className='inputGroup'>
                     <label htmlFor='fname'>First name</label>
                     <input type="text" onChange={inputHandler} name="fname" id="fname" autoComplete="on" />
                 <div className='inputGroup'>
                     <label htmlFor='lname'>Last name</label>
                     <input type="text" onChange={inputHandler} name="lname" id="lname" autoComplete="on" />
                 </div>
                 </div>
                 <div className='inputGroup'>
                     <label htmlFor='email'> Email</label>
                     <input type="email" onChange={inputHandler} name="email" id="email" autoComplete="on" />
                 </div>
                 <div className='inputGroup'>
                     <label htmlFor='password'>Password</label>
                     <input type="password" onChange={inputHandler} name="password" id="password" autoComplete="on" />
                 </div>
                 <div className="inputGroup">
                     <button type='submit'> Add User</button>
                 </div>
             </form>
         </div>
    )
}
