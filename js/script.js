// =============================================================================
// CONFIGURATION & CONSTANTS
// =============================================================================

const APP_CONFIG = {
   name: 'Ion Spark',
   loadingDelay: 1000,
   iframeTransitionDuration: '2s',
   currentPage: 'home'
};

const STUDENT_DETAILS = {};

const LINKS = {
   home: null,
   "word-of-the-day": null,
   worksheet: 'https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Practice%20Worksheet%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VI%22%7D&qpm=%7B%22avartan-6-ch-1%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-2%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22%22%2C%22%22%2C%22%22%2C%22%22%5D%2C%22qTypes%22%3A%5B%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22space%22%2C%22randomiseSelection%22%3Atrue%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=avartan-6-ch-1%2Bavartan-6-ch-2&diff=easy',
   quiz: 'https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizType=individual&s=&q=kips-8-ch-3%2Bbetween-8-ch-3&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&volume=100&customselect=y&usecards=n&useteam=n&teammap=%7B%7D&absent=%5B%5D&killPrevSession=y&quizID=Class+8+Quiz+Visit+from+Portal'
};

const PAGE_MIN_WIDTH_CONFIG = {
   classwork: 750,
   worksheet: 750
};

const USER_DATA = {
   name: 'Divya Sharma',
   grade: '8',
   accountType: 'Student',
   avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&hairColor=BrownDark&clotheType=BlazerSweater&eyeType=Happy&mouthType=Smile&skinColor=Light&facialHairType=Blank&accessoriesType=Blank'
};

const DASHBOARD_CARDS = [{
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
      page: 'word-of-the-day'
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
   }
];

const MENU_ITEMS = [{
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
   }
];

// =============================================================================
// DOM UTILITIES
// =============================================================================

const DOMUtils = {
   getElementById: (id) => document.getElementById(id),

   createElement: (tag, className = '', textContent = '') => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (textContent) element.textContent = textContent;
      return element;
   },

   createIcon: (iconName) => {
      const icon = document.createElement('ion-icon');
      icon.setAttribute('name', iconName);
      return icon;
   },

   toggleClass: (element, className) => {
      element.classList.toggle(className);
   },

   show: (element) => {
      element.style.display = 'revert';
   },

   hide: (element) => {
      element.style.display = 'none';
   },

   setDisplay: (element, display) => {
      element.style.display = display;
   }
};

// =============================================================================
// UI COMPONENTS
// =============================================================================

const UIComponents = {
   createCard: (cardData) => {
      const cardDiv = DOMUtils.createElement('div', 'card');
      const icon = DOMUtils.createIcon(cardData.icon);
      const title = DOMUtils.createElement('div', 'title', cardData.title);

      cardDiv.appendChild(icon);
      cardDiv.appendChild(title);
      cardDiv.addEventListener('click', () => PageManager.loadPage(cardData.page));

      return cardDiv;
   },

   createMenuItem: (itemData) => {
      const menuItemDiv = DOMUtils.createElement('div', 'menu-item');
      const icon = DOMUtils.createIcon(itemData.icon);
      const titleText = document.createTextNode(itemData.title);

      menuItemDiv.appendChild(icon);
      menuItemDiv.appendChild(titleText);
      menuItemDiv.addEventListener('click', () => PageManager.loadPage(itemData.page));

      return menuItemDiv;
   },

   createUserProfile: () => {
      // Update header avatar
      DOMUtils.getElementById('header-avatar').src = USER_DATA.avatar;

      const profileContainer = DOMUtils.getElementById('student-profile');
      profileContainer.innerHTML = '';

      // Create profile avatar section
      const profileAvatarDiv = DOMUtils.createElement('div', 'profile-avatar');
      const avatarImg = DOMUtils.createElement('img');
      avatarImg.src = USER_DATA.avatar;
      avatarImg.alt = 'Avatar';
      profileAvatarDiv.appendChild(avatarImg);

      // Create profile info section
      const profileInfoDiv = DOMUtils.createElement('div', 'profile-info');
      const nameHeading = DOMUtils.createElement('h2', 'student-name', USER_DATA.name);
      const gradeParagraph = DOMUtils.createElement('p', 'student-grade', `Grade: ${USER_DATA.grade}`);
      const descriptionParagraph = DOMUtils.createElement('p', 'student-description', `${USER_DATA.accountType} Account`);

      profileInfoDiv.append(nameHeading, gradeParagraph, descriptionParagraph);
      profileContainer.append(profileAvatarDiv, profileInfoDiv);
   },

   createIframe: (src, page) => {
      const iframe = DOMUtils.createElement('iframe');

      Object.assign(iframe.style, {
         width: '100%',
         height: '100%',
         border: 'none',
         flex: '1',
         opacity: '0',
         transition: `opacity ${APP_CONFIG.iframeTransitionDuration}`
      });

      if (PAGE_MIN_WIDTH_CONFIG[page]) {
         iframe.style.minWidth = `${PAGE_MIN_WIDTH_CONFIG[page]}px`;
      }

      iframe.src = src;
      iframe.addEventListener('load', function () {
         hideProcessingDialog();
         this.style.opacity = '1';
      });

      return iframe;
   }
};

