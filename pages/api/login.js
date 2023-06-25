// import dbConnect from "./db/conn";
// import bcrypt from "bcrypt";
// import Userdb from "./models/usermodel";




// export default async function POST(req,res) {
//     try {
        
//         await dbConnect();
//         const user=req.body;
    
//         const userData=await Userdb.findOne({email:user.email})
        

//         if(userData===null){
//             res.status(400).send("Invalid email or password")
//         }

//         else if(await bcrypt.compare(user.password,userData.password)){
//             let options={
//                 expiresIn:"1d"
//             }
//             const token=await jwt.sign({email:userData.email},"mynameisakshaykumarboss",options);
//             const response={ 
//                 name:userData.name,
//                 message:"Logged in",
//                 token:token,
//                 userid:jwt.verify(token,"mynameisakshaykumarboss")
//             }
            
//             res.status(200).send(response); 
            

//         }
//         else{
//             res.status(401).send("Invalid email or password");
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal server error");
//     } 
// }




// try {
//     const response=await fetch('/api/login',{
//         method:'POST',
//         headers:{"Content_Type":"application/json"},
//         body:JSON.stringify({
//             email:user.email,
//             password:user.password
//         })
//     })
    
    
//     if(response.status===200){
//         setUser={
//             email:"",
//             password:""
//         } 
//         console.log(user.email); 
//         // router.push('/home');
        
//     }
//     else{
//       setStatus("fail");
//     }
// } catch (error) {
//     setStatus("fail"); 
//     console.log(error);
// }



{/* <Link href='/'><span className='text-4xl font-pattya '>AkaNotes</span></Link>
          <span className='mt-3 italic leading-3 font-pattya text-2xl '>Be productive</span> */}



        //   onClick={handleEdit}
        // onClick={handleDelete}
        // onChange={changeTitle(index)}
        // ={editNote[index].disabled}
        //={editNote[index].disabled}
        //onClick={setDisabledAtIndex(index)}

        // const name=e.target.name;
    // const value=e.target.value;
    // setAllNotes((prevuser)=>({
    //     ...prevuser,[name]:value
    // }));

    // const changeTitle=(e,index)=>{
  //   const name=e.target.name;
  //   const value=e.target.value;
  //   setAllNotes((prevuser)=>({
  //       ...prevuser,[name]:value
  //   }));
  // }


  

  // const setDisabledAtIndex=(index)=>{
  //   setEditNote(prevEditNote=>{
  //     const updateEditNote=[...prevEditNote];
  //     updateEditNote[index]={...updateEditNote,disabled:false};
  //     return updateEditNote;
  //   });
  // };


  // const arr=[1,3,4,5,6,7,77,56]
  // arr.map((note,index)={
  //   return (
  //     <button onClick={handleClick(index)}></button>
  //   )
  // })
  


  {/* {editNote[index].disabled &&(
                    <div className='text-center m-4'>
                      <button className='bg-green-400 px-2 font-semibold text-2xl rounded-md'>Update</button>
                    </div>
                  )} */}