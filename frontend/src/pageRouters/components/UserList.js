import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/httpHook";

function UserList(props) {
  const [status, setStatus] = useState([]);
  const { request} = useHttp();

  useEffect(() => {
    setStatus(
      props.users.map(user=>{
        return {id:user.id, blocked:false};
      })
    )
  }, [props.users])

  function makeListOf(){
    let blockedId = [];
    for (let i = 0; i < status.length; i ++){
      if (status[i].blocked){
        blockedId.push(status[i].id);
      }
    }
    return blockedId;
  }

  function blockHandler(){
    let blockedId = makeListOf();
    request('/api/table/changest', 'PUT', {status:true, id:blockedId});
    window.location.reload(false);
  }

  function unblockHandler(){
    let unblockedId = makeListOf();
    request('/api/table/changest', 'PUT', {status:false, id:unblockedId});
    window.location.reload(false);
  }

  function deleteHandler(){
    let deleteId = makeListOf();
    request('/api/table/changest/', 'DELETE', {id:deleteId});
    window.location.reload(false);
  }

  const style = {
    toolbar: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    btn: {
      marginRight: "5px",
    },
  };

  return (
    <div>
      <div className="toolbar justify-content-center" style={style.toolbar}>
        <button type="button" className="btn btn-secondary" style={style.btn} onClick={blockHandler}>
          Block
        </button>
        <button type="button" className="btn btn-success" style={style.btn} onClick={unblockHandler}>
          Unblock
        </button>
        <button type="button" className="btn btn-danger" style={style.btn} onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange = {event => {
                  setStatus(
                    status.map(data => {
                      data.blocked = event.target.checked;
                      return data;
                    })
                  )
                }}
              ></input>
            </th>
            <th scope="col">id</th>
            <th scope="col">Login</th>
            <th scope="col">Email</th>
            <th scope="col">Registration date</th>
            <th scope="col">Last Login</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, idx) => {
            return (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox" onChange={event => {
                      setStatus(
                      status.map(data => {
                        if (data.id === user.id){
                          data.blocked = event.target.checked;
                        }
                        return data;
                      })
                    )}}
                    checked={status.length > 0 ? status[idx].blocked : false}
                  ></input>
                </td>
                <td>{user.id}</td>
                <td>{user.login}</td>
                <td>{user.email}</td>
                <td>{user.regData}</td>
                <td>{user.lastLogin}</td>
                <td>{user.blocked ? "Blocked" : "Free as a bird"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
