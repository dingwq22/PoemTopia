import React from 'react';
import '../App.css';
import { Input, Divider, List, Spin } from 'antd';
import BaseContainer from './BaseContainer';

const AV = require('leancloud-storage');

export default class SearchVerse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: props.match.params.id,
            translation: [],
            loading: false
        }
    }

    queryVerse = () => {
        const that = this;
        const keyword = this.state.keyword;
        const query = new AV.Query('Search_Verse');
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
                    keyword
                })
            }
            that.setState({
                loading: false
            })
        }).catch(console.error());
    }

    componentDidMount() {
        this.queryVerse()
    };


    render() {
        const { translation, keyword, loading } = this.state;

        return (
            <BaseContainer {...this.props}>

                <div className="Searchbox">
                    <Input value={keyword} />
                </div>

                <Spin spinning={loading}>
                    <div className="SearchResult">
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

                        <div className="SearchVerse-instructText">
                            <div>Not satisfied?</div>
                            <div>Go to Forum and ask for help!</div>
                        </div>

                    </div>
                </Spin>
            </BaseContainer>
        )
    }
}

