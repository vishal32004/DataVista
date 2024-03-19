import { currentUser, redirectToSignIn } from "@clerk/nextjs";

interface UserData {
    id: string;
    firstName: string;
    imageUrl: string;
    emailAddresses: string;
}

export const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }
    function isString(value: any): value is string {
        return typeof value === 'string';
    }

    const data: UserData = {
        id: user.id,
        firstName: isString(user.firstName) ? `${user.firstName}` : '',
        imageUrl: user.imageUrl,
        emailAddresses: user.emailAddresses[0].emailAddress
    };

    return data;
};
