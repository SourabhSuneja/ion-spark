const links = {
   home: null,
   classwork: 'https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Term-1%20Book%20Work%20%2B%20Notebook%20Work%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VI%22%7D&qpm=%7B%22avartan-6-ch-1%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-2%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-3%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-5%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-8%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22Ch-1%20MCQs%22%2C%22Ch-1%20Fill%20ups%22%2C%22Ch-1%20True%2FFalse%22%2C%22Ch-1%20QAs%22%2C%22Ch-2%20MCQs%22%2C%22Ch-2%20Fill%20ups%22%2C%22Ch-2%20True%2FFalse%22%2C%22Ch-2%20QAs%22%2C%22Ch-3%20MCQs%22%2C%22Ch-3%20Fill%20ups%22%2C%22Ch-3%20True%2FFalse%22%2C%22Ch-3%20QAs%22%2C%22Ch-5%20MCQs%22%2C%22Ch-5%20Fill%20ups%22%2C%22Ch-5%20True%2FFalse%22%2C%22Ch-5%20QAs%22%2C%22Ch-8%20MCQs%22%2C%22Ch-8%20Fill%20ups%22%2C%22Ch-8%20True%2FFalse%22%2C%22Ch-8%20QAs%22%5D%2C%22qTypes%22%3A%5B%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%2C%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22ans%22%2C%22randomiseSelection%22%3Afalse%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=avartan-6-ch-1%2Bavartan-6-ch-2%2Bavartan-6-ch-3%2Bavartan-6-ch-5%2Bavartan-6-ch-8&diff=easy',
   quiz: 'https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizType=individual&s=&q=kips-8-ch-3%2Bbetween-8-ch-3&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&volume=100&customselect=y&usecards=n&useteam=n&teammap=%7B%7D&absent=%5B%5D&killPrevSession=y&quizID=Class+8+Quiz+Visit+from+Portal'
};

const pageMinWidthConfig = {
   classwork: 750
};

const user = {
   'name': 'Divya Sharma',
   'grade': '8',
   'accountType': 'Student',
   'avatar': 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&hairColor=BrownDark&clotheType=BlazerSweater&eyeType=Happy&mouthType=Smile&skinColor=Light&facialHairType=Blank&accessoriesType=Blank'
};
const cards = [{
      icon: 'podium-outline',
      title: 'My Result',
      page: 'myresult'
   },
   {
      icon: 'book-outline',
      title: 'Classwork',
      page: 'classwork'
   },
   {
      icon: 'document-outline',
      title: 'Worksheet',
      page: 'worksheet'
   },
   {
      icon: 'clipboard-outline',
      title: 'PT-3 Blueprint',
      page: 'pt3blueprint'
   },
   {
      icon: 'bulb-outline',
      title: 'Knowledge Dose',
      page: 'knowledgedose'
   },
   {
      icon: 'help-outline',
      title: 'Quiz',
      page: 'quiz'
   },
   {
      icon: 'language',
      title: 'Word of the Day',
      page: 'word'
   },
   {
      icon: 'trophy-outline',
      title: 'Our Champions',
      page: 'stars'
   },
   {
      icon: 'chatbubble-outline',
      title: 'Sarthak AI',
      page: 'sarthak'
   },
   {
      icon: 'color-wand-outline',
      title: 'Chatbot Creator',
      page: 'chatbotcreator'
   },
   {
      icon: 'ribbon-outline',
      title: 'Favourite Student Certificate',
      page: 'feedback'
   },
];

const menuItems = [{
      icon: 'home',
      title: 'Dashboard',
      page: 'dashboard'
   },
   {
      icon: 'game-controller',
      title: 'Games',
      page: 'games'
   },
   {
      icon: 'notifications',
      title: 'Notifications',
      page: 'notifications'
   },
   {
      icon: 'settings',
      title: 'Settings',
      page: 'settings'
   },
];

// Toggle the sidebar menu and overlay
function toggleMenu() {
   document.getElementById("sidebar").classList.toggle("active");
   document.getElementById("overlay").style.display = document.getElementById("sidebar").classList.contains("active") ? "block" : "none";
}

// Toggle between dark and light themes
function toggleTheme() {
   document.body.classList.toggle("light-theme");
}


