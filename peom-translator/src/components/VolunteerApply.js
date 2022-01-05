import React from 'react';
import { Form, Input, Button, message } from 'antd';
import '../App.css';
const AV = require('leancloud-storage');

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


class VolunteerApply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: undefined,
            email: undefined,
            phoneNumber: undefined
        }
    }

    nameChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    emailChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    nameChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    submit = () => {
        const that = this;
        const {name, email, phoneNumber} = this.state;
        const apply = new AV.Object("VolunteerApply");
        apply.set=("name", name);
        apply.set=("email", email);
        apply.set=("phoneNumber", phoneNumber);

        apply.save().then((apply) => {
            message.success('Successfully submit!');
            that.props.history.replace(`/myhomepage`);
          }, (error) => {
            message.error('Sumbit failed!');
          });
    }


    render() {
        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const changeName = this.nameChange.bind(this);

        return (
            <div className="VolunteerApply">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={changeName}/>
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Telephone Number">
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.submit}>
                            Submit
                </Button>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}


export default VolunteerApply;