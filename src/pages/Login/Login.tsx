import './Login.css'
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

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
            <FacebookLogin
                appId="790248761880505"
                autoLoad={true}
                scope='public_profile, email, user_birthday, instagram_basic, pages_show_list, instagram_manage_insights, pages_read_engagement'
                fields="name,email,picture"
                callback={responseFacebook} />
        </div>
    )
}