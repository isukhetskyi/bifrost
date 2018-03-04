import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IBaseProps } from '../shared/IBaseProps';

interface NavMenuProps extends IBaseProps {

}

interface NavMenuState {
    authorized?: boolean;
}

export class NavMenu extends React.Component<NavMenuProps, NavMenuState> {
    constructor(props: any) {
        super(props)

        this.state = {
            authorized: false
        }
    }
    public render() {
        return <div className={this.props.classes} style={{ zIndex: 15 }}>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Bifrost</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-dashboard'></span> Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'#'} exact data-toggle="collapse" data-target="#developersurvey" activeClassName='active'>
                                <span className='glyphicon glyphicon-folder-open'></span> Developer's Survey
                            </NavLink>
                        </li>
                        <ul className="sub-menu collapse" id="developersurvey">
                            <li>
                                <NavLink to={'/survey'} exact activeClassName='active'>
                                    <span className='glyphicon glyphicon-flag'></span> Take a Survey
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/statistics'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-stats'></span> Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/respondents'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Respondents
                                </NavLink>
                            </li>
                        </ul>
                        <li>
                            <NavLink to={'#'} exact data-toggle="collapse" data-target="#adminarea" activeClassName='active'>
                                <span className='glyphicon glyphicon-cog'></span> Admin Area
                            </NavLink>
                        </li>
                        <ul className="sub-menu collapse" id="adminarea">
                            <li>
                                <NavLink to={'#'} exact activeClassName='active'>
                                    <span className='glyphicon glyphicon-user'></span> Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'#'} exact activeClassName='active'>
                                    <span className='glyphicon glyphicon-tags'></span> Roles
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'#'} exact activeClassName='active'>
                                    <span className='glyphicon glyphicon-paste'></span> Technologies
                                </NavLink>
                            </li>
                            <li>
                            <NavLink to={'/account/register'} activeClassName='active'>
                                <span className='glyphicon glyphicon-plus-sign'></span> Register
                            </NavLink>
                        </li>
                        </ul>
                        <li>
                            <NavLink to={'/account/login'} activeClassName='active'>
                                <span className='glyphicon glyphicon-log-in'></span> Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
