import React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Input, Button, Card, List, Divider, message } from 'antd';
import { UserOutlined, RightSquareOutlined } from '@ant-design/icons';
import '../App.css';
import BaseContainer from './BaseContainer';
const AV = require('leancloud-storage');

const data = [
    '[Entry 1]',
    '[Entry 2]',
    '[Entry 3]',
    '[Entry 4]',
    '[Entry 5]',
];

class Myhomepage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <BaseContainer {...this.props} hidden={false} hideAdmin={AV.User.current().attributes.role !== "admin"} >

                <div className="Myhomepage">
                    {/* <div className="Myhomepage-icons">
                        <div className="Myhomepage-userIcon">
                            <Avatar size={50} icon={<UserOutlined />} />
                            <div>Wenqi Ding</div>
                        </div>

                        <div className="Myhomepage-friends">
                            <Avatar size={50} icon={<UserOutlined />} />
                            <div>My Friends</div>
                        </div>
                    </div> */}

                    <div className="Myhomepage-volunteer">
                        <Card className="Myhomepage-card">
                            <div>Want to be a contribute to the database?</div>
                            <div>Volunteer here!</div>
                            <Link to="/volunteerapply">
                                <RightSquareOutlined />
                            </Link>
                        </Card>

                        <Card className="Myhomepage-card">
                            <div>Already a volunteer?</div>
                            <div>See your volunteer page!</div>
                            <Link to="/volunteermain">
                                <RightSquareOutlined />
                            </Link>
                        </Card>
                    </div>


                    <div className="Myhomepage-contributions">
                        <Divider orientation="left">My Contributions</Divider>
                        <List
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <div>{item}</div>
                                </List.Item>
                            )}
                        />
                    </div>

                    <div className="Myhomepage-favourites">
                        <Divider orientation="left">My Favourties</Divider>
                        <List
                            bordered
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <div>{item}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </BaseContainer>
        )
    }
}

export default Myhomepage;