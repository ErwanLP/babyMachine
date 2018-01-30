module.exports.getRightListByRole = function (role) {
    return new Promise(function (resolve, reject) {
        let rightList;
        switch (role) {
            case 'ADMIN':
                rightList = [
                    'GET_USERS',
                    'GET_USER',
                ];
                break;
            case 'USER':
                rightList = [
                    'GET_USERS',
                    'GET_USER',
                    'SET_SCORE',
                ];
                 break;
            default :
                rightList = []
        }

        resolve(rightList);
    });
};

module.exports.hasRoleRight = function (role, right) {
    if (!role || !right) {
        return Promise.reject('missing role or right');
    }
    return this.getRightListByRole(role).then(rightList => {
        if (rightList.indexOf(right) !== -1) {
                // OK
        } else {
            throw '403'
        }
    })
};

