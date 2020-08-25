import React, { useState, useEffect } from "react";
import axios from 'axios'
import { withRouter} from 'react-router-dom'
// import Dropzone from "react-dropzone";  //다운 받기

function MyPage(props) {

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("")

  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [UpdateName, setUpdateName] = useState("");


  useEffect(() => {
    axios.get("api/users/auth").then((response) => {
      console.log("MyPage라고 말해주세요", response.data);
        if(response.data.isAuth){
          console.log("response.data에 들어옴")
          setCurrentName(response.data.name)
          setCurrentImage(response.data.image)
          setcurrentPassword(response.data.password) //?
          


          console.log(response.data)
          console.log("커런트네임", currentName)   //?
          console.log("커런트이미지", currentImage) //?
          console.log("커런트 비밀번호",currentPassword) //?

        } else {
          alert("유저정보를 가져오는데 실패했습니다.")
        }
    });
  }, []);

  const onNameHandler = (event) => {
    setUpdateName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = (event) => {
    event.preventDefault();



    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    console.log("커렌트 패스워드",currentPassword)
    //비크립트 떄문에 무조건 다를수밖에 없음
    console.log("패스워드", Password)
    let body = {
      name: UpdateName !== "" ? UpdateName : currentName,
      password: Password !== "" ? Password : currentPassword
    };  
    // ConfirmPassword는 데이터베이스로 보내지 않기 때문에 body x
    
    axios.post('/api/users/modify',body)
    .then((response) => console.log("mypage",response.data.user))
    alert("회원정보가 수정되었습니다.");
    props.history.push("/"); //auth에서 먼저임
  };
  



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
      >


        <label>Name</label>
        <input type="text" value={UpdateName} onChange={onNameHandler}></input>

        <label>PassWord</label>
        <input type="password" value={Password} onChange={onPasswordHandler} placeholder=""/>

        <label>Confirm PassWord</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        
        <br/>




        <button type = "submit">
          회원 수정
        </button>
      </form>
    </div>
  )
}

export default withRouter(MyPage)
