function rejectedPromise(status, err = 'error') {
    return new Promise(function (resolve,reject) {
        reject({
            status : status,
            message : err
        });
    })
}

export {
    rejectedPromise
}