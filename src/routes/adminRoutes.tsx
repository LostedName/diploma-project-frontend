import { BanlistPage, DeletedPostsPage, LoginPage, MainPage, NotFoundPage, ReportsPage, UserPage, UsersPage } from "../pages/admin-pages";
import { ElementRoutes } from "../types/routes";

const loggedRoutes: ElementRoutes = [
    {
        path:"/users",
        element: UsersPage, 
    },
    {
        path:"/users/:id",
        element: UserPage, 
    },
    {
        path:"/banlist",
        element: BanlistPage, 
    },
    {
        path:"/reported-posts",
        element: ReportsPage, 
    },
    {
        path:"/deleted-posts",
        element: DeletedPostsPage, 
    },
    // {
    //     path:"/",
    //     element: MainPage, 
    // },
];
const unloggedRoutes: ElementRoutes = [
    {
        path:"/",
        element: LoginPage,
    },
];
const defaultRoutes: ElementRoutes = [
    {
        path:"/*",
        element: NotFoundPage,
    },
];

export {defaultRoutes, unloggedRoutes, loggedRoutes};