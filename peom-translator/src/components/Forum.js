import React from 'react';
import { Link } from "react-router-dom";
import { List, Divider, Avatar, Input, Button } from 'antd';
import '../App.css';
import BaseContainer from './BaseContainer';

const AV = require('leancloud-storage');

// const data2 = [
//     {
//         question: "Q: How to translate '采菊东篱下'",
//         question_contributor: "Alice",
//         reply1: "A: translation 1",
//         reply_contributor1: "David",
//         like_number1: "点赞数",
//         reply2: "A: translation 2",
//         reply_contributor2: "Mary",
//         like_number2: "点赞数"
//     }
// ];

class Forum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            highlights: [],
            discussions: []
        }
        console.log(props.match.params.id)
    }

    componentDidMount() {
        this.queryHighlights();
        this.queryDiscussion();
    }

    queryHighlights() {
        const that = this;
        const query = new AV.Query('Highlights');
        query.find().then(highlights => {
            console.log(highlights);
            const list = highlights.map(i => {
                return i.attributes;
            })
            that.setState({
                highlights: list
            })
        })
    }

    queryDiscussion() {
        const that = this;
        const query = new AV.Query('Discussion');
        query.include("questioner");
        query.find().then(discussions => {
            console.log(discussions);
            const list = discussions.map(i => {
                return { ...i.attributes, id: i.id };
            })
            that.setState({
                discussions: list
            })
        })
    }

    pageChange(page) {
        console.log(page);
    }

    postDetail(id) {
        console.log("id", id);
        this.props.history.push(`/post/${id}`)
    }


    render() {
        const that = this;
        const { highlights, discussions } = this.state;
        return (
            <BaseContainer {...this.props}>

                <div className="Forum-header">Poem-topia Forum</div>

                <div className="Forum-post">
                    <Input placeholder="post your text" className="Forum-post-item" />
                    <Button type="primary">Post</Button>
                </div>

                <div className="Forum-main">
                    <div className="Forum-highlights">
                        <Divider orientation="left">Highlights</Divider>
                        <br></br>

                        <List
                            bordered className="Forum-highlightsBorder"
                            dataSource={highlights}
                            renderItem={item => (
                                <List.Item>
                                    <div className="Forum-highlights-item">
                                        <div className="Forum-highlights-originalPoem">{item.content}</div>
                                        <div>{item.translation}</div>
                                        <div className="Forum-highlights-contributor">{item.contributor}</div>
                                    </div>

                                </List.Item>
                            )}
                        />
                    </div>

                    <div className="Forum-discussions">
                        <Divider orientation="left">Discussions</Divider>
                        <br></br>
                        <List
                            pagination={{
                                onChange: page => that.pageChange(page),
                                pageSize: 3,
                            }}
                            bordered className="Forum-discussionBorder"
                            dataSource={discussions}
                            renderItem={item => (
                                <List.Item onClick={() => this.postDetail(item.id)}>
                                    <div className="Forum-discussions-item">

                                        <div>
                                            <span className="Forum-discussions-question">{item.question}</span>
                                            <span className="Forum-discussions-questionContributor">{item.questioner ? item.questioner.attributes.username : ''}</span>
                                        </div>
                                        {/* <div>
                                                <span className="Forum-discussions-replyContributor">
                                                    <span>{item.createdAt}</span>
                                                </span>
                                            </div> */}
                                    </div>

                                </List.Item>

                            )}
                        />
                    </div>
                </div>
            </BaseContainer>


        )
    }
}

export default Forum;