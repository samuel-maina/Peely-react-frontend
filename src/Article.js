import { render } from "react-dom";
import React, { useState } from "react";
import axios from 'axios';
import Nav from './Nav';
import swal from 'sweetalert';
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import remarkGfm from 'remark-gfm'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { RotatingSquare } from 'react-loader-spinner'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", contributor: "", about: "", article: {}, loading: false, articles: [], main_tags: [], responsive: {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: {max: 4000, min: 3000},
                    items: 5
                },
                desktop: {
                    breakpoint: {max: 3000, min: 1024},
                    items: 5
                },
                tablet: {
                    breakpoint: {max: 1024, min: 464},
                    items: 3
                },
                mobile: {
                    breakpoint: {max: 464, min: 0},
                    items: 2
                }
            }};

    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.componentDidMount();
        }
    }
    async componentDidMount() {
        this.setState({loading: true});
        const response = await axios.get("/api/v1/blog/article/" + this.props.match.params.id)
                .then((response) => {
                    this.setState({article: response.data[0]});
                    this.setState({title: response.data.title});
                    axios.get("/api/v1/blog/category/all/" + response.data[0].main_tag)
                            .then((response) => {
                                this.setState({articles: response.data});
                            }).catch((err) => {
                    });
                }).catch((err) => {
        });
        axios.get("/api/v1/blog/article/maintags/" + this.props.match.params.id)
                .then((response) => {
                    this.setState({main_tags: response.data});
                    this.setState({loading: false});

                }).catch((err) => {
        });







    }

    render() {
        if (this.state.loading === true) {

            return(
                    <div class="centerpage">
                        <RotatingSquare
                    
                            height="100"
                            width="100"
                            color="#588507"
                            ariaLabel="rotating-square-loading"
                            strokeWidth="4"
                            wrapperStyle={{}}
                            wrapperClass="margin-0d"
                            visible={true}
                    
                            />
                    </div>)
        } else
            return(
                    <div class="margin-top-md">
                        {this.state.loading}
                        <Nav/>
                        <div class="article-container session margin-top-md"> 
                    
                            <div class="session-g2 Roboto art text-gray ">
                                <div class="header border-rad-sm " style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + this.state.article.main})`}}><div class="font-xl  margin-top-m Roboto text-bold text-gray"> <span class="text-salmon"></span></div></div>
                    
                                <h2 class="Roboto font-lg-l">{this.state.article.title}</h2>
                                <div class=" font-sm">
                                {this.state.main_tags.map(tag =><Link to={'/articles/'+tag.main_tag}> <span class="badge font-sm text-white margin-sm">{tag.main_tag}</span></Link>)}
                                </div>
                                <div class=" border-bottom-crimson bg-crimson margin-top-xssm"></div>
                                <p class="font-xsm ">{this.state.article.contributor} | {new Date(this.state.article.date).toDateString()}</p>
                                <div class="line-spacer open-sans">
                                    <ReactMarkdown children={this.state.article.body} remarkPlugins={[remarkGfm]} />       
                                </div>
                            </div>
                            <div class="header-bar s  paddidng-md">
                                <div class="w-100 text-bold margin-lg-left-0 hidden Roboto">
                                    <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">RELATED</span>
                                </div>
                                <div class="content-body-sm side-list">
                                    {this.state.articles.map(a =>
                                        <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                        <div class="grid-containesr-2 flex-vertical ">
                                            <div class="profile-2" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                            <div class="font-sm center about align-left">
                                                <span> {a.title}</span>
                        
                                            </div></div>
                                        </Link>)}
                    
                                </div>
                            </div>
                        </div>
                        <div class="  padding-md hidden show">
                            <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">RELATED</span>
                            </div>
                            <div class="content-body-md">
                                {this.state.articles.map(a =>
                                        <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                        <div class="grid-container-2   ">
                                            <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                            <div class="font-sm center about align-left">
                                                <span> {a.title}</span>
                                            </div></div>
                                        </Link>)}
                    
                            </div>
                        </div>
                    
                        <div class="content-body-mdd session">
                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                    <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">INTERESTING</span>
                                </div>
                            <Carousel responsive={this.state.responsive} showDots={false} autoPlay={true}>
                    
                                {this.state.articles.map(a =>
                                        <div class="bg-white margin-md-1 height-1">
                                            <Link to={'/article/' + a.id} class="header-bar-side-ditem-4   s pointer text-white  play font-sm">
                                            <div class="header-2" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}>
                                            </div>
                                            <span class="background-green font-lg Poppins  ">{a.title}</span>
                                            </Link></div>)}
                            </Carousel>
                    
                        </div>
                        <div class="center-1 margin-sm"><div class="background-green center-1 border-rad-sm Mulish padding-md text-white pointer">Load more <span class="material-symbols-outlined">
keyboard_arrow_down
</span></div></div>
                    </div>
                    );
    }
}
export default Article;



