import React from 'react';
import { Card, Spin, Input, Button, message } from 'antd';
import '../App.css';
const AV = require('leancloud-storage');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: undefined,
            password: undefined,
            loading: false
        }
    }
    //username 更改
    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    //password 密碼框
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    login() {
        const that = this;
        const { username, password } = this.state;
        const user = new AV.User();
        user.setUsername(username);
        user.setPassword(password);
        this.setState({
            loading: true
        })
        AV.User.logIn(username, password).then((user) => {
            message.success('登录成功');
            that.props.history.push(`/`)
        }, (error) => {
            this.setState({
                loading: true
            })
            message.error('登录失败，请稍后重试');
        });
    }

    render() {
        const { loading } = this.state
        return (
            <div className="login">
                <Spin spinning={loading}>
                    <Card
                        hoverable
                        style={{ width: 320, height: 440 }}
                    >
                        <div style={{ textAlign: 'center', fontSize: 30, fontWeight: "bold" }}>Poem Topia</div>
                        <div style={{ textAlign: 'center', fontSize: 20, fontWeight: "bold" }}>Sign In</div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div className="mt30">
                                <div style={{ fontSize: 14, fontWeight: "bold" }}>User Name</div>
                                <Input style={{ width: 240 }} placeholder="input username" onChange={(e) => this.changeUsername(e)} />
                            </div>
                            <div className="mt30">
                                <div style={{ fontSize: 14, fontWeight: "bold" }}>Password</div>
                                <Input.Password style={{ width: 240 }} placeholder="input password" onChange={(e) => this.changePassword(e)} />
                            </div>
                            <Button className="mt30" style={{ width: 240 }} type='primary' onClick={() => this.login()}>Sign in</Button>
                            <div className="mt50" style={{ textAlign: 'center' }}>Poem Topia ©2020 </div>
                        </div>
                    </Card>
                </Spin>
            </div>
        )
    }
}