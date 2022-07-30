const env = {
    API_URL: "http://bao.name.vn",
    SITE_URL: "https://localhost:300",
    ACTIVE_ENV: "development"
}

export const SITE_NAME = 'Thuê Xe';

export const SITE_URL = env.SITE_URL;

export const IS_DEV = env.ACTIVE_ENV !== 'production';

export const API_URL = env.API_URL;

export const LOCAL_STORAGE_NAME = {
    IDENTIFY_USER_JWT: '_jwt_user_',
    META_USER: '_meta_user_',
}

export const MOBILE_WIDTH_MAXIMUM = 950;

export const PAGE_TAB = {
    HOME: {
        value: 'home',
    },
    TRENDING: {
        value: 'trending'
    },
    INBOX: {
        value: 'inbox'
    },
    NOTIFICATION: {
        value: 'notification'
    },
}

export const COOKIE = {
    META_USER: {
        USERNAME: "username",
        USERID: "userId",
    },
}