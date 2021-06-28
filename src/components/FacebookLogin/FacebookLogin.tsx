import { PropertySafetyTwoTone } from '@ant-design/icons';
import React, { Component } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { threadId } from 'worker_threads';

type FacebookLoginProps = {
    onLogin: any
}

class FacebookLogin extends Component<FacebookLoginProps> {
    login = false;

    constructor(props: FacebookLoginProps) {
        super(props);
        this.state = { date: new Date() };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            (js as any).src = "https://connect.facebook.net/en_US/sdk.js";
            (fjs as any).parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    componentDidMount() {
        let it = this;
        console.log('componentDidMount');
        (window as any).fbAsyncInit = function () {
            console.log('try to get status2');
            (window as any).FB.init({
                appId: '790248761880505',
                cookie: true,
                xfbml: true,
                version: 'v10.0',
                status: true
            });
            console.log('try to get status')
            it.checkLoginState();
            this.checkLoginState();
            (window as any).FB.AppEvents.logPageView();
        };
        //this.checkLoginState();
    }
    getUserDetails = () => {
        let it = this;
        (window as any).FB.login(function (response: any) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                (window as any).FB.api('/me', function (response: any) {
                    //Write your back end api call
                    console.log(response)
                    console.log('Good to see you, ' + response.name + '.');
                    (window as any).FB.getLoginStatus(function (response: any) {
                        console.log(response);
                    });
                    it.props.onLogin(response);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
    checkLoginState = () => {
        console.log('checkLoginState');
        let it = this;
        (window as any).FB.getLoginStatus(function (response: any) {
            it.login = response.status === 'connected';
            console.log('auth', it.login)
            //statusChangeCallback(response);
        });
    }
    render() {
        return (
            <React.Fragment>
                23213123
                <button onClick={this.getUserDetails}>
                    Facebook Login Button
                </button>
            </React.Fragment>
        )
    }
}
export default FacebookLogin;