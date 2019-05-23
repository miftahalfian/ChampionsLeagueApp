var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/elq0x_xz0V8:APA91bEu5trU2jChW8-Z2yOQWEVyLr26qOftc-CwNUvy1iO5Atd-OTsRcsK0v1Nr3FCZ4U4ke1g6dc6ZiplJNRhAq827X9rJ_N6BmSThkd0xSEeIhqQPmh68fVjZ5CdiE81w-DtbmuhE",
    "keys": {
        "p256dh": "BFZnokwjwUEvZjkjnFdMjev8lnEOaMNh3p53e2j1aso2MF1USptHVKolf3BXG63qvz7tWtSw2FLl2ZCmCNSWX0M=", 
        "auth": "1Cugnkoy1lUb9MLan15U8Q=="
    }
};
var payload = 'Jancok Awakmu!';
var options = {
    gcmAPIKey: 'AAAAUZ8U_ME:APA91bHZfJWjz-dXYsCVMshCLOUWYlGkuO5MzBs5a85K-IuwtDo_lxYn8t0pauR3sVJqar-co-MyLllJKyv9Eepg-BPag8bxMPs_MtNL6lpvJ-orJs0WCF0Kbxpzo4LOnUv30n0ZXd7I',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);