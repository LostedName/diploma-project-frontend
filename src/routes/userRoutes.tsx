import { AboutPage, ForgotPassPage, HomePage, LoginPage, PrivacyPage, RedirectPage, RegisterPage, SettingsPage, SignUpCheckEmailPage, SignUpConfirmationErrorPage, SignUpConfirmedPage, TermsPage, TwoFactorAuthPage } from "../pages/user-pages";
import SignUpConfirmPage from "../pages/user-pages/sign-up-pages/sign-up-confirm-page/SignUpConfirmPage";
import { ElementRoutes } from "../types/routes";

const RedirectToLogin: React.FC = () => {
    return <RedirectPage redirectPath="/login"/>;
} 

const RedirectToHome: React.FC = () => {
    return <RedirectPage redirectPath="/home"/>;
} 

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
        path:"/two-factor-auth",
        element: TwoFactorAuthPage,
    },
    {
        path:"/sign-up-check-email",
        element: SignUpCheckEmailPage,
    },
    {
        path:"/confirm",
        element: SignUpConfirmPage,
    },
    {
        path:"/recovering-password",
        element: ForgotPassPage,
    },
    {
        path:"/signup-confirmed",
        element: SignUpConfirmedPage,
    },
    {
        path:"/signup-confirmation-error",
        element: SignUpConfirmationErrorPage,
    },
    {
        path:"/*",
        element: RedirectToLogin, 
    },

];

const loggedRoutes: ElementRoutes = [
    {
        path:"/home",
        element: HomePage, 
    },
    {
        path:"/settings/*",
        element: SettingsPage, 
    },
    {
        path:"/*",
        element: RedirectToHome, 
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
        path:"/*",
        element: RedirectToLogin, 
    },
];

export {defaultRoutes, unloggedRoutes, loggedRoutes};