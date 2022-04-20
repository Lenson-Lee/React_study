import React, { Component} from 'react';

class UpdateContent extends Component {
    constructor(props){
      super(props);
      this.state = {
        id:this.props.data.id,
        title:this.props.data.title,
        desc:this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e){
      // 새로운 자바스크립트 언어로 title, desc를 구분하기 위해 [e.target.name] 사용
      this.setState({[e.target.name]:e.target.value})
    }
    render() {
      console.log('Update render');
      console.log(this.props.data);
      return(
        <article>
          <h2>Update</h2>
          <form action='/create_process' method='post'
          // onSubmit은 리액트가 아닌 html form태그의 고유 속성
          // submit버튼을 누르면 submit을 포함하고 있는 form태그의 onSubmit이벤트가 실행된다.
          onSubmit={function(e){ 
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
            // debugger;
            // console.log('submit!!');
          }.bind(this)}
          >

            <input type="hidden" name='id' value={this.state.id}></input>
            <p>
              <input 
                type="text"
                name="title" 
                placeholder="title"
                value={this.state.title}
                onChange={
                  this.inputFormHandler}
                ></input>
              </p>
            <p>
              <textarea
              name='desc' placeholder='description' 
              value={this.state.desc}
              onChange={
                this.inputFormHandler}
              ></textarea>
            </p>
            <p>
              <input type='submit'></input>
            </p>
          </form>
        </article>
      );
    }
  }

export default UpdateContent;