import React from 'react';
import {Input, Button, Card } from 'antd';
import '../App.css';

const {TextArea} = Input;

class VolunteerCharacter extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="Volunteer">
                <Card title="Chinese Character">
                    <TextArea rows={1} />
                </Card>
                
                <Card title="English Translation">
                    <TextArea rows={1} />
                </Card>

                <Card title="Related Phrases">
                    <TextArea rows={1} />
                </Card>

                <Card title="Chinese verse that contain this character">
                    <TextArea rows={1} />
                </Card>

                <Button type="primary" onClick={this.submit}>submit</Button>
            </div>
        )
    }
}

export default VolunteerCharacter;