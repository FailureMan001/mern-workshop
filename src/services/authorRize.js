//! เก็บข้อมูล token & username => session storage
export const authenticate = (response,next)=>{
    if(window !== "undefined"){
        //* เก็บข้อมูลลงใน session storage 
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("username", JSON.stringify(response.data.username))
    }
    next()

}

//todo: ฟังก์ชันที่ใช้ในการดึงข้อมูล token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//todo: ฟังก์ชันที่ใช้ในการดึงข้อมูล username ที่ทำการ Login
export const getUsername=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false
        }
    }
}

//todo: Logout 
export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}