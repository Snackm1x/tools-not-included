import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../store';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
const { Header } = Layout;

interface PropsFromState {
}


type AllProps = PropsFromState & ConnectedReduxProps & RouteComponentProps

class Navbar extends React.Component<AllProps> {
    public render() {
        return (
            //todo: reduce menu to a single link?
            <Header className="primary-header">
                <div className="max-content-width">
                    <img id="logo" src='/images/oxygen_helmet.png' />
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item key="1" ><Link to="/">Tools Not Included</Link></Menu.Item>
                    </Menu>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({

})


export default withRouter(connect(mapStateToProps)(Navbar));
