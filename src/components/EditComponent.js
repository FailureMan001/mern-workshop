import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { getToken } from "../services/authorRize";
const EditComponent = (props)=>{
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title, author, slug} = state
    const [content, setContent] = useState('')

    const submitContent = (event)=>{
        setContent(event)
    }

    // TODO: ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/oneBlog/${props.match.params.slug}`)
        .then(response=>{
            const {title, content, author, slug} = response.data
            setState({...state, title,author, slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    //* ฟังก์ชันอัพเดตข้อมูล
    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}
                    />
                </div>

                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pd-5 mb-3"
                    />
                </div>

                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author} 
                        onChange={inputValue("author")}
                    />
                </div>
                <br/>

                <input type="submit" value="Update" className="btn btn-primary" />
                
            </form>
    )

    //* กำหนดค่าให้กับ state
    const inputValue = name => event=>{
        // console.log(name, "=", event.target.value) //เอาไว้ทำการ  Debug
        setState({...state, [name]:event.target.value});
    }

    //* ฟังก์ชันปุ่ม submitForm
    const submitForm = (e) =>{
        e.preventDefault();
        // onsole.table({title, content, author})
        // console.log("API URL = ", process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/oneBlog/${slug}`, {title, content, author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire('แจ้งเตือน','อัพเดตข้อมูลเรียบร้อย','success')
            //  const {title, content, author, slug} = response.data
             setState({...state, title:"", author:"", slug:""})
             setContent(content)
             
             
        })
        .catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            
            {showUpdateForm()}
        </div>
    )
}

export default EditComponent;