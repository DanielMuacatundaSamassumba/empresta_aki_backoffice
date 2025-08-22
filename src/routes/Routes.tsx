import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/modules/auth/pages/LoginPage"
import ResetPasswordPage from "@/modules/auth/pages/ResetPasswordPage"
import OtpVerifyPage from "@/modules/auth/pages/OtpVerifyPage"
import DashboardPage from "@/modules/dashboard/pages/DashboardPage"
import CustomerMainPage from "@/modules/customer/pages/CustomerMainPage"
import CustomerProfilePage from "@/modules/customer/pages/CustomerProfilePage"
import CustomerCreatePage from "@/modules/customer/pages/CustomerCreatePage"
import CustomerUpdate from "@/modules/customer/pages/CustomerUpdate"
import NewPasswordPage from "@/modules/auth/pages/NewPasswordPage"
import { AuthMiddlewareComponet } from "@/middlewares/AuthVerification"
import { PublicRoute } from "@/middlewares/PublicRouts"
import NotoFounded from "@/modules/ErrorPages/NotFounded"
import ErrorUnexpected from "@/modules/ErrorPages/ErrorUnexpected"
import PlansMainPage from "@/modules/plans/pages/PlansMainPage"
import PlanCreatePage from "@/modules/plans/pages/PlanCreatePage"
import PlanUpdatePage from "@/modules/plans/pages/PlanUpdatePage"
import ManegerMainPage from "@/modules/maneger/pages/ManegerMainPage"
import ManegerCreatePage from "@/modules/maneger/pages/ManegerCreatePage"
import CreaditoRequestMainPage from "@/modules/credit_request/pages/CreaditRequestMainPage"
import { PersonalRequestCreditePage } from "@/modules/credit_request/pages/PersonalRequestCreditePage"
import CreditRequestDetails from "@/modules/credit_request/pages/CreditRequestDetails"
import ProfileOfUser from "@/modules/profile/pages/ProfileOfUser"
import BlogMainPage from "@/modules/blog/pages/BlogMainPage"
import BlogCreatePage from "@/modules/blog/pages/BlogCreatePage"
import BankMainPage from "@/modules/banks/pages/BankMainPage"
import CreateBankPage from "@/modules/banks/pages/CreateBankPage"
import UpdateBankPage from "@/modules/banks/pages/UpdateBankPage"
import PersonalInstalmentCredit from "@/modules/credit_request/pages/PersonalInstalmentCredit"
import ManegerUpdatePage from "@/modules/maneger/pages/ManegerUpdatePage"
import PriveteRoute from "@/middlewares/PriveteRoute"
import ProfissionMainPage from "@/modules/profissions/pages/ProfissionMainPage"
import ProfissionCreatePage from "@/modules/profissions/pages/ProfissionCreatePage"
import ProfissionUpdatePage from "@/modules/profissions/pages/ProfissionUpdatePage"
import PaymentMainPage from "@/modules/payment/pages/PaymentMainPage"
import ReimbursementMainPage from "@/modules/reimbursement/pages/ReimbursementMainPage"
const DashboardPageAuthententicate = AuthMiddlewareComponet(DashboardPage)
const CustomerPageAuthententicate = AuthMiddlewareComponet(CustomerMainPage)
const CustomerProfilePageAuthententicate = AuthMiddlewareComponet(CustomerProfilePage)
const CustomerCreatePageAuthententicate = AuthMiddlewareComponet(CustomerCreatePage)
const CustomerUpdatePageAuthententicate = AuthMiddlewareComponet(CustomerUpdate)
const PlanMainPageAuthententicate = AuthMiddlewareComponet(PlansMainPage)
const PlanCreatePageAuthententicate = AuthMiddlewareComponet(PlanCreatePage)
const PlanUpdatePageAuthententicate = AuthMiddlewareComponet(PlanUpdatePage)
const ManegerMainPageAuthententicate = AuthMiddlewareComponet(ManegerMainPage)
const ManegerCreatePageAuthententicate = AuthMiddlewareComponet(ManegerCreatePage)
const CreaditoRequestMainPageAuthententicate = AuthMiddlewareComponet(CreaditoRequestMainPage)
const PersonalRequestCreditePageAuthententicate = AuthMiddlewareComponet(PersonalRequestCreditePage)
const CreditRequestDetailsAuthententicate = AuthMiddlewareComponet(CreditRequestDetails)
const ProfileOfUserAuthed = AuthMiddlewareComponet(ProfileOfUser)
const BlogMainPageAuthed = AuthMiddlewareComponet(BlogMainPage)
const BlogCreatePageAuthed = AuthMiddlewareComponet(BlogCreatePage)
const BankMainPageAuthed = AuthMiddlewareComponet(BankMainPage)
const CreateBankPageAuth = AuthMiddlewareComponet(CreateBankPage)
const UpdateBankPageAuth = AuthMiddlewareComponet(UpdateBankPage)
const PersonalInstalmentCreditPageAuth = AuthMiddlewareComponet(PersonalInstalmentCredit)
const ManegerUpdatePagePageAuth = AuthMiddlewareComponet(ManegerUpdatePage)
const ProfissionMainPageAuth = AuthMiddlewareComponet(ProfissionMainPage)
const ProfissionCreatePageAuth = AuthMiddlewareComponet(ProfissionCreatePage)
const ProfissionUpdatePageAuth = AuthMiddlewareComponet(ProfissionUpdatePage)
const PaymentMainPageAuth = AuthMiddlewareComponet(PaymentMainPage)
const ReimbursementMainPageAuth = AuthMiddlewareComponet(ReimbursementMainPage)
const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        )

    },
    {
        path: "reset-password",
        element: (
            <PublicRoute>
                <ResetPasswordPage />
            </PublicRoute>

        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/otp-verify-code",
        element: (

            <OtpVerifyPage />

        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/new-password",
        element: (
            <PublicRoute>
                <NewPasswordPage />
            </PublicRoute>

        ),
        errorElement: <ErrorUnexpected />
    },
    {

        path: "/dashboard",
        element: <DashboardPageAuthententicate />,
        errorElement: <ErrorUnexpected />



    },
    {
        path: "/customer",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CustomerPageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "customer/profile",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CustomerProfilePageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "customer/create",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CustomerCreatePageAuthententicate />
            </PriveteRoute>
        )
    },
    {
        path: "customer/update",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CustomerUpdatePageAuthententicate />
            </PriveteRoute>
        )
    },
    {
        path: "/new-password",
        element: <NewPasswordPage />,
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/plan",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst", "financial-manager"]}>
                <PlanMainPageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "plan/create",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst","financial-manager"]}>
                <PlanCreatePageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "plan/update",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst", "financial-manager"]}>
                < PlanUpdatePageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {

        path: "maneger",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst", "financial-manager"]}>
                <ManegerMainPageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {


        path: "maneger/create",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst", "financial-manager"]}>
                <ManegerCreatePageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {


        path: "maneger/update",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator","credit-analyst", "financial-manager"]}>
                <ManegerUpdatePagePageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/credit-request",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CreaditoRequestMainPageAuthententicate />,
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "credit-request/personal",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <PersonalRequestCreditePageAuthententicate />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "credit-request/personal/detail",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <CreditRequestDetailsAuthententicate />
            </PriveteRoute>
        ),

        errorElement: <ErrorUnexpected />
    },
    {
        path: "profile",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <ProfileOfUserAuthed />
            </PriveteRoute>
        ),

        errorElement: <ErrorUnexpected />
    },
    {
        path: "*",
        element: <NotoFounded />,
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/blog",
        element: <BlogMainPageAuthed />,
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/blog/create",
        element: <BlogCreatePageAuthed />,
        errorElement: <ErrorUnexpected />
    },
    {
        path: "/banks",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <BankMainPageAuthed />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "banks/create",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <CreateBankPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },

    {
        path: "banks/update",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <UpdateBankPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "credit-request/personal/installments",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "teller", "credit-analyst", "financial-manager"]}>
                <PersonalInstalmentCreditPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "profissions",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <ProfissionMainPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "profissions/create",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <ProfissionCreatePageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "profissions/update",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "credit-analyst", "financial-manager"]}>
                <ProfissionUpdatePageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "payment",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "financial-manager"]}>
                <PaymentMainPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },
    {
        path: "reimbursement",
        element: (
            <PriveteRoute allowedRoles={["super-admin", "administrator", "financial-manager"]}>
                <ReimbursementMainPageAuth />
            </PriveteRoute>
        ),
        errorElement: <ErrorUnexpected />
    },

])

export { routes }