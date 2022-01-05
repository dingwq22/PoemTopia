import React from 'react';
import { Menu } from 'antd';
import '../App.css';
import VolunteerWord from './VolunteerWord';
import VolunteerCharacter from './VolunteerCharacter';
import VolunteerVerse from './VolunteerVerse';
import BaseContainer from './BaseContainer';

const data = [
    '[Entry 1]',
    '[Entry 2]',
    '[Entry 3]',
    '[Entry 4]',
    '[Entry 5]'
];

class Volunteer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { key: "character" }
    }

    menuClicked(options) {
        this.setState({ key: options.key })
    }

    render() {
        const { key } = this.state;
        console.log(key);

        return (
            <BaseContainer {...this.props} className="Volunteer">

                <div className="Volunteer-header">Your Translation</div>

                <div className="Volunteer-main" >
                    <Menu mode="horizontal" onClick={(e) => this.menuClicked(e)} defaultSelectedKeys={["character"]}>
                        <Menu.Item key="character">
                            Ch to En (character)
                        </Menu.Item>
                        <Menu.Item key="verse">
                            Ch to En (Verse)
                        </Menu.Item>
                        <Menu.Item key="word">
                            En to Ch (Word)
                        </Menu.Item>
                    </Menu>

                    {key === "character" && <VolunteerCharacter />}
                    {key === "verse" && <VolunteerVerse />}
                    {key === "word" && <VolunteerWord />}
                </div>
            </BaseContainer>
        )
    }
}

export default Volunteer;