function loadPage(page) {
   // Show loading overlay
   showProcessingDialog();
   // Fetch elements to be manipulated
   const contentDiv = document.getElementById('content');
   const screenName = document.getElementById('screen-name');
   const header = document.getElementById('header');
   // Clear contentDiv
   contentDiv.innerHTML = '';

   if (page !== 'home') {
      contentDiv.classList.add('externalPage');
      // Set new screen name
      screenName.innerText = capitalizeFirstLetter(page) + ' ';
      // Hide student profile
      document.getElementById('student-profile').style.display = 'none';
      // Hide menu btn and show back button
      document.getElementById("menu-btn").style.display = 'none';
      document.getElementById("back-btn").style.display = 'revert';
      addIframeToContent(links[page], contentDiv, page);
   } else {
      // Hide back btn and show menu button
      document.getElementById("menu-btn").style.display = 'revert';
      document.getElementById("back-btn").style.display = 'none';
      // Set screen name back to app name
      screenName.innerText = 'Ion Spark ';
      // Remove externalPage class from contentDiv
      contentDiv.classList.remove('externalPage');
      // Re-initialize home screen elements
      init();
      // Hide loading animation
      hideProcessingDialog();
   }
}

async function logOut() {
   const signInScreen = document.getElementById('sign-in-screen');
   const confirmLogout = await window.showDialog({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      type: 'confirm'
   });
   if (confirmLogout) {
      // Show loading overlay
      document.getElementById('loading-overlay').style.display = 'flex';
      // Close side menu
      toggleMenu();
      // Log user out
      await signOutUser();
      // Remove the Avatar image in the header (right side)
      document.getElementById('header-avatar').src = '';
      // Clear the parent container where the profile was appended
      document.getElementById('student-profile').innerHTML = '';
      // Clear the app content (all cards)
      document.getElementById('content').innerHTML = '';
      // Clear the app sidebar (menu)
      document.getElementById('sidebar').innerHTML = '';
      // Reset the sign in button
      const btn = document.getElementById('sign-in-btn');
      btn.innerHTML = 'Sign In';
      btn.disabled = false;
      // Reset the username and password fields
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      // Show sign in screen again
      signInScreen.style.display = 'flex';
      // Hide loading overlay
      document.getElementById('loading-overlay').style.display = 'none';
   }
}


// dynamically create user profile card
function createUserProfile() {

   // First update the Avatar image in the header (right side)
   document.getElementById('header-avatar').src = user.avatar;
   // Get the parent container where the profile will be appended
   const profileContainer = document.getElementById('student-profile');
   // Clear the profile container to remove previous content
   profileContainer.innerHTML = '';

   // Create the profile avatar section
   const profileAvatarDiv = document.createElement('div');
   profileAvatarDiv.classList.add('profile-avatar');

   const avatarImg = document.createElement('img');
   avatarImg.src = user.avatar;
   avatarImg.alt = 'Avatar';

   profileAvatarDiv.appendChild(avatarImg);

   // Create the profile info section
   const profileInfoDiv = document.createElement('div');
   profileInfoDiv.classList.add('profile-info');

   const nameHeading = document.createElement('h2');
   nameHeading.classList.add('student-name');
   nameHeading.textContent = user.name;

   const gradeParagraph = document.createElement('p');
   gradeParagraph.classList.add('student-grade');
   gradeParagraph.textContent = `Grade: ${user.grade}`;

   const descriptionParagraph = document.createElement('p');
   descriptionParagraph.classList.add('student-description');
   descriptionParagraph.textContent = `${user.accountType} Account`;

   profileInfoDiv.appendChild(nameHeading);
   profileInfoDiv.appendChild(gradeParagraph);
   profileInfoDiv.appendChild(descriptionParagraph);

   // Append both profile sections to the container
   profileContainer.appendChild(profileAvatarDiv);
   profileContainer.appendChild(profileInfoDiv);
}

// dynamically create and append cards to the app screen
function createAndAppendCards() {
   const content = document.getElementById('content');

   // Clear previous content
   content.innerHTML = '';

   cards.forEach(card => {
      // Create the main card div
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      // Create the ion icon element
      const iconElement = document.createElement('ion-icon');
      iconElement.setAttribute('name', card.icon);

      // Create the title div
      const titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.textContent = card.title;

      // Append icon and title to the card
      cardDiv.appendChild(iconElement);
      cardDiv.appendChild(titleDiv);

      // Add click event listener to load the page
      cardDiv.addEventListener('click', () => loadPage(card.page));

      // Append the card to the content container
      content.appendChild(cardDiv);
   });
}


