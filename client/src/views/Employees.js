import React, { useEffect, useState, useContext } from "react";
import { AppContext, getFetch } from "../context/AppContext";
import PostForm from "../components/PostForm";

function Employees() {
  const [users, setUsers] = useState(null)
const context = useContext(AppContext);

  useEffect(() => {

      getFetch('/api/users', (err, res) => {
        if(err) console.log(err);
        setUsers(res.results);
      })
      
  }, [])

  const inputs = [
    { type: "text", name: "username", placeholder: "Username" },
    { type: "text", name: "realName", placeholder: "Name and surname" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "text", name: "role", placeholder: "Role" },
  ];

  const afterPost = (res) => {
    getFetch('/api/users', (err, res) => {
      if(err) console.log(err);
      setUsers(res.results);
    })
  }

  return (
    <div>
      {users && 
        <div>
          <table className="ticket-table">
            <tr className="ticket-tr">
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
            <tbody>
              {users.map(x => {
                return (<tr>
                  <td>{x.user_id}</td>
                  <td>$ {x.username}</td>
                  <td>{x.role}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      }
      <div>
        <PostForm apiPath="/api/users" inputs={inputs} afterPost={afterPost} />
      </div>
    </div>
  );
}

export default Employees;
