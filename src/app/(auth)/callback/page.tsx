
import { onAuthenticateuser } from "@/actions/user"
import { redirect } from 'next/navigation';


const AuthCallbackPage = async () => {
    const auth = await onAuthenticateuser();

    if (auth.status === 200 || auth.status == 201) {
        redirect('/dashboard')
    } else if ( auth.status === 403 || auth.status === 400 || auth.status === 500){
        redirect('/sign-in')
    }
}

export default AuthCallbackPage