import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
      const {id} = useParams()

      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [age, setAge] = useState(0)

      const [error, setError] = useState("")
      const [successMessage, setSuccessMessage] = useState("")

      const navigate = useNavigate()

      const handleSubmit = async (e) =>{
            e.preventDefault();
            // const infoToBeUpdated = {fname, email, age}
            // fetch(`http://localhost:8000/api/users/update-user/${id}`,{
            //       method:"PATCH",
            //       headers:{
            //             "Content-Type":"application/json"
            //       },
            //       body:JSON.stringify({ infoToBeUpdated })

            // })
            // .then((res)=>{return res.json()})
            // .then((res)=> {
            //       setSuccessMessage(res.message)
            //       console.log(res)
            //       navigate("/all-post")
            // })
            // .catch((err)=>console.log(err))

            const updatedUser = { name, email, age };
            console.log(updatedUser);
            const response = await fetch(`http://localhost:8000/api/users/update-user/${id}`, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedUser),
            });
            const result = await response.json();
            if (response.ok) {
                  console.log("updated result..", result);
                  setSuccessMessage(result.message)
                  // navigate("/all-posts");
            }
            if (!response.ok) {
                  console.log(result.error);
                  setError(result.error);
            }
      }

      const getSingleUser = () =>{
            fetch(`http://localhost:8000/api/users/${id}`)
            .then((res)=>{
                  return res.json()
            })
            .then((result)=>{
                  setName(result.data.name)
                  setEmail(result.data.email)
                  setAge(result.data.age)
            })
      }

      useEffect(()=>{
            getSingleUser()
      },[])

      return (
            <div className='container-sm'>
                  {successMessage &&
                        <div className="alert alert-danger mt-3" >
                              {successMessage}
                        </div>
                  }
                  <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                              <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={(e)=> setEmail(e.target.value)}
                              />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputName1" className="form-label">Name</label>
                              <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    id="exampleInputName1"
                                    onChange={(e)=>setName(e.target.value)}
                              />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleInputAge1" className="form-label">
                                    Age
                              </label>
                              <input
                                    type="number"
                                    value={age}
                                    className="form-control"
                                    id="exampleInputAge1"
                                    onChange={(e)=>setAge(e.target.value)}
                              />
                        </div>

                        <button type="submit" className="btn btn-primary">
                              Update
                        </button>
                  </form>
            </div>
      )
}

export default Update