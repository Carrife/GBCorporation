import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiOutlineBook/>,
        cName: 'nav-text'
    },
    {
        title: 'Templates',
        path: '/templates',
        icon: <AiIcons.AiOutlineFile/>,
        cName: 'nav-text'
    },
    {
        title: 'Tests',
        path: '/tests',
        icon: <AiIcons.AiOutlineEdit/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiIcons.AiOutlineSetting/>,
        cName: 'nav-text'
    },
]

export const SidebarDataWithoutTemplates = [
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiOutlineBook/>,
        cName: 'nav-text'
    },
    {
        title: 'Tests',
        path: '/tests',
        icon: <AiIcons.AiOutlineEdit/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiIcons.AiOutlineSetting/>,
        cName: 'nav-text'
    },
]

export const SidebarDataWithoutTests = [
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiOutlineBook/>,
        cName: 'nav-text'
    },
    {
        title: 'Templates',
        path: '/templates',
        icon: <AiIcons.AiOutlineFile/>,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <AiIcons.AiOutlineSetting/>,
        cName: 'nav-text'
    },
]


export const FooterData = [
    {
        title: 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout/>,
        cName: 'nav-text'
    },
]
