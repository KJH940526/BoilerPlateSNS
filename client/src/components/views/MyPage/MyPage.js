import React, { useState, useEffect } from "react";
import axios from 'axios'
import { withRouter} from 'react-router-dom'
import Dropzone from "react-dropzone";  //다운 받기
import { useSelector } from "react-redux";

function MyPage(props) {
  //https://velog.io/@kim6515516/useSelector%EC%83%81%ED%83%9C%EC%A1%B0%ED%9A%8C-useDispatch%EC%95%A1%EC%85%98-%EB%94%94%EC%8A%A4%ED%8C%A8%EC%B9%98
  
  const user = useSelector(state => state.user);
  console.log("유저",user)
  console.log("유저 데이타",user.userData)
  //함수나 const로 정의한곳 안에서만 써야하는데 추후 자세히 알아보기,
  //처음에 user.userData가 언디파인드가 뜨는 이유??
  //리액트의 생성주기 다시한번 공부하기
  //useSelector 공부하기
  //onConfirmPasswordHandler 이부분 주석 지워보기

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("")

  const [currentName, setCurrentName] = useState("");
  const [UpdateName, setUpdateName] = useState("");

  const [currentImage, setCurrentImage] = useState("");
  const [FilePath, setFilePath] = useState("");


  useEffect(() => {
    axios.get("api/users/auth").then((response) => {
      let {name, image, password} = response.data
      console.log("MyPage라고 말해주세요", response.data);
        if(response.data.isAuth){
          console.log("마이페이지",props)
          console.log("response.data에 들어옴")
          setCurrentName(name)
          setCurrentImage(image)
          setcurrentPassword(password)  
          //이거 위에 주석처리해보고 아래 콘솔을 비교해보면 useeffect가 어떤 원리로 돌아가는지 느낌 잡을수 있음
          

          // console.log("useeffect 커런트네임", currentName)     //? useeffect안에서는 값이 변하지 않는다. //이거 녹음해놓음
          // console.log("useeffect 커런트이미지", currentImage)
          // console.log("useeffect 커런트 비밀번호",currentPassword)

        } else {
          alert("유저정보를 가져오는데 실패했습니다.")
          console.log("마이페이지",props)
          props.history.push("")
        }
    });
  }, []);

  // console.log("커런트네임", currentName) 
  // console.log("커런트이미지", currentImage)
  // console.log("커런트 비밀번호",currentPassword)

  



  const onNameHandler = (event) => {
    setUpdateName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    // console.log(user.userData);
    // console.log(user.userData.isAuth)

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
      password: Password !== "" ? Password : currentPassword,
      image: FilePath !== "" ? FilePath : currentImage,
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
