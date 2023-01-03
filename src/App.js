import './App.css';
import NavbarComponent from './components/NavbarComponent';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import renderHTML from 'react-render-html';
import {getUsername, getToken} from './services/authorRize'

function App() {
  // TODO: การดึงข้อมูลจาก API ในส่วนของฝั่ง client
  //* [Allblog, setAllBolg] เป็น state ที่เอาไว้เก็บค่าที่ไปดึงมาจาก API
  //* useState([]) เป็น Array state box ที่เอาไว้เก็บข้อมูลเป็นแบบ Array
  const [Allblog, setAllBolg] = useState([])

  //* ดึงข้อมูลจาก API
  const fetchData = () =>{
    axios.get(`${process.env.REACT_APP_API}/Allblog`)
    .then(response=>{
      setAllBolg(response.data)
    })
    .catch(err=>alert(err))
  }
  //* ตัวดัก API (useEffect)
  useEffect(()=>{
    fetchData()
  })

  // TODO: ฟังก์ชันลบบทความ
  const conFirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่ ?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      // OK
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
    
    // TODO: ฟังก์ชันลบบทความ
    const deleteBlog=(slug)=>{
      //* ส่ง request ไปที่ API เพื่อลบข้อมูล
      axios.delete(`${process.env.REACT_APP_API}/oneBlog/${slug}`,
      {
          headers:{
              authorization:`Bearer ${getToken()}`
          }
      })
      .then(response=>{
        Swal.fire("Deleted!",response.data.message,"success")
        // * เมื่อลบข้อมูลแล้ว จะให้ทำการแสดงข้อมูลทั้งหมดใหม่อีกรอบ
        fetchData()
      })
      .catch(err=>alert(err))
    }
  }
//////////////////////////////////////////////////////////

  return (
   <div className="container p-5">
      <NavbarComponent/>
      {/* {JSON.stringify(Allblog)} เอาไว้ Debug ว่าข้อมูลวิ่งมาหรือไม่*/}

      {Allblog.map((oneBlog, index)=>(

        <div className='row' key={index} style={{borderBottom:'1px solid silver'}}>
          <div className='col pt-3 pb-2'>

            <Link to={`/oneBlog/${oneBlog.slug}`}>
                <h2>{oneBlog.title}</h2>
            </Link>
            
            <div className='pt-3'>{renderHTML(oneBlog.content.substring(0,250))}</div>
            
            <p className='text-muted'>ผู้เขียน:{oneBlog.author} , เผยแพร่:{new Date(oneBlog.createdAt).toLocaleString()}</p>
            {getUsername() && (
              <div>
                <Link className='btn btn-outline-success' to={`/oneBlog/edit/${oneBlog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                <button className='btn btn-outline-danger' onClick={()=>conFirmDelete(oneBlog.slug)}>ลบบทความ</button>
              </div>
            )}
          </div>
        </div>

      ))}

   </div>
  );
}

export default App;
