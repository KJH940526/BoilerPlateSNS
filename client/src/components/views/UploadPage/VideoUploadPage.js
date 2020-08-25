import React, { useState } from 'react'
import {Typography,Button,Form,message,Input} from 'antd'
import Icon from "@ant-design/icons"
import DropZone from 'react-dropzone'

const { TextArea } = Input
const { Title } = Typography

const PrivateOptions = [
  {value:0, label: "Private"},
  {value:1, label: "Public"}
];

const CategoryOptions = [
  {value:0 ,label: "Film & Animation"},
  {value:1 ,label: "Autos"},
  {value:2 ,label: "Music"},
  {value:3 ,label: "Pets"},
]


function VideoUploadPage(props) {

  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")

  const [Private, setPrivate] = useState(0) //Private는 0이고 Public이면 1로 할 예정
  const [Category, setCategory] = useState("Film & Animation")


  return (
    <div style={{ maxWidth: "700px", margin: "2rem auth" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*드랍존*/}

          <DropZone onDrop multiple maxSize>
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

        <lable>Title</lable>
        <Input onChange value={VideoTitle} />
        <br />
        <br />

        <lable>Description</lable>
        <TextArea onChange value={Description} />
        <br />
        <br />

        <select onChange>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.vale}</option>
          ))}
        </select>

        <br />
        <br />

        <select onChange>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.vale}</option>
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
