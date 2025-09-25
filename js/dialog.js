const loadingPhrases = [
    "Gearing up the magic...",
    "Setting things in motion...",
    "Almost there, hang tight!",
    "Preparing awesomeness...",
    "Fueling up the engine...",
    "Just a moment...",
    "Gathering stardust...",
    "Almost ready to go!",
    "Hold on... we’re working wonders!",
    "Piecing it all together...",
    "Bringing ideas to life...",
    "Igniting creativity...",
    "Sparking creativity...",
    "Waking up the page...",
    "Hold tight, it’s worth the wait!",
    "Charging up the experience...",
    "Loading wonders...",
    "Your experience is brewing...",
    "Optimizing pixels for you...",
    "Painting the digital canvas...",
    "Polishing things up for you...",
    "Stirring imagination soup...",
    "Aligning the stars...",
    "Weaving some digital magic...",
    "Cooking up something fun...",
    "Brewing ideas into reality...",
    "Stretching the possibilities...",
    "Tuning the final notes...",
    "Almost unwrapping the surprise..."
];

// Function to select a random phrase
function getRandomLoadingPhrase() {
    const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
    return loadingPhrases[randomIndex];
}


    // Attach showDialog function to the global window object
    window.showDialog = function ({ title, message, type }) {
        return new Promise((resolve) => {
            // Access the elements
            const overlay = document.getElementById('dialog-overlay');
            const dialogBox = document.getElementById('dialog-box');
            const dialogHeader = document.getElementById('dialog-header');
            const dialogMessage = document.getElementById('dialog-message');
            const dialogButtons = document.getElementById('dialog-buttons');
            
            // Clear existing buttons and message
            dialogButtons.innerHTML = '';
            dialogMessage.innerHTML = '';

            // remove processing specific classes
            dialogBox.classList.remove('dialog-minimal-padding');

            // Set the content
            dialogHeader.textContent = title;

            if (type === 'confirm') {
                dialogMessage.textContent = message;

                const yesButton = document.createElement('button');
                yesButton.textContent = 'Yes';
                yesButton.classList.add('dialog-button', 'button-yes');
                yesButton.onclick = () => {
                    closeDialog();
                    resolve(true);
                };

                const noButton = document.createElement('button');
                noButton.textContent = 'No';
                noButton.classList.add('dialog-button', 'button-no');
                noButton.onclick = () => {
                    closeDialog();
                    resolve(false);
                };

                dialogButtons.appendChild(yesButton);
                dialogButtons.appendChild(noButton);
            } else if (type === 'alert') {
                dialogMessage.textContent = message;

                const okButton = document.createElement('button');
                okButton.textContent = 'Ok';
                okButton.classList.add('dialog-button', 'button-ok');
                okButton.onclick = () => {
                    closeDialog();
                    resolve(true);
                };

                dialogButtons.appendChild(okButton);
            } else if (type === 'processing') {
                dialogBox.classList.add('dialog-minimal-padding');
                dialogMessage.classList.add('dialog-processing');
                dialogMessage.innerHTML = `<img src="./images/loading.gif" style="height: 30px"> ${getRandomLoadingPhrase()}`;
            }

            // Show the dialog
            overlay.classList.add('show');

            // Function to close the dialog
            function closeDialog() {
                overlay.classList.remove('show');
                dialogMessage.classList.remove('dialog-processing');
            }
        });
    };

    // Attach showProcessingDialog and hideProcessingDialog functions to the global window object
    window.showProcessingDialog = function () {
        window.showDialog({ title: '', type: 'processing' });
    };

    window.hideProcessingDialog = function () {
        document.getElementById('dialog-overlay').classList.remove('show');
    };
