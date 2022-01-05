import React from 'react';
import {Input, Button, Card } from 'antd';
import '../App.css';

const {TextArea} = Input;

class VolunteerWord extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        //const {key} = this.state;
        return (
            <div className="Volunteer">
                <Card title="English Word">
                    <TextArea rows={1} />
                </Card>
                <Card title="Chinese Translation">
                    <TextArea rows={2} />
                </Card>
                <Card title="Related Phrases">
                    <TextArea rows={2} />
                </Card>
                <Card title="Example Verse">
                    <TextArea rows={2} />
                </Card>

                <Button type="primary" onClick={this.submit}>submit</Button>
            </div>
        )
    }
}

export default VolunteerWord;