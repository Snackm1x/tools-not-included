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
            <Header className="secondary-header subsection-active">
                <div className="max-content-width">
                    <Menu id="first-sub-menu" theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item key="1"><Link to="/seeds">Seed Browser</Link></Menu.Item>
                    </Menu>

                    <div id="second-sub-menu-gradient-wrapper">
                        <Menu id="second-sub-menu" theme="dark" mode="horizontal" selectable={false} >
                            <Menu.Item key="1"><Link to="/seeds">Browser</Link></Menu.Item>
                            <Menu.Item key="2">Mod</Menu.Item>
                            <Menu.Item key="3">Stats</Menu.Item>
                        </Menu>
                    </div>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({

})


export default withRouter(connect(mapStateToProps)(Navbar));
