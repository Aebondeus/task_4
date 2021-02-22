import { createContext } from "react";

export const authContext = createContext({token:null, id:null, login:()=>{}, logout:()=>{}})