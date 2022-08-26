import { data as mockSubredditData } from './mockSubredditData';
import { data as mockPostData } from './mockPostData';

export const fetchSubredditData = endpoint => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.5;
            success ? resolve(mockSubredditData) : reject()
        }, 2000);
    })
}

export const fetchPostData = endpoint => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.5;
            success ? resolve(mockPostData) : reject()
        }, 2000);
    })
}