// =============================================================================
// MENU MANAGEMENT
// =============================================================================

const MenuManager = {
   toggle: () => {
      const sidebar = DOMUtils.getElementById('sidebar');
      const overlay = DOMUtils.getElementById('overlay');

      DOMUtils.toggleClass(sidebar, 'active');
      const isActive = sidebar.classList.contains('active');
      DOMUtils.setDisplay(overlay, isActive ? 'block' : 'none');
   },

   close: () => {
      const sidebar = DOMUtils.getElementById('sidebar');
      const overlay = DOMUtils.getElementById('overlay');

      sidebar.classList.remove('active');
      DOMUtils.hide(overlay);
   },

   initialize: () => {
      const sidebar = DOMUtils.getElementById('sidebar');
      sidebar.innerHTML = '';

      // Add close button
      const closeBtn = DOMUtils.createElement('span', 'close-btn', '×');
      closeBtn.innerHTML = '×'; // Need to set innerHTML for HTML entity
      closeBtn.onclick = MenuManager.toggle;
      sidebar.appendChild(closeBtn);

      // Add menu items
      MENU_ITEMS.forEach(item => {
         sidebar.appendChild(UIComponents.createMenuItem(item));
      });

      // Add logout button
      const logoutBtn = DOMUtils.createElement('button', 'logout-btn', 'Logout');
      logoutBtn.addEventListener('click', AuthManager.logout);
      sidebar.appendChild(logoutBtn);
   }
};

// =============================================================================
// PAGE MANAGEMENT
// =============================================================================

const PageManager = {
   loadPage: (page) => {
      showProcessingDialog();

      // Show a relevant card or do nothing if the page has null link
      if ((!(page in LINKS) || LINKS[page] === null) && page !== 'home') {
         if(page === 'word-of-the-day') {
             showRandomWord();
         }
         hideProcessingDialog();
         return;
      }

      APP_CONFIG.currentPage = page;

      const elements = {
         content: DOMUtils.getElementById('content'),
         screenName: DOMUtils.getElementById('screen-name'),
         studentProfile: DOMUtils.getElementById('student-profile'),
         menuBtn: DOMUtils.getElementById('menu-btn'),
         backBtn: DOMUtils.getElementById('back-btn')
      };

      elements.content.innerHTML = '';

      if (page !== 'home') {
         PageManager.loadExternalPage(page, elements);
      } else {
         PageManager.loadHomePage(elements);
      }
   },

   loadExternalPage: (page, elements) => {

      elements.content.classList.add('externalPage');

      // Find the card object with matching page property
      const cardData = DASHBOARD_CARDS.find(card => card.page === page);
      const displayTitle = cardData ? cardData.title : StringUtils.capitalizeFirstLetter(page);

      elements.screenName.innerText = `${displayTitle} `;

      DOMUtils.hide(elements.studentProfile);
      DOMUtils.hide(elements.menuBtn);
      DOMUtils.show(elements.backBtn);

      const iframe = UIComponents.createIframe(LINKS[page], page);
      elements.content.appendChild(iframe);
   },

   loadHomePage: (elements) => {
      DOMUtils.show(elements.menuBtn);
      DOMUtils.hide(elements.backBtn);
      DOMUtils.setDisplay(elements.studentProfile, 'flex');

      elements.screenName.innerText = `${APP_CONFIG.name} `;
      elements.content.classList.remove('externalPage');

      AppManager.initialize();
      hideProcessingDialog();
   }
};

