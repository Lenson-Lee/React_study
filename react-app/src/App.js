import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;//마지막 컨텐트의 아이디와 같아야 한다.
                            //state의 값으로 하지 않은 이유는 어떤 데이터를
                            //push할 때 아이디값을 정할때만 사용할 뿐 ui에
                            //영향을 줄 이유가 없어서 state로 불필요한 렌더링 제외
    this.state = {
      mode:'welcome',
      selected_content_id:2,  //contents의 id에 따라 본문에 나오도록.
      subject:{
        title:'WEB', sub:'world wide web!'
      },
      //타이틀이 welcome일 때의 텍스트
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JS is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
     //var data = 배열 contents의 i번째 state를 뜻함
      //i번째 state의 id값이 2이면 CSS, CSS is for design이 나온다.
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i++;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id++;
        
        // 이 코드는 오리지널 state인 contents를 바꾼다. 새로운 변수에 concat한 데이터를 담아서 쓰기
        // this.state.contents.push({id:this.max_content_id, title: _title, desc: _desc});

        var _contents = Array.from(this.state.contents);
        _contents.push( {id:this.max_content_id, title: _title, desc: _desc});

        //위의 push와 같은 기능을 하는 concat이다. 나중에 코드 볼 때 비교할 수 있도록 남겨둠 
        //var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title: _title, desc: _desc}
        // )
        this.setState({
          contents:_contents,
          mode: 'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>

    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          //this.state.contents를 복사한 새로운 배열(concat 이외의 다른 방법 같은 개념)
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc}
              break;
            }
            i++;
          }
          this.setState({
            contents:_contents,
            mode: 'read'
          });
          console.log(_title, _desc);
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  //render() : 어떤 HTML을 그릴 것인지 결정하는 함수
  render() {
    console.log('App render');
    //mode의 값에 따라서 만들어지는 컴포넌트(render)의 결과가 바뀌도록 조건을 생성
    //<Content title = {_title}
  
  return (
    <div className="App">
      <Subject
        title={this.state.subject.title}
        sub={this.state.subject.sub}
        // Subject.js 에서 쓸 onChangePage함수를 만들었다.
        onChangePage ={function (){
          // alert("hihihi");
          this.setState({mode:'welcome'})
        }.bind(this)}
      ></Subject>

      <TOC 
        onChangePage={function(id){
          // debugger;
          this.setState({
            mode:'read',
            // id가 숫자가 아닌 문자인 경우를 대비해 JS코드 Number(id)로 형변환?
            selected_content_id: Number(id)
          });
        }.bind(this)}
        data={this.state.contents}
        ></TOC>


      <Control onChangeMode={function(_mode){
        if(_mode === 'delete') {
          if(window.confirm('정말 지우겠습니까?')){
            //확인 = true, 취소 = false 가 되는게 confirm
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while(i< _contents.length) {
              if(_contents[i].id === this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i++;
            }
            this.setState({
              mode:'welcome',
              contents:_contents
            })
            alert('삭제완료!');
          }
        } else {
          this.setState({
            mode:_mode
        });
      }
      }.bind(this)}
      ></Control>

      {this.getContent()}
    </div>
  );
}
}

export default App;