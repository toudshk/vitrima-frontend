import { getAdminHomeUrl, getAdminUrl } from "@/config/url.config";
import { INavItem } from "./admin-navigation.interface";

export const navItems: INavItem[] = [

    { 
        title: 'Статистика',
        link: getAdminHomeUrl()
    },
    { 
        title: 'Пользователи',
        link: getAdminUrl('users')
    },
    { 
        title: 'Услуги',
        link: getAdminUrl('works')
    },
    { 
        title: 'Теги',
        link: getAdminUrl('tags')
    },
]