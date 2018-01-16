import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row' style={{marginBottom:"100px"}}>
                <div className='col-sm-2'>
                    <NavMenu />""
                </div>
                <div className='col-sm-10'>
                    {this.props.children}
                </div>
            </div>
            <div className="footer-bottom">

                <div className="container">

                    <div className="row">

                        <div className="col-md-12">

                            <div className="copyright" style={{textAlign: "center"}}>

                                <p>
                                    2017 NetLS Software Development
                                </p>

				            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>;
    }
}
