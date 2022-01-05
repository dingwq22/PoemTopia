import React from 'react';
import { Avatar, List, Divider, Card } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined, RightSquareOutlined } from '@ant-design/icons';
import '../App.css';
import BaseContainer from './BaseContainer';

const data = [
    '[Entry 1]',
    '[Entry 2]',
    '[Entry 3]'
];

class VolunteerMain extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BaseContainer {...this.props}>

                <div className="VolunteerMain">
                    {/* <div className="VolunteerMain-icons">
                        <div className="VolunteerMain-userIcon">
                            <Avatar size={50} icon={<UserOutlined />} />

                        </div>
                        <div className="VolunteerMain-name">
                            <div>Wenqi Ding</div>
                            <div>Level</div>
                        </div>
                    </div> */}

                    <div className="Myhomepage-volunteer">
                        <Card>
                            <div>Contact supervisor</div>

                            <div className="VolunteerMain-prompts">
                                <div>Create new translations</div>
                                <Link to="/volunteer">
                                    <RightSquareOutlined />
                                </Link>
                            </div>
                        </Card>
                    </div>

                    <br />

                    <div className="VolunteerMain-header">Status</div>

                    <div className="VolunteerMain-main" >
                        <div className="VolunteerMain-statusitems">
                            <Divider orientation="left">Check Pending</Divider>
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

                        <div className="VolunteerMain-statusitems">
                            <Divider orientation="left">Approved</Divider>
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

                        <div className="VolunteerMain-statusitems">
                            <Divider orientation="left">Rejected</Divider>
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
                </div>
            </BaseContainer>
        )
    }
}

export default VolunteerMain;