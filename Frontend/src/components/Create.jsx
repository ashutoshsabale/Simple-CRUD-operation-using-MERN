import { useState, } from 'react'
import { useNavigate } from 'react-router-dom'

function Create() {
      const [email, setEmail] = useState("")
      const [name, setName] = useState("")
      const [age, setAge] = useState(0)
      const [error, setError] = useState("")
      const navigate = useNavigate()

      const handleSubmit= async (e)=>{
            e.preventDefault();
            console.log(`Email is ${email} Name is ${name} Age is ${age}`);
            const createUser = {email, name, age}

            const response = await fetch("http://localhost:8000/api/users/register",{
                  method:"POST",
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify(createUser)
            })

            const result = await response.json()

            if(!response.ok){
                  console.log(result.error)
                  setError(result.error)
            }

            if(response.ok){
                  console.log(result)
                  setError("")
                  setEmail("")
                  setName("")
                  setAge(0)
                  navigate("/all-posts")

            }
      }

      return (
            <div className='container-sm'>
                  {error &&
                        <div className="alert alert-danger mt-3" >
                              {error}
                        </div>
                  }
                  <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                              <input
                                    type="email"
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
                                    className="form-control"
                                    id="exampleInputAge1"
                                    onChange={(e)=>setAge(e.target.value)}
                              />
                        </div>

                        <button type="submit" className="btn btn-primary">
                              Submit
                        </button>
                  </form>
            </div>
      )
}

export default Create