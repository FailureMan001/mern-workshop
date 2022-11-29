import axios from 'axios';
import {useState, useEffect} from 'react';
import NavbarComponent from './NavbarComponent';
import renderHTML from 'react-render-html';

const SingleComponent=(props)=>{

    // TODO: ดึงข้อมูลจาก API ตาม slug
    const [singleBlog, setSingleBlog] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/oneBlog/${props.match.params.slug}`)
        .then(response=>{
            setSingleBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    return(
        <div className='container p-5'>
            <NavbarComponent/>
            {singleBlog &&
                <div>
                    <h2>{singleBlog.title}</h2>
                    <div className='pt-3'>{renderHTML(singleBlog.content)}</div>
                    <p className='text-muted'>ผู้เขียน:{singleBlog.author} , เผยแพร่:{new Date(singleBlog.createdAt).toLocaleString()}</p>
                </div>
            }
        </div>
        
    )
}

export default SingleComponent;