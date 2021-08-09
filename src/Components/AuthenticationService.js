class AuthenticationService {

    registerSuccessfulLogin(userid,token,urole) {
        console.log("register successful login")
        sessionStorage.setItem("AuthenticatedUser",userid)
        sessionStorage.setItem("AuthorizationToken",`Bearer ${token}`)
        sessionStorage.setItem("AuthenticatedRole",urole)
    }

    logout() {
        sessionStorage.removeItem('AuthenticatedUser')
        sessionStorage.removeItem('AuthorizationToken')
        sessionStorage.removeItem('AuthenticatedRole')
    }

    isUserLoggedin() {
        let user=sessionStorage.getItem('AuthenticatedUser')
        if (user===null) return false;
        return true;
    }

    getUserIdLoggedin() {
        let userid=sessionStorage.getItem('AuthenticatedUser')
        return userid;
    }

    getUserTokenLoggedin() {
        let token=sessionStorage.getItem('AuthorizationToken')
        return token;
    }

    setComponentFlag(flag) {
        sessionStorage.setItem("componentFlag",flag)
    }

    getComponentFlag() {
        let flag = sessionStorage.getItem("componentFlag")
        return flag;
    }

    getUserRoleLoggedin() {
        let urole=sessionStorage.getItem('AuthenticatedRole')
        return urole;
    }

}
export default new AuthenticationService()