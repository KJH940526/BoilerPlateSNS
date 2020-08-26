import React, { useState } from 'react'
import {Typography,Button,Form,message,Input} from 'antd'
import Icon from "@ant-design/icons"
import DropZone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from "react-redux";

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
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    // console.log(event);
    // console.log(event.currentTarget.value);
    setDescription(event.currentTarget.value);
  };

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  };
  

  const onDrop = (files) => {

    let formData = new FormData
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
                                    //첫번쨰거를 가져오기위해서 어레이로함
    formData.append("file", files[0])
  //https://yohanpro.com/posts/codereview/2 
  //만약 추가로 formData에 값을 집어넣어 req.body에서 사용하고 싶다면 메소드 안에 따로 append해서 저장해 두어야 한다.
    console.log(files)

    axios.post('/api/video/uploadfiles', formData,config)
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
