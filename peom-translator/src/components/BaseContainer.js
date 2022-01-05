import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';
import { Layout, Button, message, Avatar } from 'antd';
import {Link} from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const AV = require('leancloud-storage');
class BaseContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: props.hidden === undefined?true:props.hidden,
            hideAdmin: props.hideAdmin === undefined?true:props.hideAdmin
        }
    }

    usericon = () => {
        if (!AV.User.current()) {
            this.props.history.push(`login`)
        }
        else {
            this.props.history.push(`myhomepage`)
        }

    }

    logout = () => {
        AV.User.logOut();
        if (!AV.User.current()) {
            message.success('Successfully logout!');
            this.props.history.replace(`/`)
        }
    }
    render() {
        const {hidden, hideAdmin} = this.state;
        return (
            <Layout>
                <Header className="header">
                <div className="Navibar">
                <img alt="avatar" src='http://lc-ivcfWJ7j.cn-n1.lcfile.com/a063196fe57b0851b333/logo.png'
                    height="80" width="80"></img>
                <div className="Navibar-user">
                    {!hideAdmin && <div><Link to="/audit">Audit</Link></div>}
                    {!hidden && <Button onClick={this.logout.bind(this)}>Logout</Button>}
                    <div className="Myhomepage-userIcon" onClick={this.usericon.bind(this)}>
                        <Avatar size={50} icon={<UserOutlined />} />
                        <div>{AV.User.current() && AV.User.current().attributes.username}</div>
                    </div>
                </div>

            </div>
                </Header>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 800,
                        }}
                    >
                        <div style={{ backgroundColor: 'white', padding: 30 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Poem Topia ©2020 </Footer>
                </Layout>
            </Layout>
        )
    }
}
export default BaseContainer;