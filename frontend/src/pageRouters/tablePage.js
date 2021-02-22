import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHook";
import UserList from "./components/UserList";

export const MainPage = () => {
  const [userData, setData] = useState([]);
  const context = useContext(authContext);
  const {request} = useHttp();

  useEffect(() => {

    let fetchdata = async() =>{
      let reqdata = await request('/api/table', 'PUT', {id:context.id})
      if (!reqdata.blocked){
        fetch("/api/table")
        .then((answer) => answer.json())
        .then((data) => {
          setTimeout(() => {
            setData(data);
          }, 100);
        });
      } else {
        context.logout();
      }
    }
    fetchdata();
  }, []);

  return (
    <div>
      <div className="header">
        <div className="headerLogo">List of Registered Users</div>
        <UserList users={userData} />
      </div>
    </div>
  );
};