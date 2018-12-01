import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../store';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
const { Header } = Layout;

interface PropsFromState {
}


type AllProps = PropsFromState & ConnectedReduxProps & RouteComponentProps

class Navbar extends React.Component<AllProps> {
    public render() {
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({

})


export default withRouter(connect(mapStateToProps)(Navbar));
