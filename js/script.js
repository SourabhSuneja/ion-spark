const links = {
     home: null,
     classwork: 'https://sourabhsuneja.github.io/academic-resources/games/crossy-road/?grade=8',
    quiz: 'https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizType=individual&s=&q=kips-8-ch-3%2Bbetween-8-ch-3&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&volume=100&customselect=y&usecards=n&useteam=n&teammap=%7B%7D&absent=%5B%5D&killPrevSession=y&quizID=Class+8+Quiz+Visit+from+Portal'
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
   document.getElementById("overlay").style.display =
      document.getElementById("sidebar").classList.contains("active") ? "block" : "none";
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
  const header = document.getElementById('header');

  if(page !== 'home') {
    contentDiv.innerHTML = '';
    contentDiv.classList.add('externalPage');
    // Hide student profile
    document.getElementById('student-profile').style.display = 'none';
    addIframeToContent(links[page], contentDiv);
  }


}

function logOut() {
   window.showDialog({ title: '', message: 'Are you sure you want to log out?', type: 'confirm' });
}


// dynamically create user profile card
function createUserProfile() {

   // First update the Avatar image in the header (right side)
   document.getElementById('header-avatar').src = user.avatar;
  // Get the parent container where the profile will be appended
  const profileContainer = document.getElementById('student-profile');

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
function addIframeToContent(src, contentDiv) {
 
    
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

    iframe.addEventListener('load', function() {
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

    if(username === '' || password === '') {
        errorField.innerHTML = errorIcon + '<span>Username and password are required.</span>';
        btn.disabled = false;
        btn.innerHTML = 'Sign In';
        return ;       
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
document.getElementById('sign-in-btn').addEventListener('click', function(event) {
    event.preventDefault();
    login();
});

// function to initialize app states
function init() {
   createUserProfile();
   createAndAppendCards();
   createAndAppendMenuItems();
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
                                  signInScreen.style.display = 'block';
             }
          } catch (error) {
             console.error('Auth check error:', error);
          } finally {
              // Hide flash loading screen after 3 seconds
              setTimeout(() => {
  document.getElementById('loading-overlay').style.display = 'none';
}, 3000);
          }
          });

