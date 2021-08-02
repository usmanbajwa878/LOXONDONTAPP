export const COLORS = {
    CTA: '#703cee',
    WHITE: '#ffffff',
    BLACK: '#000000',
    BACKGROUND: '#f7f7fc',
    GREEN:'#7d9672',
    LIGHTGREEN:'#E5EAE3',
    BODY: '#181818',
    BODY_MUTED: 'rgba(24, 24, 24, 0.4)',
    BORDER_GRAY: 'rgba(0, 0, 0, 0.1)',
    DISABLED_BUTTON_GREY: 'rgba(237, 237, 238, 1)',
    DISABLED_TEXT_GREY: 'rgba(139, 139, 139, 1)',
    ICONS: '#575366',
    LIGHT_CTA: '#ab8cf5',
    LIGHT_GREY: '#d3d3d3',
    LINK_BLUE: 'rgba(0, 145, 255, 1)',
    PALE_GREY: '#f7f7fc',
    MAP_PIN_GRAY: 'rgba(216, 216, 216, 1)',
    IMAGE_BORDER: '#e4e4e4',
    SEARCH_BAR_BLACK: 'rgba(0, 0, 0, 0.4)',
    SEGMENTED_BLACK: 'rgba(118, 118, 128, 0.1)',
    SUBTITLE_BLACK: 'rgba(0, 0, 0, 0.4)',
    TRANSPARENT: 'transparent',
    TRANSPARENT_BLACK: 'rgba(0, 0, 0, 0.5)',
    TRANSPARENT_MEDIUM_GREY: 'rgba(0, 0, 0, 0.2)',
    TRANSPARENT_LIGHT_GREY: 'rgba(0, 0, 0, 0.05)',
    TRANSPARENT_WHITE: 'rgba(255, 255, 255, 0.8)',

}

export const MESSAGES = {
    ACCOUNT_EXISTS: 'Account Already Exists',
    WEAK_PASSWORD: 'Try Strong Password',
    INCORRECT_PASSWORD: 'Password is Incorrect',
    INCORRECT_CREDENTIALS: 'Email and Password is Incorrect',
    SUCCESS: 'Success',
    LOGIN_SUCCESSFUL: 'Login Successfull',
    ERROR: 'Error',
    SIGNUP_SUCCESSFUL: 'Signup Successfull',
    OK: 'Okay',
    PASSWORD_SUCCESSFUL: 'Password Changed Successfully',
    PASSWORD_FAILED: 'Sorry You dont have Access.Contact Admin!',
    CAMERA_UNAVAILABLE: 'Camera not available on device',
    NOT_PERMISSIONS: 'Permission not Granted',
    POST_SUCCESS:'Posted Successully',
    POST_ERROR:'Error Ocurred in Posting Try Again!',
    NETWORK_ERROR:'Connection Lost! Try Again'

}

export const TEXTS = {
    loginPolicy: 'Creating an account means that you agree with our Terms of Service and Our Policy Policy',
    AlreadyAccount: 'Already Have an Account',
    GoogleSignIn: 'Sign Up with Google',
    keepLoggedIn: 'Keep me Logged In',
    NoAccount: 'Dont Have an Account?',
    AppMotivation: ' to explore the power of Social Media',
    Login: 'Login',
    Signup: 'SignUp',
    change_Password: 'Try Changing One',
    Forget_Password: 'Forget Password? ',
  

}
export const COLLECTIONS = {
    USERS: 'Users',
    POSTS: 'Posts',
    NOTIFICATIONS:'Notifications'
}
export const ERROR_CODES = {
    ACCOUNT_EXISTS: 'auth/email-already-in-use',
    WEAK_PASSWORD: 'auth/weak-password',
    USER_NOT_FOUND: 'auth/user-not-found',
    WRONG_PASSWORD: 'auth/wrong-password',
    CAMERA_UNAVAILABLE: 'camera_unavailable',
    PERMISSION: 'permission',

}

export const BASE_URL = 'http://d49592377dde.ngrok.io'


export const ROUTES = {
    SIGN_UP: 'SignUp',
    LOGIN: 'Login',
    OTP: 'Otp',
    FORGET_PASSWORD: 'ForgetPassword'
}
export const PLACEHOLDERS = {
    EMAIL: 'Email Address',
    NAME:'Name',
    PASSWORD: 'Password',
    NEW_PASSWORD: 'New Password',
    OLD_PASSWORD: 'Old Password',
    SIGN_UP: 'SIGN UP',
    LOGIN: 'LOGIN',
    FORGET_PASSWORD: 'Forget Password',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    PHONE_NUMBER: 'Phone Number',
    SUBMIT: 'Submit',
    PHOTO: 'photo'
}

export const VIDEO_OPTIONS = [
    {
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'high',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
    }
]