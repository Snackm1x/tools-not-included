import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../store';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface PropsFromState {
}

type AllProps = PropsFromState & ConnectedReduxProps & RouteComponentProps

class Footer extends React.Component<AllProps> {
    public render() {
        return (
            <Layout.Footer>
                <div className="max-content-width">
                    <Menu theme="dark" mode="horizontal" selectable={false} style={{maxWidth: '100%'}}>
                        <Menu.Item key="about"><Link to="/">About</Link></Menu.Item>
                        <Menu.Item key="coffee"><Link to="/coffee"><Icon type="coffee" /> Buy me a coffee</Link></Menu.Item>
                        <Menu.Item key="github"> <Link to="/"><Icon type="github" /> Github</Link></Menu.Item>
                    </Menu>
                </div>
            </Layout.Footer>
        );
    }
}

const mapStateToProps = ({ }: ApplicationState) => ({})

export default withRouter(connect(mapStateToProps)(Footer));