// =============================================================================
// AUTHENTICATION MANAGEMENT
// =============================================================================

const AuthManager = {
   login: async () => {
      const elements = {
         signInScreen: DOMUtils.getElementById('sign-in-screen'),
         errorField: DOMUtils.getElementById('error-message'),
         btn: DOMUtils.getElementById('sign-in-btn'),
         username: DOMUtils.getElementById('username'),
         password: DOMUtils.getElementById('password')
      };

      const username = elements.username.value.trim();
      const password = elements.password.value;
      const errorIcon = '<ion-icon name="alert-circle-outline" class="sign-in-error-icon"></ion-icon>';

      AuthManager.setLoadingState(elements.btn, elements.errorField, true);

      if (!username || !password) {
         AuthManager.showError(elements, errorIcon, 'Username and password are required.');
         return;
      }

      try {
         const email = `${username}@ionspark.com`.toLowerCase();
         const data = await window.signInUser(email, password);
         window.userId = data.user.id;

         DOMUtils.hide(elements.signInScreen);
         AppManager.initialize();
      } catch (error) {
         AuthManager.showError(elements, errorIcon, error.message);
      }
   },

   logout: async () => {
      const confirmLogout = await window.showDialog({
         title: 'Confirm Logout',
         message: 'Are you sure you want to log out?',
         type: 'confirm'
      });

      if (!confirmLogout) return;

      const loadingOverlay = DOMUtils.getElementById('loading-overlay');
      DOMUtils.setDisplay(loadingOverlay, 'flex');

      MenuManager.close();
      await signOutUser();

      AuthManager.clearUserSession();
      AuthManager.showSignInScreen();

      DOMUtils.hide(loadingOverlay);
   },

   setLoadingState: (btn, errorField, isLoading) => {
      if (isLoading) {
         btn.innerHTML = '<i class="fas white fa-spinner fa-spin"></i> Wait...';
         btn.disabled = true;
         errorField.innerHTML = '';
      } else {
         btn.innerHTML = 'Sign In';
         btn.disabled = false;
      }
   },

   showError: (elements, errorIcon, message) => {
      elements.errorField.innerHTML = `${errorIcon}<span>${message}</span>`;
      AuthManager.setLoadingState(elements.btn, elements.errorField, false);
   },

   clearUserSession: () => {
      const elements = {
         headerAvatar: DOMUtils.getElementById('header-avatar'),
         studentProfile: DOMUtils.getElementById('student-profile'),
         content: DOMUtils.getElementById('content'),
         sidebar: DOMUtils.getElementById('sidebar'),
         username: DOMUtils.getElementById('username'),
         password: DOMUtils.getElementById('password')
      };

      elements.headerAvatar.src = '';
      elements.studentProfile.innerHTML = '';
      elements.content.innerHTML = '';
      elements.sidebar.innerHTML = '';
      elements.username.value = '';
      elements.password.value = '';
   },

   showSignInScreen: () => {
      const signInScreen = DOMUtils.getElementById('sign-in-screen');
      const btn = DOMUtils.getElementById('sign-in-btn');

      btn.innerHTML = 'Sign In';
      btn.disabled = false;

      DOMUtils.setDisplay(signInScreen, 'flex');
   },

   checkAuthenticationStatus: async () => {
      const signInScreen = DOMUtils.getElementById('sign-in-screen');

      try {
         const isAuthenticated = await checkAuth();

         if (isAuthenticated) {
            DOMUtils.hide(signInScreen);
            AppManager.initialize();
         } else {
            DOMUtils.setDisplay(signInScreen, 'flex');
         }
      } catch (error) {
         console.error('Auth check error:', error);
      } finally {
         setTimeout(() => {
            DOMUtils.hide(DOMUtils.getElementById('loading-overlay'));
         }, APP_CONFIG.loadingDelay);
      }
   }
};

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

