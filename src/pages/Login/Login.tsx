import './Login.css'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookFilled from '@ant-design/icons';

type LoginProps = {
    onLogin: any
}

export function Login({ onLogin }: LoginProps) {

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        console.log(response);
        if (response.accessToken) {
            onLogin(response);
        } else {
            console.log(response);
        }
    }

    return (
        <div className='login'>
            <FacebookFilled />
            <FacebookLogin
                appId="790248761880505"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook} />
        </div>
    )
}