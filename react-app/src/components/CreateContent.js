import React, { Component} from 'react';

class CreateContent extends Component {
    render() {
      console.log('Content render');
      return(
        <article>
          <h2>Create</h2>
          <form action='/create_process' method='post'
          // onSubmit은 리액트가 아닌 html form태그의 고유 속성
          // submit버튼을 누르면 submit을 포함하고 있는 form태그의 onSubmit이벤트가 실행된다.
          onSubmit={function(e){ 
            e.preventDefault();
            this.props.onSubmit(
              e.target.title.value, e.target.desc.value
            );
            // debugger;
            // console.log('submit!!');
          }.bind(this)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p>
              <textarea name='desc' placeholder='description'></textarea>
            </p>
            <p>
              <input type='submit'></input>
            </p>
          </form>
        </article>
      );
    }
  }

export default CreateContent;