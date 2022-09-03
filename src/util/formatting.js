import { DateTime } from 'luxon';

export const timeSince = (utcTime) => {
    const sinceTime = DateTime.fromSeconds(utcTime);
    const currentTime = DateTime.utc();
    
    const elapsedTime = currentTime
        .diff(sinceTime, ['years', 'months', 'days', 'hours', 'minutes'])
        .toObject();
    
    switch (true) {
        case elapsedTime.years >= 2:
            return `${Math.floor(elapsedTime.years)} years ago`;
        case elapsedTime.years >= 1:
            return 'a year ago';
        case elapsedTime.months >= 2:
            return `${Math.floor(elapsedTime.months)} months ago`;
        case elapsedTime.months >= 1:
            return 'a month ago';
        case elapsedTime.days >= 2:
            return `${Math.floor(elapsedTime.days)} days ago`;
        case elapsedTime.days >= 1:
            return 'a day ago';
        case elapsedTime.hours >= 2:
            return `${Math.floor(elapsedTime.hours)} hours ago`;
        case elapsedTime.hours >= 1:
            return 'an hour ago';
        case elapsedTime.minutes >= 2:
            return `${Math.floor(elapsedTime.minutes)} minutes ago`;
        case elapsedTime.minutes >= 1:
            return 'a minute ago';
        default:
            return 'just now';
    }
};

export const kmbt = (number) => {
    switch (true) {
        case number >= 10 ** 12:
            return `${(number / 10 ** 12).toFixed(1).replace(/\.0$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}T`;
        case number >= 10 ** 9:
            return `${(number / 10 ** 9).toFixed(1).replace(/\.0$/, '')}B`;
        case number >= 10 ** 6:
            return `${(number / 10 ** 6).toFixed(1).replace(/\.0$/, '')}M`;
        case number >= 10 ** 3:
            return `${(number / 10 ** 3).toFixed(1).replace(/\.0$/, '')}K`;
        default:
            return `${number.toFixed(1).replace(/\.0$/, '')}`;        
    }
}

export const percent = (decimal) => {
    return `${(decimal * 100).toFixed(0)}%`;
}