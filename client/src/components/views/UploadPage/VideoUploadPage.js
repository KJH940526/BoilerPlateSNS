import React, { useState } from 'react'
import {Typography,Button,Form,message,Input} from 'antd'
import Icon from "@ant-design/icons"
import DropZone from 'react-dropzone'
import Axios from 'axios'
import { useSelector } from "react-redux";

// 0. OnDrop func 만들기
// 1. 노드 서버에 파일을 저장하기 위해 디펜던시를 다운로드
// 1-1 npm install multer --save ==> 서버에 저장하기 떄문에 server 폴더에서 다운로드\
// 2 비디오 파일을 서버로 보내기
// 3. 받은 비디오 파일을 서버에서 저장
// 4. 파일 저장 결로를 클라이언트로 전달해주기



const { TextArea } = Input
const { Title } = Typography

const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' }
]

const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
]


function VideoUploadPage(props) {
  // const user = useSelector(state => state.user);
  // console.log("유저유저유저유저",user)
  // 주석 잡고 풀어보기

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0)
  const [Categories, setCategories] = useState("Film & Animation")


  const handleChangeTitle = (event) => {
    console.log("이벤트",event);
    console.log("이벤트.커런트타겟",event.currentTarget);
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {

    setDescription(event.currentTarget.value);
  };

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  };
  
                  //파라미터(변수)로 files를 받는다.
  const onDrop = (files) => {
    console.log("온드랍파일",files);
    console.log("대문자 FormData", FormData);
    let formData = new FormData
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    // https://www.google.com/search?sxsrf=ALeKk03lvc4kUJ7wcdFoFWRZf1F-W-ZfDQ%3A1598425153949&ei=QQhGX4DUOYq6mAWQwaPQDw&q=content-type+%EC%9A%94%EC%B2%AD+%ED%97%A4%EB%8D%94%EA%B0%80+access-control-allow-headers+%EB%AA%A9%EB%A1%9D%EC%97%90+%EC%9E%88%EC%A7%80+%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4&oq=content-type+%E3%85%87&gs_lcp=CgZwc3ktYWIQARgBMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgcIABBHELADOgQIABAeOgYIABAFEB46BggAEAgQHlD9A1jDN2CYZWgCcAB4AIABhgGIAdUCkgEDMS4ymAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab
    // https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Type
    // content-type 헤더는 클라이언트에게 반환된 컨텐츠의 켄턴츠 유형이 실제로 무엇인지를 알려줍니다.
    // https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/POST
    // multipart로 검색해보기
    
    //https://www.google.com/search?sxsrf=ALeKk01KgHmR0n3EeF2DT2G8Oe6WJJHDPQ%3A1598425186162&ei=YghGX4S0CYvemAXYsIKgBA&q=content-type+multipart%2Fform-data&oq=content-type+&gs_lcp=CgZwc3ktYWIQAxgDMgQIIxAnMgcIABAUEIcCMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BwgAEEcQsANQ2w1Y2w1g5ChoAXAAeACAAXKIAXKSAQMwLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab

    // https://soooprmx.com/archives/9626
    
    /* 
      파일 업로드를 구현할 떄, 클라이언트가 웹브라우저라면
      폼을 통해서 파일을 등록해서 전송하게 됩니다.
      이때 웹브라우저가 보내는 HTTP 메세지는 Content-Type 속성이
      multipart/form-data로 지정되며, 정해진 형식에 따라 메세지를
      인코딩하여 전송하게됩니다. 이를 처리하기 위한 서버는
      멀티파트 메세지에 대해서 각 파트별로 분리하여 개별 파일의 정보를
      얻게됩니다.
    */

    console.log("온드랍 폼데이타",formData);

//https://developer.mozilla.org/ko/docs/Web/API/FormData/FormData

            //첫번쨰거를 가져오기위해서 배열로함
    formData.append("file", files[0])
//FormData.append를 사용하여 key/value 쌍을 추가할 수 있습니다:
//https://developer.mozilla.org/ko/docs/Web/API/FormData/append



  //https://yohanpro.com/posts/codereview/2 
  //만약 추가로 formData에 값을 집어넣어 req.body에서 
  //사용하고 싶다면 메소드 안에 따로 append해서 저장해 두어야 한다.
  console.log("온드랍 폼데이타 어펜드",formData.append);

  Axios.post('/api/video/uploadfiles', formData, config)
      .then((response)=>{
        if(response.data.success){

          
        } else {
          alert("업로드 실패했습니다.")
        }
      })

  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auth" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*드랍존*/}

          <DropZone 
          onDrop={onDrop}
          multiple={false} 
          maxSize={10000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
              </div>
            )}
          </DropZone>

          {/*썸네일*/}
          <div>
            <img src alt />
          </div>
        </div>
        <br />
        <br />

        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />

        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={handleChangeDecsription} value={Description} />
        <br />
        <br />

        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={handleChangeTwo}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type="primary" size="large" onClick>
          제출
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage
