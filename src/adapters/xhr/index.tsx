import axios from 'axios';

const BASE_API = 'https://graph.facebook.com/v10.0'

export function getFacebookPages() {
    const token = localStorage.getItem('access_token');
    return axios.get(`${BASE_API}/me/accounts?access_token=${token}`);
}

export function getInstagramAccounts(fbPageId: number) {
    const token = localStorage.getItem('access_token');
    return axios.get(`${BASE_API}/${fbPageId}?fields=instagram_business_account&access_token=${token}`);
}

export function getInstAccountMediaObjects(instAccountId: number) {
    const token = localStorage.getItem('access_token');
    return axios.get(`${BASE_API}/${instAccountId}/media?access_token=${token}`);
}

export function getInstAccountInfo(instAccountId: string) {
    const token = localStorage.getItem('access_token');
    const fields = 'biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website';
    return axios.get(`${BASE_API}/${instAccountId}?fields=${fields}&access_token=${token}`);
}

export function getInstAccountStatistic(instAccountId: string) {
    const token = localStorage.getItem('access_token');
    const metrics = 'audience_city,audience_country,audience_gender_age,audience_locale,audience_locale,online_followers';
    // email_contacts,follower_count,get_directions_clicks,impressions
    return axios.get(`${BASE_API}/${instAccountId}/insights?metric=${metrics}&period=lifetime&access_token=${token}`);
}