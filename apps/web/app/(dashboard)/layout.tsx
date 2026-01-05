import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout";

const Layout = ({children}: {children:React.ReactNode}) => {
    return (
        <DashboardLayout> 
            {/* use the Dashboard layout in modules to custom it more easily*/}
            {children}
        </DashboardLayout>
    );
};

export default Layout;