// dynamically create and append menu items to the app side navigation
function createAndAppendMenuItems() {
   const sidebar = document.getElementById('sidebar');

   // Clear all previous content
   sidebar.innerHTML = '';
   
   // Create the span element for close button on sidebar
   const span = document.createElement("span");
   // Add the class "close-btn"
   span.className = "close-btn";
   // Set the inner HTML to × (times symbol)
   span.innerHTML = "&times;";
   // Set the onclick handler to call toggleMenu()
   span.onclick = toggleMenu;
   // Append the element to sidebar
   sidebar.appendChild(span);

   // Create and append menu items
   menuItems.forEach(item => {
      // Create the main menu item div
      const menuItemDiv = document.createElement('div');
      menuItemDiv.className = 'menu-item';

      // Create the ion icon element
      const iconElement = document.createElement('ion-icon');
      iconElement.setAttribute('name', item.icon);

      // Create the text node for the title
      const titleText = document.createTextNode(item.title);

      // Append icon and title to the menu item
      menuItemDiv.appendChild(iconElement);
      menuItemDiv.appendChild(titleText);

      // Add click event listener to load the page
      menuItemDiv.addEventListener('click', () => loadPage(item.page));

      // Append the menu item to the sidebar
      sidebar.appendChild(menuItemDiv);
   });

   // Create a logout button
   const logoutBtn = document.createElement('button');
   logoutBtn.textContent = 'Logout';
   logoutBtn.className = 'logout-btn';
   logoutBtn.addEventListener('click', logOut);
   sidebar.appendChild(logoutBtn);
}


// Function to fetch a page and show it as an iframe inside the content div
function addIframeToContent(src, contentDiv, page) {


   // Create a new iframe element
   const iframe = document.createElement('iframe');

   // Set the iframe's source
   iframe.src = src;

   // Style the iframe to fully fit and cover the content div
   iframe.style.width = '100%';
   iframe.style.height = '100%';
   iframe.style.border = 'none';
   iframe.style.flex = '1'; // Ensures it behaves as a flex item if needed
   iframe.style.opacity = '0';
   iframe.style.transition = 'opacity 2s';

   // Set min width for the iframe if available in the config
   if (pageMinWidthConfig[page]) {
      const minWidth = pageMinWidthConfig[page];
      iframe.style.minWidth = minWidth + 'px';
   }

   iframe.addEventListener('load', function () {
      hideProcessingDialog();
      this.style.opacity = '1';
   });

   // Append the iframe to the content div
   contentDiv.appendChild(iframe);
}


// function to login user
async function login() {
   const signInScreen = document.getElementById('sign-in-screen');
   const errorField = document.getElementById('error-message');
   const btn = document.getElementById('sign-in-btn');
   const username = document.getElementById('username').value.trim();
   const password = document.getElementById('password').value;

   const errorIcon = '<ion-icon name="alert-circle-outline" class="sign-in-error-icon"></ion-icon>';

   const email = (username + '@jvp.com').toLowerCase();

   btn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
   btn.disabled = true;
   errorField.innerHTML = '';

   if (username === '' || password === '') {
      errorField.innerHTML = errorIcon + '<span>Username and password are required.</span>';
      btn.disabled = false;
      btn.innerHTML = 'Sign In';
      return;
   }


   try {
      const data = await window.signInUser(email, password);
      window.userId = data.user.id;
      signInScreen.style.display = 'none';
      init();
   } catch (error) {
      errorField.innerHTML = errorIcon + '<span>' + error.message + '</span>';
      btn.disabled = false;
      btn.innerHTML = 'Sign In';
   }

}


// add event listener to sign in button
document.getElementById('sign-in-btn').addEventListener('click', function (event) {
   event.preventDefault();
   login();
});

// function to initialize app states
function init() {
   createUserProfile();
   createAndAppendCards();
   createAndAppendMenuItems();
}

// function to capitalize just the first letter of string
function capitalizeFirstLetter(str) {
  if (str.length === 0) return str; // Handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Check authentication status when the window loads
window.addEventListener('load', async () => {

   const signInScreen = document.getElementById('sign-in-screen');

   try {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
         // Hide signInScreen
         signInScreen.style.display = 'none';
         // Initialise app state
         init();
      } else {
         // User is not logged in, show signInScreen
         signInScreen.style.display = 'flex';
      }
   } catch (error) {
      console.error('Auth check error:', error);
   } finally {
      // Hide flash loading screen after 2 seconds
      setTimeout(() => {
         document.getElementById('loading-overlay').style.display = 'none';
      }, 1000);
   }
});
