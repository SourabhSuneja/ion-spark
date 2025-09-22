// Push Notification Functionality

// This utility function is required by the Push API
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Function to initialize push notifications
async function initializePushNotifications(studentId) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push messaging is not supported');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready;
        let subscription = await registration.pushManager.getSubscription();

        if (subscription === null) {
            console.log('User is not subscribed. Requesting permission...');
            const permission = await Notification.requestPermission();

            if (permission !== 'granted') {
                console.log('Permission not granted for Notification');
                return;
            }

            // VAPID Public Key
            const VAPID_PUBLIC_KEY = 'BPvblgABlUE65S4s3LylAy4MMbcVl4Kwv0_N0XK2uquDqgLLHwlyxEUu-pEutatYgSb5ZohVw5pq9HiyJ41L-wM'; 

            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });

            console.log('User subscribed:', subscription);

            // Send the new subscription to your Supabase backend
            const result = await insertData('push_subscriptions', { 
                    student_id: studentId, 
                    subscription_object: subscription 
                });

            if (result) {
                console.log('Subscription saved successfully.');
            } else {
                console.error('Error saving subscription:', error);
            }
        } else {
            console.log('User is already subscribed.');
        }
    } catch (error) {
        console.error('Error during push notification initialization:', error);
    }
}


// initializePushNotifications(window.userId);