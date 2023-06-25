'use client';
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LoginUI from './component/loginUI'
import HomeNavbar from './component/navbar'
import { useEffect, useState} from 'react'
import {FiEdit} from 'react-icons/fi'

import {ImCancelCircle} from 'react-icons/im'
import {MdDelete} from 'react-icons/md'
import {FaPlusCircle} from 'react-icons/fa'
import { fetchData } from 'next-auth/client/_utils';


export default function Home() {

  const {data:session}=useSession();
  const router=useRouter();
  const [allNotes, setAllNotes] = useState([]);
  const [editNote, setEditNote] = useState([]);
  const [createNote, setCreateNote] = useState(false);
  let [note, setNote] = useState({
    title:"",
    description:""
  })

  const [status, setStatus] = useState(null)
  
  useEffect(() => {
    fetchData();
         
  }, [session]);

  async function fetchData(){
    if(!session){
      return;
    }else{
      const notes=await fetch('/api/notes',{
        method:"POST",
        headers:{"Content_Type":"application/json"},
        body:JSON.stringify({email:session.token.email})
      })
      const dataNotes=await notes.json();
      
      dataNotes.sort((a,b)=>{

        const date1=new Date(a.updatedAt);
        const date2=new Date(b.updatedAt);
        return date2-date1;
        
      })

      setAllNotes(dataNotes);  
      setEditNote(Array.from({ length: dataNotes.length }, () => ({ disabled: true })));
      setHeight(dataNotes.length);
    }   
  }

  const setHeight=(length)=>{

    for(let i=0;i<length;i++){
      if(document.getElementsByClassName("desc")[i]){
        const element=document.getElementsByClassName("desc")[i];
        element.style.height=`${element.scrollHeight}px`
      }
    }
  }

  
  const changeHeight=(e)=>{

    // console.log(e)
    e.target.style.height=`10px`;
    e.target.style.height=`${e.target.scrollHeight}px`;
    
  }

  const handleInputChange=(index)=>(e)=>{
    
    const { name, value } = e.target;
    // console.log({name,value})
    const updatedArr = [...allNotes];
    updatedArr[index] = { ...updatedArr[index], [name]: value };
    setAllNotes(updatedArr);
    
  };

  const setDisabledAtIndex=(index)=>(e)=>{
    setEditNote(prevEditNote=>{
      const updateEditNote=[...prevEditNote];
      updateEditNote[index]={...updateEditNote[index],disabled:false};
      return updateEditNote;
    });
  };

  const handleUpdate=(index)=>async(e)=>{
    
    const {title,description,_id}=allNotes[index];
    // console.log({title,description});
    
    try {
      const response= await fetch('/api/notes/update',{
        method:"PATCH",
        headers:{
          "Content_Type":"application/json",
          "id":_id,
        },
        body:JSON.stringify({
          title,
          description,
        })
      })
      if(response.status===200){
        // console.log("updated successfully");
        await fetchData();
      }
      else{
        // console.log("error in updating");
      }
    } catch (error) {
      // console.log("error in updating");
    }

  }

  const handleDelete=(index)=>async(e)=>{
    const {_id}=allNotes[index];

    // console.log(allNotes[index]);
    
    try {
      const response=await fetch('api/notes/delete',{
        method:"DELETE",
        headers:{
          "Content_Type":"application/json",
          "id":_id,
        }
      })
      if(response.status===200){
        // console.log("deleted successfully");
        await fetchData();
      }
      else{
        // console.log("error in deleting");
      }
    } catch (error) {
      // console.log("error in deleting");
    }
  }


  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setNote((prevuser)=>({
        ...prevuser,[name]:value
    }));  
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      // console.log(session.token.email)
      try {
          const response=await fetch('/api/notes/create',{
              method:"POST",
              headers:{"Content_Type":"application/json"},
              body:JSON.stringify({
                  email:session.token.email,
                  title:note.title,
                  description:note.description
              })
          })
          if(response.status===200){
              setNote({
                  title:"",
                  description:"",
                  
              })
              setStatus("success");
              await fetchData();
              setTimeout(() => {
                  setStatus(null);
              }, 3000);

              
          }
          else{
              setStatus("fail");
          }
      } catch (error) {
          setStatus("fail");
      }
  }
  
  
  
  if(!session){
    return (
      <>
      <div>
        <LoginUI/>
        
      </div>
      </>
    )
  }
  
  
  
  return (
    <>
    <Head>
      <title>AkaNotes-Your Notes</title>
    </Head>
    <div className='relative h-[100vh]'>
      <HomeNavbar/>
      {createNote &&(
        <section className='h-[70%] w-[50%] bg-[#f7f3f3] flex flex-col items-center fixed top-32 left-72 z-50'>
          <div className='relative h-10 w-full text-center text-2xl font-semibold bg-green-400 p-1'>Make Note
          <button className='absolute right-3 top-1' onClick={()=>{setCreateNote(false)}}><ImCancelCircle/></button>
          </div>

          <div className='mt-10'>
            <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                <input name="title" value={note.title} onChange={handleChange} type="text" required placeholder='Enter Title' className='p-1 w-96 border-2 border-solid border-[#b6a2a2]' />
                <textarea name="description" value={note.description} onChange={handleChange} required id="" cols="30" rows="8" placeholder='Enter description' className='border-2 border-solid border-[#b6a2a2] p-1 resize-none'></textarea>
                <button type='submit' className='bg-green-400 hover:bg-green-500 text-xl font-semibold'>Save Note</button>
            </form>
            {status==="fail" && (
                <div className='text-red-500'>internal server error</div>
            )}

            {status==="success" && (
                <div className='text-green-600'>Notes created successfully</div>
            )}
          </div>
   
        </section> 
      )}

      {(allNotes.length===editNote.length) && (allNotes.length>0) && (
        <section className='my-16 mx-44  max-w-[80%] bg-[#d2f6d5] '>
        <div className='text-center font-bold text-3xl h-[10%] py-1 bg-[#3498ff]'>Your Notes</div>
        <div className='columns-2 gap-x-10 gap-y-8 p-5 w-[100%]'>
          {
            allNotes.map((note,index)=>{
              return(
                <div key={index} className='break-inside-avoid mb-5'>
                <div className='flex flex-col bg-white rounded-md'>
                  <div className='relative font-semibold text-2xl bg-[#f1f155] px-2 py-1'>
                    <input type="text" name="title" value={note.title} disabled={editNote[index].disabled} onChange={handleInputChange(index)}  className='bg-inherit'/>
                    <span className='absolute top-1 right-1 flex space-x-3'>
                      <button onClick={setDisabledAtIndex(index)}><FiEdit/></button>
                      <button onClick={handleDelete(index)}><MdDelete/></button>

                    </span>
                  </div>
                  <textarea name="description"  cols="30" rows="1" value={note.description} onChange={handleInputChange(index)} onInput={changeHeight} disabled={editNote[index].disabled} className='desc resize-none px-2 py-1'></textarea>

                  {!editNote[index].disabled &&(
                    <div className='text-center m-4'>
                      <button onClick={handleUpdate(index)} className='bg-green-400 px-2 font-semibold text-2xl rounded-md hover:bg-green-500' >Update</button>
                    </div>
                  )}

                </div>
                </div>
              )
            })
          }

        </div>


      </section>
      )}
  
      <button onClick={()=>{setCreateNote(true)}} className='fixed top-3/4 right-10'><FaPlusCircle className='bg-[#95ea40] font-semibold text-6xl p-2 rounded-2xl'/></button>
    </div>
    
    </>
  )
}




