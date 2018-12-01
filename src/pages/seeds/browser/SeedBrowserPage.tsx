import * as React from 'react';

import { Button } from 'antd';

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ConnectedReduxProps, ApplicationState } from '../../../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces, WithNamespaces } from "react-i18next";

interface PropsFromState {
}

interface PropsFromDispatch {
    
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps & WithNamespaces

class SeedBrowserPage extends React.Component<AllProps> {


    public render() {
        const { t } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                    </p>
                <Button type="primary">{t('testSubSpace.testSubKey')}</Button>
            </div>

        );
    }
}

const mapStateToProps = ({}: ApplicationState) => ({
   
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(SeedBrowserPage)));