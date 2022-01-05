import React from 'react';
import { Avatar, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';
const AV = require('leancloud-storage');

class Navibar extends React.Component {
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
            <div className="Navibar">
                <img alt="avatar" src='http://lc-ivcfWJ7j.cn-n1.lcfile.com/a063196fe57b0851b333/logo.png'
                    height="80" width="80"></img>
                <div className="Navibar-user">
                    {!hideAdmin && <Button>Admin</Button>}
                    {!hidden && <Button onClick={this.logout.bind(this)}>Logout</Button>}
                    <div className="Myhomepage-userIcon" onClick={this.usericon.bind(this)}>
                        <Avatar size={50} icon={<UserOutlined />} />
                        <div>{AV.User.current() && AV.User.current().attributes.username}</div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Navibar;