import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {notifications: [], error: "", mainTags: []};

    }
    async componentDidMount() {

        const response = await axios.get("/api/v1/tags/maintags/")
                .then((response) => {

                    this.setState({mainTags: response.data});
                }).catch((err) => {
        });

    }
    showNotifications() {
        if (document.getElementById("notifications").style.display === "block")
        {
            document.getElementById("notifications").style.display = "none";
        } else
            document.getElementById("notifications").style.display = "block";
    }
    render() {

        return (
                <div className="top-nav font-sdm text-bold text-gray flex-verticdal fledx-center">
                    <Link to="/">
                    <img src="/images/logo.png" width="130px" class="paddingsm margin-sm float-left"/>
                    </Link>
                    <div class=" p">
                        {this.state.mainTags.map(tag =>
                                        <NavLink to={'/articles/' + tag.id} activeClassName="selected-2" className='nav-item margin-sm' >
                                        <div class="Mulish font-l">
                                                <div className='' title="Data&Reports">
                                
                                
                                                </div>
                                                {tag.tag}
                                            </div>
                                        </NavLink>
                                    )}
                
                
                
                    </div>
                
                
                </div>
                );
    }
}
export default Nav;