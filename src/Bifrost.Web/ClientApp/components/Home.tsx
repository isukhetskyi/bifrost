import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface HomeProps {
    children?: React.ReactNode;
}

export class Home extends React.Component<RouteComponentProps<HomeProps>, {}> {
    public render() {
        return <div>
            <h1>NetLS Software development welcomes you</h1>
            {this.props.children}
        </div>
    }
}