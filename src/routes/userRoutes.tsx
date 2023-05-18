import { AboutPage, FollowsPage, LoginPage, MainPage, MustLoginPage, NotFoundPage, PrivacyPage, ProfilePage, RegisterPage, SearchPage, SettingsPage, SubscribersPage, TermsPage, UserProfilePage } from "../pages/user-pages";
import BanPage from "../pages/user-pages/ban-page/BanPage";
import { ElementRoutes } from "../types/routes";

const loggedRoutes: ElementRoutes = [
    {
        path:"/profile",
        element: ProfilePage, 
    },
    {
        path:"/profile/:userId",
        element: UserProfilePage,
    },
    {
        path:"/follows",
        element: FollowsPage, 
    },
    {
        path:"/subscribers",
        element: SubscribersPage, 
    },
    {
        path:"/settings",
        element: SettingsPage, 
    },
];
const bannedRoutes: ElementRoutes = [
    {
        path:"/profile",
        element: BanPage, 
    },
    {
        path:"/profile/:userId",
        element: BanPage,
    },
    {
        path:"/follows",
        element: BanPage, 
    },
    {
        path:"/subscribers",
        element: BanPage, 
    },
    {
        path:"/settings",
        element: BanPage, 
    },
];
const unloggedRoutes: ElementRoutes = [
    {
        path:"/registration",
        element: RegisterPage,
    },
    {
        path:"/login",
        element: LoginPage,
    },
    {
        path:"/profile",
        element: MustLoginPage, 
    },
    {
        path:"/profile/:userId",
        element: MustLoginPage, 
    },
    {
        path:"/follows",
        element: MustLoginPage,
    },
    {
        path:"/subscribers",
        element: MustLoginPage, 
    },
    {
        path:"/settings",
        element: MustLoginPage,
    },
];
const defaultRoutes: ElementRoutes = [
    {
        path:"/about",
        element: AboutPage, 
    },
    {
        path:"/privacy",
        element: PrivacyPage, 
    },
    {
        path:"/terms",
        element: TermsPage, 
    },
    {
        path:"/search",
        element: SearchPage,
    },
    {
        path:"/",
        element: MainPage, 
    },
    {
        path:"/*",
        element: NotFoundPage, 
    },
];

export {defaultRoutes, unloggedRoutes, loggedRoutes, bannedRoutes};