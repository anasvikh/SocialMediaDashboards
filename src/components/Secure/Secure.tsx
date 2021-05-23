
import './Secure.css'

import { Divider, Layout, Menu } from 'antd';
import { UserOutlined, LineChartOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter, Link, Route, Router, Switch } from 'react-router-dom';
import { Statistic } from '../../pages/Statistic/Statistic';
import { Profile } from '../../pages/Profile/Profile';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

const { Sider, Content } = Layout;

type SecureProps = {
    userInfo: ReactFacebookLoginInfo | undefined,
    onLogout: any
}

export function Secure({ onLogout, userInfo }: SecureProps) {
    const items = [
        { name: 'Профиль', path: '/profile', icon: <UserOutlined style={{ fontSize: '20px' }} /> },
        { name: 'Статистика', path: '/statistic', icon: <LineChartOutlined style={{ fontSize: '20px' }} /> },
        { name: 'Настройки', path: '/', icon: <SettingOutlined style={{ fontSize: '20px' }} /> },
        // { name: 'Выход', path: '/', icon: <LogoutOutlined style={{ fontSize: '20px' }} /> },
    ];

    return (
        <Layout className='layout'>
            <Sider collapsed className='sidebar'>
                <div className='user-picture'>
                    <img src={userInfo?.picture?.data.url}></img>
                </div>
                <Divider></Divider>
                <Menu>
                    {items.map(item =>
                        <Menu.Item icon={item.icon} key={item.name}>
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                        </Menu.Item>
                    )}
                    <Menu.Item
                        icon={<LogoutOutlined
                            style={{ fontSize: '20px' }} />}
                        key={'logout'}
                        onClick={onLogout}>
                        Выход
                        </Menu.Item>
                </Menu>
            </Sider>
            <Content>
                {/* <BrowserRouter> */}
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/statistic">
                        <Statistic />
                    </Route>
                </Switch>
                {/* </BrowserRouter> */}
            </Content>
        </Layout>
    )
}