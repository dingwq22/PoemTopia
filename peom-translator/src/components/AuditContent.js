import React from 'react';
import { Menu } from 'antd';
import AuditWord from './AuditWord';
import AuditCharacter from './AuditCharacter';
import AuditVerse from './AuditVerse';
import BaseContainer from './BaseContainer';

export default class AuditContent extends React.Component {
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

        <div className="Volunteer-header">Audit</div>

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

          {key === "character" && <AuditCharacter />}
          {key === "verse" && <AuditVerse />}
          {key === "word" && <AuditWord />}
        </div>
      </BaseContainer>
    )
  }
}