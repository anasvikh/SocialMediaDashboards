
import { useEffect, useState } from 'react'
import { getFacebookPages, getInstAccountInfo, getInstAccountStatistic, getInstagramAccounts } from '../../adapters/xhr';
import { IInstUser, ILookup } from '../../models/User';
import './Profile.css'
import { Card } from 'antd';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { IFollowerCitiesData } from '../../models/Charts';
import { userInfo } from 'os';

export function Profile() {

    const [fbPage, setFbPage] = useState<ILookup>();
    const [instPageId, setInstPageId] = useState<number>(0);
    const [instUserInfo, setInstUserInfo] = useState<IInstUser>();
    const [followersCitiesInfo, setfollowersCitiesInfo] = useState<IFollowerCitiesData>();

    useEffect(() => {
        getFacebookPages()
            .then(x => x.data)
            .then(fbResponse => {
                console.log(fbResponse.data);
                setFbPage(fbResponse.data[0]);
                return fbResponse.data[0];
            })
            .then(data => getInstagramAccounts(data.id))
            .then(x => x.data)
            .then(instResponse => {
                console.log(instResponse.instagram_business_account.id);
                setInstPageId(instResponse.instagram_business_account.id);
                return instResponse.instagram_business_account.id;
            })
            .then(id => getInstAccountInfo(id))
            .then(x => x.data)
            .then((fbResponse: IInstUser) => {
                console.log(fbResponse);
                setInstUserInfo(fbResponse);
                return fbResponse.id;
            })
            .then(id => getInstAccountStatistic(id.toString()))
            .then(x => x.data)
            .then((response: any) => {
                console.log(response);
                if (instUserInfo && instUserInfo.followers_count > 100) {
                    console.log(response.data[0].values[0].value);
                    let parsedValues = [];
                    for (const [key, value] of Object.entries(response.data[0].values[0].value)) {
                        parsedValues.push({name: key, value: value as number})
                    }
                    console.log(parsedValues);
                    response.data[0].values = parsedValues.sort((a, b) => b.value - a.value);
                    setfollowersCitiesInfo(response.data[0]);
                }
            })
    }, []);

    const baseStatistic = [
        { name: 'Публикации', value: instUserInfo?.media_count },
        { name: 'Подписчики', value: instUserInfo?.followers_count },
        { name: 'Подписки', value: instUserInfo?.follows_count },
    ];

    const testData = [
        {
            "country": "AD",
            "hot dog": 120,
        },
        {
            "country": "AE",
            "hot dog": 53,
        },
        {
            "country": "AF",
            "hot dog": 179,
        },
        {
            "country": "AG",
            "hot dog": 121,
        },
        {
            "country": "AI",
            "hot dog": 72,
        },
        {
            "country": "AL",
            "hot dog": 184,
        },
        {
            "country": "AM",
            "hot dog": 90,
        }
    ];

    return (
        <div>
            {/* <Card title="Страница Facebook" style={{ width: 300, margin: 25 }}>
                {<p>{fbPage?.name}</p>}
            </Card> */}
            <Card style={{ width: 300, margin: 25 }}>
                <div className='account-main-info'>
                    <div className='account-picture'>
                        <img src={instUserInfo?.profile_picture_url}></img>
                    </div>
                    {<div className='account-username'>{instUserInfo?.username}</div>}
                    {<div>{instUserInfo?.name}</div>}
                    <div className='account-statistic'>
                        {baseStatistic.map(item => <div className='account-statistic-item'>
                            <div className='account-statistic-item-name'>{item.name}</div>
                            <div className='account-statistic-item-value'>{item.value}</div>
                        </div>)}
                    </div>
                </div>
            </Card>
            <Card title="" style={{ width: 600, margin: 25, height: 300 }}>
                <div style={{ height: 300 }}>
                    {followersCitiesInfo && <BarChart data={followersCitiesInfo.values}></BarChart>}
                </div>
            </Card>
        </div>

    )
}