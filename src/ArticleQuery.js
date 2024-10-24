import Nav from './Nav';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RotatingSquare } from 'react-loader-spinner'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class ps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", contributor: "", about: "", article: {}, loading: false,all:[], articles: [], responsive: {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: {max: 4000, min: 3000},
                    items: 5
                },
                desktop: {
                    breakpoint: {max: 3000, min: 1024},
                    items: 1
                },
                tablet: {
                    breakpoint: {max: 1024, min: 464},
                    items: 2
                },
                mobile: {
                    breakpoint: {max: 464, min: 0},
                    items: 1
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
        await axios.get("/api/v1/blog/articles/category/" + this.props.match.params.id)
                .then((response) => {
                    this.setState({articles: response.data});
                    this.setState({title: response.data.title})
                    
                }).catch((err) => {
        });

        
        const response = await axios.get("/api/v1/blog/category/all/" + this.props.match.params.id)
                .then((response) => {
                    this.setState({all: response.data});
                    this.setState({loading: false});

                }).catch((err) => {
        });


    }

    render() {
        return(
                <>
        
        
        {this.state.loading ? <div class="centerpage">
        
            <div class="margin-0d">
                <RotatingSquare
        
                    height="100"
                    width="100"
                    color="#588507"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="4"
                    wrapperStyle={{}}
                    wrapperClass="margin-0d"
                    visible={true}
                    /></div></div> :
                <div class="">
                    <Nav/>
                    <div class="session">
                        <div class="margin-top-md">
                            <div class="header-bar-main ">
                
                                <Carousel responsive={this.state.responsive} showDots={true} autoPlay={true}>
                
                
                                    {this.state.articles.map(a =>
                                        <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1  color-variant-1 padding-sm">
                    
                                        <div class="header" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.main})`}}><span class="background-green text-white padding-mfd text-bold text-white font-lg w-30">{a.title}</span></div>
                                        <div class="font-sm center about align-left">
                                            <div>
                                                <span> {a.title}</span>
                    
                                            </div></div>
                                        </Link>)}
                
                                </Carousel>
                
                            </div>
                            <div class="margin-md header-bar-aside center border-31 flex-center"><img src="https://naotw-pd.s3.amazonaws.com/styles/aotw_detail_ir/s3/images/GSER_J9803_E2327_A_3_EG4.jpg?itok=-5dYcAT5" height="280px" class="center margin-md"/></div>
                                        
                        </div> 
                        <div class="content-body-md w-100">
                            {this.state.all.map(a =>
                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1  bg-white color-variant-1 padding-sm">
                                <div class="grid-container-2  ">
                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                    <div class="font-sm center about align-left">
                                        <span> {a.title}</span>
                                    </div></div>
                                </Link>)}
                
                        </div>
                    </div>
                </div>}</>);
    }
}
;
export default ps;

