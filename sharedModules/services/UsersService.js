function isUserValid(user) {
    "use strict";
    if (!user.trigram) {
        return false
    }
    if (!user.email) {
        return false
    }
    if (!user.firstName) {
        return false
    }
    if (!user.lastName) {
        return false
    }
    if (!user.password) {
        return false
    }
    return true;
}

export {
    isUserValid
}
