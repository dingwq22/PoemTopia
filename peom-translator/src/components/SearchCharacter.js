import React from 'react';
import '../App.css';
import { Input, Divider, List, Spin } from 'antd';
import BaseContainer from './BaseContainer';

const AV = require('leancloud-storage');

export default class SearchCharacter extends React.Component {
    constructor(props) {
        super(props)
        console.log(props.match.params)
        this.state = {
            keyword: props.match.params.id,
            translation: [],
            phrase: [],
            verse: [],
            loading: false
        }
    }

    queryCharacter = () => {
        const that = this;
        const keyword = this.state.keyword;
        const query = new AV.Query('Search_Character');
        query.equalTo("keyword", keyword);

        this.setState({
            loading: true
        })

        query.find().then(search => {
            console.log(search)
            if (search.length > 0) {
                const result = search[0]
                that.setState({
                    translation: result.attributes.translation,
                    phrase: result.attributes.phrases,
                    verse: result.attributes.verses,
                    keyword
                })
            }
            that.setState({
                loading: false
            })

            // const list=search.map(i => {
            //     return i.attributes;
            // })
            // that.setState({
            //     highlights: list
            // })
        }).catch(console.error());
    };

    componentDidMount() {
        //super.componentDidMount()
        this.queryCharacter()
    };

    render() {
        const { translation, phrase, verse, keyword, loading } = this.state;

        return (
            <BaseContainer {...this.props}>

                <div className="Searchbox">
                    <Input value={keyword} />
                </div>

                <Spin spinning={loading}>
                    <div className="SearchCharacter-result">
                        <div>
                            <div>
                                <Divider orientation="left">English Translation</Divider>
                            </div>

                            <List
                                bordered
                                dataSource={translation}
                                renderItem={item => (
                                    <List.Item>
                                        <div>
                                            <div>{item}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>

                        <div className="SearchCharacter-items">
                            <div>
                                <Divider orientation="left">Related pharse</Divider>
                            </div>

                            <List
                                bordered
                                dataSource={phrase}
                                renderItem={item => (
                                    <List.Item>
                                        <div>
                                            <div>{item}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>


                        <div className="SearchCharacter-items">
                            <div onClick={this.queryCharacter}>
                                <Divider orientation="left">Chinses verses that contain this character</Divider>
                            </div>

                            <List
                                bordered
                                dataSource={verse}
                                renderItem={item => (
                                    <List.Item>
                                        <div>
                                            <div>{item}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Spin>
            </BaseContainer>
        )
    }
}