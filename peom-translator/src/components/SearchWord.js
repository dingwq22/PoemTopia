import React from 'react';
import '../App.css';
import { Input, Divider, List, Spin } from 'antd';
import BaseContainer from './BaseContainer';

const AV = require('leancloud-storage');

export default class SearchWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: props.match.params.id,
            chineseTranslation: [],
            interpretation: [],
            relatedPhrase: [],
            exampleVerse: [],
            loading: false
        }
    }

    queryWord = () => {
        const that = this;
        const keyword = this.state.keyword;
        const query = new AV.Query('Search_Word');
        query.equalTo("keyword", keyword);

        this.setState({
            loading: true
        })

        query.find().then(search => {
            //console.log(search)
            if (search.length > 0) {

                const result = [];
                search.forEach(i => {
                    if (!result.includes(i.attributes.chineseTranslation)) {
                        result.push(i.attributes.chineseTranslation)
                    }
                })
                console.log("result", result)

                const datas = result.map(i => {
                    return search.filter(j => {
                        return j.attributes.chineseTranslation === i
                    })
                })
                console.log("datas", datas);

                that.setState({
                    datas
                })
            }
            that.setState({
                loading: false
            })
        }).catch(console.error());
    }

    componentDidMount() {
        this.queryWord()
    };

    render() {
        const { keyword, datas, loading } = this.state;

        return (
            <BaseContainer {...this.props}>
                <div className="Searchbox">
                    <Input value={keyword} />
                </div>

                <Spin spinning={loading}>
                    <div className="SearchResult">
                        <div>
                            {/* <div>
                                <Divider orientation="left">Chinese Translation</Divider>
                            </div> */}

                            <List
                                bordered
                                dataSource={datas}
                                renderItem={items => (
                                    <List.Item>
                                        <div>
                                            <div>Chinese Translation</div>
                                            <div>{items[0].attributes.chineseTranslation}</div>
                                            <p></p>

                                            <div>
                                                {
                                                    items.map(i => {
                                                        return <div key={i.id}>
                                                            <p>---Interpretation----</p>
                                                            <div>{i.attributes.interpretation}</div>
                                                            <div>Related Phrases: {i.attributes.relatedPhrase}</div>
                                                            <div>Example Verses: {i.attributes.exampleVerse}</div>

                                                            <p></p>
                                                        </div>

                                                    })
                                                }
                                                {/* <div onClick={this.onclicktest}>
                                                    测试上传
                                                </div> */}
                                            </div>

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
