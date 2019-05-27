var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dspi3tWZmgk:APA91bGvNTJZEOU_f2eMvE33PCvOg5fuoV1zZchPBOI7S0W6LVz0WKAxkTXoeLPT-CWhDFC-i7QDwQHHWQIhmqr96OP8TnrlRV5zrrPmjvEQYwFOUk24LS-9DFPBcqaVK5pl1BI9ysJL",
    "keys": {
        "p256dh": "BGqCzU2+MpQS8AYx1FzT9gb4S4jOHm2YuxLmqAXN1O0WwJ0jDe3uVTNay2tdv+DVG2KyhA0HRaiTTXTw1EDWdXk=", 
        "auth": "D9r/qPANcJcM5ix58F35QA=="
    }
};
var payload = 'Ini adalah percobaan.\nOkelah!!';
var options = {
    gcmAPIKey: 'AAAAUZ8U_ME:APA91bHZfJWjz-dXYsCVMshCLOUWYlGkuO5MzBs5a85K-IuwtDo_lxYn8t0pauR3sVJqar-co-MyLllJKyv9Eepg-BPag8bxMPs_MtNL6lpvJ-orJs0WCF0Kbxpzo4LOnUv30n0ZXd7I',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);