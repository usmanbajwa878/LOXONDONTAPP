function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const SignUpVerification = (name, email, password, phoneNumber, phoneVerified, check) => {
    var response = {
        verified: false,
        message: "KINDLY FILL ALL FIELDS"
    }
    if (!name && !email && !password && !phoneNumber) {
        return response
    }
    else if (name.length < 3) {
        response.verified = false;
        response.message = "NAME MUST BE 3 CHARACTERS LONG"
        return response;
    }
    else if (password.length < 8) {
        response.verified = false;
        response.message = "PASSWORD MUST BE 8 CHARACTERS LONG"
        return response;
    } else if (phoneNumber.length < 11) {
        response.verified = false;
        response.message = "PHONE NUMBER MUST BE 11 DIGITS"
        return response;
    } else if (!phoneVerified) {
        response.verified = false;
        response.message = "PLZ VERIFY PHONE NUMBER "
        return response;
    }
    else if (!validateEmail(email)) {
        response.verified = false;
        response.message = "EMAIL IS NOT CORRECT"
        return response;
    }
    else if (check === false) {
        response.verified = false;
        response.message = "KINDLY ACCEPT OUR TERMS"
        return response;
    }
    else {
        response.verified = true;
        response.message = "success"
        return response
    }

}

export const loginVerification = (email, password) => {
    var response = {
        verified: false,
        message: "KINDLY FILL ALL FIELDS"
    }
    if (!email && !password) {
        return response
    }
    else if (password.length < 8) {
        response.verified = false;
        response.message = "PASSWORD MUST BE 8 CHARACTERS LONG"
        return response;
    }
    else if (!validateEmail(email)) {
        response.verified = false;
        response.message = "EMAIL IS NOT CORRECT"
        return response;
    }
    else {
        response.verified = true;
        response.message = "success"
        return response
    }
}

export const forgetPasswordVerification = (email, password, newPassword) => {
    var response = {
        verified: false,
        message: "KINDLY FILL ALL FIELDS"
    }
    if (!email && !password && !newPassword) {
        return response
    }
    else if (password.length < 8) {
        response.verified = false;
        response.message = "PASSWORD MUST BE 8 CHARACTERS LONG"
        return response;
    }
    else if (!validateEmail(email)) {
        response.verified = false;
        response.message = "EMAIL IS NOT CORRECT"
        return response;
    }
    else if (password === newPassword) {
        response.verified = false;
        response.message = "YOU HAVE USED THIS PASSWORD BEFORE"
        return response;
    }
    else {
        response.verified = true;
        response.message = "success"
        return response
    }
}