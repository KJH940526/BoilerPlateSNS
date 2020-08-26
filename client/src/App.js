import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// 이것도 수정해줘야하는거 아닌가? 이름만 정해주는거라서 필요가 없음
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

//- 추가한거
import MyPage from './components/views/MyPage/MyPage';
import Confirmation from './components/views/Confirmation/Confirmation'
import NotConfirmation from './components/views/NotConfirmation/NotConfirmation';

import Auth from './hoc/auth'

//공부한거
import VideoUploadPage from './components/views/UploadPage/VideoUploadPage'



function App() {
  return (
    <Router>
      <div>
        <Switch>  
                      
          <Route exact path="/" component={Auth(LandingPage, null)} />


          <Route exact path="/login" component={Auth(LoginPage, false)} />

          <Route exact path="/register" component={Auth(RegisterPage,false)} />

                                                    {/*Auth가 나중에 실행됨*/}
          {/* <Route exact path="/mypage" component={Auth(MyPage,true)} /> */}
          <Route exact path="/mypage" component={Auth(MyPage)} />

          <Route path="/confirmation" component={Auth(Confirmation,true)} />

          <Route exact path="/notconfirmation" component={Auth(NotConfirmation,true)}/>


          <Route exact path="/video/upload" component={Auth(VideoUploadPage,true)}></Route>


        </Switch>
      </div>
    </Router>
  );
}


export default App;

