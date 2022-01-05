import React from 'react';
import { Input, Button, Card, message } from 'antd';
import '../App.css';

const AV = require('leancloud-storage');
const {TextArea} = Input;

class VolunteerVerse extends React.Component {
    constructor(props){
        super(props)
        this.state={chineseVerse:"", englishTranslation:"" }
    }

    textChange(e, type) {
        if (type==="Chinese Verse"){
            this.setState({chineseVerse: e.currentTarget.value})
        }
        else if (type==="English"){
            this.setState({englishTranslation: e.currentTarget.value})
        }
    }

    submit() {
        const that = this;
        const {chineseVerse, englishTranslation} = this.state;
        const obj = AV.Object("Volunteer_Verse");

        obj.set("keyword", chineseVerse);
        obj.set("translation", englishTranslation);
        obj.set("volunteer", AV.User.current());

        obj.save().then((i) => {
            message.success('Successfully submit!')
            that.setState({
                chineseVerse: "",
                englishTranslation: ""
            })
        }
        
        )
    }


    render() {
        const {chineseVerse, englishTranslation} = this.state;
        return (
            <div className="Volunteer">
                <Card title="Chinese Verse">
                    <TextArea rows={2} onChange={(e)=>this.textChange(e, "Chinese Verse")} value={chineseVerse}/>
                </Card>

                <Card title="English Translation">
                    <TextArea rows={2} onChange={(e)=>this.textChange(e, "English")} value={englishTranslation}/>
                </Card>
                
                <Button type="primary" onClick={this.submit.bind(this)}>submit</Button>
            </div>
        )
    }
}

export default VolunteerVerse;