const ThemeManager = {
  toggle: () => {
    const body = document.body;
    const metaThemeColor = document.querySelector("meta[name=theme-color]");

    // Toggle the theme class
    body.classList.toggle("light-theme");

    // If body has light-theme → set status bar to white
    if (body.classList.contains("light-theme")) {
      metaThemeColor.setAttribute("content", "#ffffff"); // light mode
    } else {
      metaThemeColor.setAttribute("content", "#000000"); // dark mode
    }
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const StringUtils = {
   capitalizeFirstLetter: (str) => {
      if (!str || str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
   }
};

// =============================================================================
// APP MANAGEMENT
// =============================================================================

const AppManager = {
   initialize: () => {
      UIComponents.createUserProfile();
      AppManager.renderDashboardCards();
      MenuManager.initialize();
   },

   renderDashboardCards: () => {
      const content = DOMUtils.getElementById('content');
      content.innerHTML = '';

      DASHBOARD_CARDS.forEach(card => {
         content.appendChild(UIComponents.createCard(card));
      });
   }
};

// =============================================================================
// GLOBAL FUNCTIONS (for backward compatibility)
// =============================================================================

// These functions maintain the original API for external calls
function toggleMenu() {
   MenuManager.toggle();
}

function toggleTheme() {
   ThemeManager.toggle();
}

function loadPage(page) {
   PageManager.loadPage(page);
}

async function logOut() {
   await AuthManager.logout();
}

async function login() {
   await AuthManager.login();
}

function init() {
   AppManager.initialize();
}

function capitalizeFirstLetter(str) {
   return StringUtils.capitalizeFirstLetter(str);
}

function createUserProfile() {
   UIComponents.createUserProfile();
}

function createAndAppendCards() {
   AppManager.renderDashboardCards();
}

function createAndAppendMenuItems() {
   MenuManager.initialize();
}

function addIframeToContent(src, contentDiv, page) {
   const iframe = UIComponents.createIframe(src, page);
   contentDiv.appendChild(iframe);
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

// Sign in button event listener
document.getElementById('sign-in-btn').addEventListener('click', (event) => {
   event.preventDefault();
   AuthManager.login();
});

// Window load event listener
window.addEventListener('load', () => {
   AuthManager.checkAuthenticationStatus();
});

// Simulate back button when user clicks on the custom back button
document.getElementById('back-btn').addEventListener('click', () => {
   window.history.back(); // This will trigger popstate handler
});


// =============================================================================
// BROWSER BACK BUTTON HANDLING
// =============================================================================

// Push an initial state so back button events can be detected
window.history.replaceState({
   page: APP_CONFIG.currentPage
}, "");

// Whenever a new page is loaded, push it to the history
const originalLoadPage = PageManager.loadPage;
PageManager.loadPage = (page) => {
   originalLoadPage(page);

   // If the page does not have an external link, do not push it to the history
    if (!(page in LINKS) || LINKS[page] === null) {
       return;
}

   // Push state only if not already on this page
   if (window.history.state?.page !== page) {
      window.history.pushState({
         page
      }, "");
   }
};

// Handle back/forward navigation
window.addEventListener("popstate", (event) => {
   const statePage = event.state?.page;

   if (!statePage || statePage === "home") {
      // Always go to home if back is pressed from any other page
      PageManager.loadPage("home");
   } else {
      PageManager.loadPage(statePage);
   }
});
