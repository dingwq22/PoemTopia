import React from 'react';
import { Link } from "react-router-dom";
import { Input, Avatar, Button} from 'antd';
import '../App.css';
import { UserOutlined } from '@ant-design/icons';
import BaseContainer from './BaseContainer';

const { Search } = Input;


class Home extends React.Component {
  constructor(props) {
    super(props) 
  }
 
  searchResult = (e) => {
    this.setState({
      result: e.target.value
    })
  }

  clickSearchButton=() => {
    const {result} = this.state;
    var pattern = new RegExp("[\u4E00-\u9FA5]+");

    console.log(this.props)
    if (pattern.test(result)) {
      if (result.length<5) {
        this.props.history.push(`searchcharacter/${result}`)
      }
      else {
        this.props.history.push(`searchverse/${result}`)
      }
    }
    else {
      this.props.history.push(`searchword/${result}`)
    }
  }

  render() {
    const search = this.searchResult.bind(this);
    return (
        <BaseContainer {...this.props} className="App">

        {/* <div className="App-userIcon">
          <Avatar size={64} icon={<UserOutlined />} />
          <br />
          <Link to="/login">Hi, Wenqi</Link>
        </div> */}

        <div className="App-header">Poem Topia</div>

        <div className="App-searchInput">
          <Input placeholder="Please enter your text" className="search" onChange={search}/>
          <Button type="primary" onClick={this.clickSearchButton.bind(this)}>Search</Button>
      
        </div>

        <div className="App-forumIcon">
          <Avatar size={64} icon={<UserOutlined />} />
          <Link to="/forum">Forum</Link>
        </div>

        <div className="App-instructText">
          <div>For Chinese to English translation,</div>
          <div>Enter your Chinese character or a verse.</div>
          <br />
          <div>For English to Chinse translation,</div>
          <div>Enter your English word.</div>
          <br />
          <div>If you want to translate a verse or poem,</div>
          <div>Welcome to Forum!</div>
        </div>
      </BaseContainer>
    )
  }
}

export default Home;