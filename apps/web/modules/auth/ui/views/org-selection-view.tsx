import { OrganizationSwitcher } from "@clerk/nextjs";

export const OrgSelectionView = () => {
    return (
        <OrganizationSwitcher 
            afterCreateOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            hidePersonal
            skipInvitationScreen
        />
    );
};