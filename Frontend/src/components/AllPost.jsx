import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function AllPost() {

      const [users, setUsers] = useState([])
      const [error, setError] = useState("")
      const [deleteMessage, setDeleteMessage] = useState("")
      const [deleteMessageClose, setDeleteMessageClose] = useState(true)

      const getData = ()=>{
            fetch("http://localhost:8000/api/users/all-users")
            .then((response)=>{return response.json()})
            .then((result)=>{setUsers(result.data)})
            .catch((err)=>{
                  console.log(err.error)
                  setError(err.error)
            })
      }

      const handleDelete= (id) => {
            setDeleteMessageClose(false)
            setDeleteMessage("")
            fetch(`http://localhost:8000/api/users/delete-user/${id}`,{
                  method: "DELETE"
            })
            .then((res)=>{return res.json()})
            .then((res)=>{
                  setDeleteMessage(res.message)
                  setDeleteMessageClose(true)
                  getData();
            }).catch((err)=>console.log(err))
      }

      useEffect( ()=>{
            setError("")
            getData()
      },[])


      console.log(users)

      return (
            <div className="container my-2">
                  {deleteMessageClose && deleteMessage &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{deleteMessage}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setDeleteMessageClose(false)}></button>
                      </div>
                  }
                  {error &&
                        <div className="alert alert-danger mt-3" >
                              {error}
                        </div>
                  }
                  <h2 className="text-center my-4">All Data</h2>
                  <div className="row my-2">
                        {users.map((ele)=>(
                              <div key={ele._id} className="col-3 mb-3">
                                    <div className="card " style={{height: "14rem"}}>
                                          <div className="card-body text-center">
                                                <h5 className="card-title mb-5">{ele.name}</h5>

                                                <h6 className="card-subtitle mb-4 text-muted">{ele.email}</h6>
                                                <h6 className="card-subtitle mb-4 text-muted">{ele.age}</h6>

                                                <Link to={`/${ele._id}`} className="card-link btn btn-primary">
                                                      Edit
                                                </Link>

                                                <Link
                                                      className="card-link btn btn-outline-danger"
                                                      onClick={()=> handleDelete(ele._id)}
                                                >
                                                      Delete
                                                </Link>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      )
}

export default AllPost