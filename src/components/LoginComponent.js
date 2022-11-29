import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUsername } from "../services/authorRize";
import {withRouter} from "react-router-dom";

const LoginComponent= (props)=>{

    const [state, setState] = useState({
        username:"",
        password:""
    })
    const {username, password} = state

    //*TODO: กำหนดค่าให้กับ state
    const inputValue = name => event=>{

        setState({...state, [name]:event.target.value});
    }

    //*TODO: ฟังก์ชันปุ่ม submitForm
    const submitForm = (e) =>{
        e.preventDefault();
        if(!username){
            return Swal.fire('กรุณากรอก username','','warning')
        }
        if(!password){
            return Swal.fire('กรุณากรอก password','','warning')
        }

        // console.table({username,password})

        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            //TODO: Login สำเร็จ
            Swal.fire('เข้าสู่ระบบแล้ว','','success')
            authenticate(response,()=>props.history.push("/create"))
        })
        .catch(err=>{
            Swal.fire('รหัสผ่านไม่ถูกต้อง',err.response.data.error,'error')
        })
       
    }
    //todo: ถ้าทำการ Login แล้วให้ตีกลับไปหน้าแรก
    useEffect(()=>{
        getUsername() && props.history.push("/")
        // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เข้าสู่ระบบ | Admin</h1>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" 
                        value={username} 
                        onChange={inputValue("username")}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" 
                        value={password} 
                        onChange={inputValue("password")}
                    />
                </div>
                <br/>

                <input type="submit" value="บันทึก" className="btn btn-primary" />
                
            </form>
        </div>
    )
}

export default withRouter(LoginComponent)