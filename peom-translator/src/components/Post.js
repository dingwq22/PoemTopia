import React from 'react';
import { Link } from "react-router-dom";
import { List, Divider, Avatar, Input, Button, Space, message } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import '../App.css';
import { UserOutlined } from '@ant-design/icons';
import BaseContainer from './BaseContainer';

const AV = require('leancloud-storage');
const { TextArea } = Input;

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );


export default class Post extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props.location.query)
        this.state = {
            comments: [],
            question: undefined,
        }
    }
    
    textAreaChange(e) {
        console.log(e.target.value);
        this.setState({comment: e.target.value})
    }

    postComment() {
        const that = this;
        const {comment} = this.state;
        const id = this.props.match.params.id;
        const discussion = AV.Object.createWithoutData('Discussion', id);
        const answer = new AV.Object("DiscussionAnswer");

        answer.set("replier", AV.User.current());
        answer.set("discussion", discussion)
        answer.set("reply", comment);

        answer.save().then((answer) => {
            message.success('successfully comment!')
            that.setState({comment: ''});
          }, (error) => {
            message.error("failed comment!")
          });
    }

    componentDidMount() {
        const that = this;
        const id = this.props.match.params.id;
        //console.log(this.props);
        const discussion = AV.Object.createWithoutData('Discussion', id);
        const query = new AV.Query("DiscussionAnswer");
        //query.equalTo("discussion_id", id);
        query.include("replier");
        query.equalTo("discussion", discussion)
        query.find().then(comments => {
            console.log(comments);
            that.setState({
                comments: comments
            })
        })
        const query1 = new AV.Query("Discussion", id);
        query1.find().then(discussions => {
            if (discussions.length>0){
                that.setState({question: discussions[1]})
            }
        })
    }

    render() {
        const { comments, question, comment } = this.state;
        return (
                <BaseContainer {...this.props} className="Post">

                <div className="Post-title"> 
                    {question && question.attributes.question}
                </div>

                <div className="Post-comment">
                    <TextArea rows={3} type="text" placeholder="Your comment" onChange={this.textAreaChange.bind(this)} value={comment}/>
                    <p></p>
                    <div className="Post-buttom">
                        <Button type="primary" onClick={this.postComment.bind(this)}>Comment</Button>
                    </div>
                </div>

                <List className="Post-discussion"
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={LikeOutlined} text={item.attributes.likes} key="list-vertical-like-o" />,
                            ]}
                        >

                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} />}
                                title={item.attributes.replier.attributes.username}
                                description={item.attributes.reply}
                            />
                        </List.Item>
                    )}
                />


            </BaseContainer>
        )
    }

}