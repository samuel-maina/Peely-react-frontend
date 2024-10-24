import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import axios from 'axios';
import { RotatingSquare } from 'react-loader-spinner'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articles: [], loading: false, trends: [], international: [], sports: [], local: [], entertainment: [], nature: [], technology: [], trending: [], cars: [], item: [], responsive: {
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
                    items: 1
                },
                mobile: {
                    breakpoint: {max: 464, min: 0},
                    items: 1
                }
            }};

    }
    async componentDidMount() {
        this.setState({loading: true});
        await axios.get("api/v1/blog/all/")
                .then((response) => {
                    this.setState({articles: response.data});

                }).catch((err) => {
        });

        await axios.get("/api/v1/blog/categories/all/")
                .then((response) => {
                    this.setState({trends: response.data});

                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/international")
                .then((response) => {
                    this.setState({international: response.data});


                }).catch((err) => {
        });

        await axios.get("/api/v1/blog/category/technology")
                .then((response) => {
                    this.setState({technology: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/trend")
                .then((response) => {
                    this.setState({trending: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/nature")
                .then((response) => {
                    this.setState({nature: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/entertainment")
                .then((response) => {
                    this.setState({entertainment: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/sports")
                .then((response) => {
                    this.setState({sports: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/local")
                .then((response) => {
                    this.setState({local: response.data});


                }).catch((err) => {
        });
        await axios.get("/api/v1/blog/category/cars")
                .then((response) => {
                    this.setState({cars: response.data});
                    this.setState({loading: false});

                }).catch((err) => {
        });
    }
    render() {
        return(<>
        
        
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
                                    <div class=" margin-top-md Roboto float-lefdt padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green">POPULAR PEELS</span>
                                        </div>
                                        <div>
                                            <div class="header-bar-mains border-rad-sm ">
                            
                                                <Carousel responsive={this.state.responsive} showDots={true} autoPlay={true}>
                            
                            
                                                    {this.state.trends.map(a =>
                                                        <Link to={'/article/' + a.id} class=" border-rad-sdm border-variant-1  color-variant-1 paddinfg-sm">
                                
        <div class="header relative border-rad-sm" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.main})`}}><span class="background-green text-white padding-mfd text-bold text-white  w-30"><div class="absolute relative-position-1 text-bold font-xl Mulish">{a.title}</div></span></div>
                                                        <div class="font-sm center about align-left">
                                                            <div>
                                                                <span> {a.title}</span>
                                
                                                            </div>
                                
                                                        </div>
                                                        </Link>)}
                            
                                                </Carousel>
                            
                                            </div>
                                            <div class="margin-md header-bar-aside center border-31 hidden flex-center"><img src="hdttps://naotw-pd.s3.amazonaws.com/styles/aotw_detail_ir/s3/images/GSER_J9803_E2327_A_3_EG4.jpg?itok=-5dYcAT5 " height="3x00px" class="center hidden margin-md"/></div>
                                        </div>
                                    </div>
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">TECHNOLOGY</span>
                                        </div>
                                    </div>
                                     <hr/>
                                    <div class="content-body-md">
                                        {this.state.technology.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Technology </span>
                                                            </div> 
                                                        </div>
                                                    </div>
                                    
                                                </div>
                                                </Link>)}
                            
                                    </div>
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">SPORTS</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.sports.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Sports </span> </div></div>
                                                    </div>
                                                </div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">ENTERTAINMENT</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.entertainment.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Entertainment </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">CARS</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.cars.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Cars </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">NATURE</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.nature.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white"> Nature </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">TRENDING</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.trending.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Trends </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">LOCAL</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.local.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  Local news </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div>
                            
                                    <div class=" padding-md">
                                        <div class="w-100 text-bold margin-lg-left-0  Roboto">
                                            <span class="popular  peels Ubuntu border-opt-1 padding-md onhover-green pointer">INTERNATIONAL</span>
                                        </div>
                                         <hr/>
                                        <div class="content-body-md">
                                            {this.state.international.map(a =>
                                                <Link to={'/article/' + a.id} class=" border-rad-sm border-variant-1 bg-white color-variant-1 padding-sm">
                                                <div class="grid-container-2  ">
                                                    <div class="profile" style={{backgroundImage: `url(${'http://192.168.0.102:3030/' + a.thumbnail})`}}></div>
                                                    <div class="font-sm center about align-left">
                                                        <div class="">
                                                            <span> {a.title}</span>
                                                            <div>
                                                                <span class="badge  font-sm Mulish text-white">  International  </span>
                                                            </div> 
                                                        </div>
                                                    </div></div>
                                                </Link>)}
                            
                                        </div>
                                    </div></div>
                            
                            </div>}</>);

    }

}
;
export default Home;
