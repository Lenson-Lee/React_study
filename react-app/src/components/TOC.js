import React, { Component} from 'react';


class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
      console.log('===> TOC render shouldComponentUpdate'
      , newProps.data, this.props.data);
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    }
    render() {
      console.log('===> TOC render');
      var i = 0;
      var data = this.props.data;
      var lists = [];

      while(i < data.length) {
        lists.push(
          <li key ={data[i].id}>
            <a
              href={"/content/"+data[i].id}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
              }.bind(this)}
                
              //또 다른 방법
              //bind는 함수의 두번째 인자로 들어온 값을 해당 함수의 첫번째 매개변수의 값으로 넣어준다.
              //기존의 매개변수는 한 칸씩 뒤로 밀림. ex) function(id, num(10이 들어감), e) ~ bind(this, data[i].id, 10)
              // onClick={function(id, e){
              // e.preventDefault();
              // this.props.onChangePage(id);
              // }.bind(this, data[i].id)}
              >{data[i].title}</a>
          </li>);
        i = i + 1;

      }
      return (
        <nav>
          <ul>
              {lists}
          </ul>
        </nav>
      );
    }
  }

export default TOC;