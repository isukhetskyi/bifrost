import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <div className='container-fluid'>
                <Header classes="header-top" id="header"/>
                {/* <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='row' style={{ marginBottom: "100px", marginTop: "35px" }}>
                    <div className='col-sm-2'>
                        <NavMenu id="menu" classes="main-nav" />
                    </div>
                    <div className='col-sm-10'>
                        {this.props.children}
                    </div>
                </div>
                <Footer id="footer" classes="footer-bottom"/>
                {/* <div className="footer-bottom">
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                            <div className="copyright" style={{ textAlign: "center" }}>
                                <p>
                                    {new Date().getFullYear()} NetLS Software Development
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>;
    }
}
