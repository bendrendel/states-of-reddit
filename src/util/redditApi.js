export const fetchSubredditData =  endpoint => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.5;
            success ? resolve(endpoint) : reject()
        }, 2000);
    })
}

export const fetchPostData = endpoint => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.5;
            success ? resolve(endpoint) : reject()
        }, 2000);
    })
}