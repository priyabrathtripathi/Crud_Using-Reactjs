import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  { useParams } from 'react-router-dom'
import { useState } from 'react'
import "../addUser/Add.css"
import axios from 'axios'
import toast from 'react-hot-toast'
export const Edit = () => {
  const users ={
    fname:"",
    lname:"",
    email:""
  }
  const {id}=useParams();
  const navigate=useNavigate();
  
  const [user,setUser]=useState(users);


  const inputChangeHandler = (e)=>{
    const {name,value} =e.target;
    setUser({...user,[name]:value});
    console.log(user);
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/findbyid/${id}`).then((res)=>{

      setUser(res.data);

    }).catch((err)=>{

      console.log(err);
    })
  },[id])

  const submitForm =async (e) =>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`,user).then((response)=>{
        toast.success(response.data.msg,{position:"top-right"})
        navigate("/")

    }).catch(error=>console.log(error))
  }

  return (
    <div className='addUser'>
    <Link to={"/"}>Back</Link>
    <h3>Update user credentials</h3>
    <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
         <label htmlFor='fname'>First name</label>
         <input type="text" value={user.fname} onChange={inputChangeHandler} name="fname" id="fname" autoComplete="on"/>
        </div>
        <div className='inputGroup'>
         <label htmlFor='lname'>Last name</label>
         <input type="text" value={user.lname} onChange={inputChangeHandler} name="lname" id="lname" autoComplete="on"/>
        </div>
        <div className='inputGroup'>
         <label htmlFor='email'> Email</label>
         <input type="email" value={user.email} onChange={inputChangeHandler} name="email" id="email" autoComplete="on"/>
        </div>
        <div className="inputGroup">
            <button type='submit'> Update User</button>
        </div>
    </form>
</div>
  )
}
