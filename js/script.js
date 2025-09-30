// =============================================================================
// CONFIGURATION & CONSTANTS
// =============================================================================

const APP_CONFIG = {
   name: 'Ion Spark',
   loadingDelay: 1000,
   iframeTransitionDuration: '2s',
   currentPage: 'home',
   theme: 'dark'
};

const LINKS = {
   home: null,
   "word-of-the-day": null,
   result: 'https://sourabhsuneja.github.io/ion-spark/pages/result/',
   sarthak: 'https://sourabhsuneja.github.io/ion-spark/pages/sarthak/',
   worksheet: 'https://sourabhsuneja.github.io/question-paper/?ed=%7B%22schoolName%22%3A%22Jamna%20Vidyapeeth%22%2C%22examName%22%3A%22Practice%20Worksheet%22%2C%22subject%22%3A%22Computer%22%2C%22duration%22%3A60%2C%22grade%22%3A%22VI%22%7D&qpm=%7B%22avartan-6-ch-1%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%2C%22avartan-6-ch-2%22%3A%7B%22MCQ%22%3A5%2C%22Fill%20up%22%3A5%2C%22True%2FFalse%22%3A5%2C%22Short%20Answer%20Type%22%3A5%2C%22Match%20items%22%3A0%2C%22image%22%3Afalse%2C%22audio%22%3Afalse%2C%22video%22%3Afalse%7D%7D&qc=%7B%22headings%22%3A%5B%22%22%2C%22%22%2C%22%22%2C%22%22%5D%2C%22qTypes%22%3A%5B%7B%22MCQ%22%3A5%7D%2C%7B%22Fill%20up%22%3A5%7D%2C%7B%22True%2FFalse%22%3A5%7D%2C%7B%22Short%20Answer%20Type%22%3A5%7D%5D%2C%22weightPerQ%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22mustInclude%22%3A%5B%7B%7D%2C%7B%7D%2C%7B%7D%2C%7B%7D%5D%2C%22settings%22%3A%7B%22provideAnsOrSpace%22%3A%22space%22%2C%22randomiseSelection%22%3Atrue%2C%22strictChapterWiseDistribution%22%3Afalse%2C%22editable%22%3Afalse%2C%22showAIBtns%22%3Afalse%2C%22hideWeightage%22%3Atrue%2C%22showStudentDetails%22%3Afalse%2C%22border%22%3Afalse%2C%22shuffleMCQOptions%22%3Afalse%2C%22useDotPatternInBlanks%22%3Atrue%2C%22showHelpBoxInFillUp%22%3Afalse%2C%22mergeMatchItems%22%3Atrue%2C%22convertQForm%22%3A%7B%22MCQ%22%3A%7B%22toFillUp%22%3A0%2C%22toTF%22%3A0%2C%22toVSA%22%3A0%7D%2C%22flipTF%22%3Afalse%7D%2C%22spaceForAns%22%3A%7B%22Very%20Short%20Answer%20Type%22%3A1%2C%22Short%20Answer%20Type%22%3A3%2C%22Long%20Answer%20Type%22%3A5%2C%22Very%20Long%20Answer%20Type%22%3A8%2C%22Diagram%2FPicture%2FMap%20Based%22%3A6%7D%2C%22qTypesAllowedInImageQ%22%3A%5B%22Short%20Answer%20Type%22%2C%22Long%20Answer%20Type%22%2C%22Very%20Long%20Answer%20Type%22%2C%22Diagram%2FPicture%2FMap%20Based%22%5D%7D%7D&files=avartan-6-ch-1%2Bavartan-6-ch-2&diff=easy',
   quiz: 'https://sourabhsuneja.github.io/quiz/play/?title=Data+Science+Quiz&quizType=individual&s=&q=kips-8-ch-3%2Bbetween-8-ch-3&allowMCQ=y&allowTF=y&m=random&shuffle=n&qshuffle=y&qproceed=click&maxchances=3&countdown=0&volume=100&customselect=y&usecards=n&useteam=n&teammap=%7B%7D&absent=%5B%5D&killPrevSession=y&quizID=Class+8+Quiz+Visit+from+Portal'
};

const PAGE_MIN_WIDTH_CONFIG = {
   classwork: 750,
   worksheet: 750
};

const USER_DATA = {
   name: '',
   grade: '',
   section: '',
   accountType: 'Student',
   avatar: ''
};

// MODIFIED: Replaced DASHBOARD_CARDS with a subject-based object structure.
const subjectCardsTemplate = [
   {
      icon: 'podium-outline',
      title: 'My Result',
      page: 'result'
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

const SUBJECT_DASHBOARDS = {
   'Computer': JSON.parse(JSON.stringify(subjectCardsTemplate)),
   'Science': JSON.parse(JSON.stringify(subjectCardsTemplate)),
   'Mathematics': JSON.parse(JSON.stringify(subjectCardsTemplate))
};

// NEW: Variable to track the currently selected subject.
let currentSubject = 'Computer';

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
// BACKEND MANAGEMENT
// =============================================================================

const BackendManager = {
   getStudentProfile: async (student_id) => {
      try {
         const student = await invokeFunction('get_student_profile', {
            p_student_id: student_id
         }, true);
         return student;
      } catch (err) {
         console.error("Error fetching student profile:", err);
         return null;
      }
   }
};

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
      if (element) element.style.display = 'revert';
   },

   hide: (element) => {
      if (element) element.style.display = 'none';
   },

   setDisplay: (element, display) => {
      if (element) element.style.display = display;
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

   createUserProfile: async () => {
      // Fetch student profile from backend
      const profile = await BackendManager.getStudentProfile(window.userId);

      if (profile && typeof profile === 'object') {
         // Copy all keys from backend response into USER_DATA
         Object.keys(profile).forEach(key => {
            USER_DATA[key] = profile[key];
         });
      }

      // Toggle to light theme if theme in user settings is 1 (= light theme)
      if(USER_DATA['theme'] === 1) {
         APP_CONFIG.theme = 'light';
         document.body.classList.add('light-theme');
      }

      // Update name in header (visible only on desktop screens)
      DOMUtils.getElementById('name-in-header').innerText = StringUtils.capitalizeFirstLetter(USER_DATA.name)

      // Update header avatar
      DOMUtils.getElementById('header-avatar').src = `https://avataaars.io/?${USER_DATA.avatar}`;

      const profileContainer = DOMUtils.getElementById('student-profile');
      profileContainer.innerHTML = '';

      // Create profile avatar section
      const profileAvatarDiv = DOMUtils.createElement('div', 'profile-avatar');
      const avatarImg = DOMUtils.createElement('img');
      avatarImg.src = `https://avataaars.io/?${USER_DATA.avatar}`;
      avatarImg.alt = 'Avatar';
      profileAvatarDiv.appendChild(avatarImg);

      // Create profile info section
      const profileInfoDiv = DOMUtils.createElement('div', 'profile-info');
      const nameHeading = DOMUtils.createElement('h2', 'student-name', StringUtils.capitalizeFirstLetter(USER_DATA.name));
      const gradeParagraph = DOMUtils.createElement(
         'p',
         'student-grade',
         `Class: ${USER_DATA.grade}${USER_DATA.section ? '-' + USER_DATA.section : ''}`
      );
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

      iframe.src = `${src}?token=${encodeURIComponent(USER_DATA['access_token'])}&user_id=${encodeURIComponent(window.userId)}`;

      iframe.addEventListener('load', function () {
         hideProcessingDialog();
         this.style.opacity = '1';

         // Sync current theme to the newly loaded iframe
         try {
            if (this.contentDocument && this.contentDocument.body) {
               const isLightTheme = APP_CONFIG.theme === 'light' ? true : false;
               const iframeBody = this.contentDocument.body;

               if (isLightTheme) {
                  iframeBody.classList.add('light-theme');
               } else {
                  iframeBody.classList.remove('light-theme');
               }
            }
         } catch (error) {
            console.warn('Cannot sync theme to iframe:', error);
         }
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
// NEW: DASHBOARD & SUBJECT SWITCHER FUNCTIONS
// =============================================================================

function renderDashboard(subject) {
   const content = DOMUtils.getElementById('content');
   content.innerHTML = ''; // Clear existing cards

   const cards = SUBJECT_DASHBOARDS[subject];
   if (cards) {
      cards.forEach(cardData => {
         const cardElement = UIComponents.createCard(cardData);
         content.appendChild(cardElement);
      });
   }
}

function setupSubjectSwitcher() {
   const switcher = DOMUtils.getElementById('subject-switcher');
   if (!switcher) return;
   switcher.innerHTML = ''; // Clear old buttons

   Object.keys(SUBJECT_DASHBOARDS).forEach(subject => {
      const button = document.createElement('button');
      button.className = 'subject-btn';
      button.textContent = StringUtils.capitalizeFirstLetter(subject);
      button.dataset.subject = subject;

      if (subject === currentSubject) {
         button.classList.add('active');
      }

      button.onclick = () => {
         currentSubject = subject;
         document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('active'));
         button.classList.add('active');
         renderDashboard(subject);
      };
      switcher.appendChild(button);
   });
}

// =============================================================================
// PAGE MANAGEMENT
// =============================================================================

const PageManager = {
   loadPage: (page) => {
      showProcessingDialog();

      if ((!(page in LINKS) || LINKS[page] === null) && page !== 'home') {
         if (page === 'word-of-the-day') {
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
         backBtn: DOMUtils.getElementById('back-btn'),
         subjectSwitcher: DOMUtils.getElementById('subject-switcher') // NEW: Get switcher element
      };

      elements.content.innerHTML = '';

      if (page !== 'home') {
         PageManager.loadExternalPage(page, elements);
      } else {
         PageManager.loadHomePage(elements);
      }
   },

   loadExternalPage: (page, elements) => {
      // MODIFIED: Hide subject switcher on external pages
      DOMUtils.hide(elements.subjectSwitcher);
      elements.content.classList.add('externalPage');

      // MODIFIED: Find card data from the new SUBJECT_DASHBOARDS object
      const allCards = Object.values(SUBJECT_DASHBOARDS).flat();
      const cardData = allCards.find(card => card.page === page);
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
      DOMUtils.show(elements.subjectSwitcher); // MODIFIED: Show subject switcher

      elements.screenName.innerText = `${APP_CONFIG.name} `;
      elements.content.classList.remove('externalPage');

      AppManager.initialize(); // This still handles profile and menu setup

      // MODIFIED: Setup switcher and render the dashboard for the current subject
      setupSubjectSwitcher();
      renderDashboard(currentSubject);

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
         PageManager.loadPage('home'); // MODIFIED: Load home page to trigger correct setup
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
            PageManager.loadPage('home'); // MODIFIED: Load home page to trigger correct setup
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

      body.classList.toggle("light-theme");

      if (body.classList.contains("light-theme")) {
         metaThemeColor.setAttribute("content", "#ffffff")
         APP_CONFIG.theme = "light";
         ThemeManager.syncThemeToIframes(true);
          // Also send new theme setting to server
         updateRow('settings', ['student_id'], [window.userId], ['theme'], [1]);
      } else {
         metaThemeColor.setAttribute("content", "#000000");
         APP_CONFIG.theme = "dark";
         ThemeManager.syncThemeToIframes(false);
          // Also send new theme setting to server
         updateRow('settings', ['student_id'], [window.userId], ['theme'], [0]);
      }
   },

   syncThemeToIframes: (isLightTheme) => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
         try {
            if (iframe.contentDocument && iframe.contentDocument.body) {
               const iframeBody = iframe.contentDocument.body;
               if (isLightTheme) {
                  iframeBody.classList.add('light-theme');
               } else {
                  iframeBody.classList.remove('light-theme');
               }
            }
         } catch (error) {
            console.warn('Cannot access iframe content (likely cross-origin):', error);
         }
      });
   }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const StringUtils = {
   capitalizeFirstLetter: (str) => {
      if (!str || str.length === 0) return str;
      return str
         .toLowerCase()
         .split(/\s+/)
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ");
   }
};

// =============================================================================
// APP MANAGEMENT
// =============================================================================

const AppManager = {
   initialize: () => {
      UIComponents.createUserProfile();
      MenuManager.initialize();
   }
};

// =============================================================================
// GLOBAL FUNCTIONS (for backward compatibility)
// =============================================================================

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
   PageManager.loadPage('home'); // MODIFIED: Point init to loadPage for consistency
}

function capitalizeFirstLetter(str) {
   return StringUtils.capitalizeFirstLetter(str);
}

function createUserProfile() {
   UIComponents.createUserProfile();
}

function createAndAppendCards() {
   // MODIFIED: Now renders the dashboard for the currently active subject
   renderDashboard(currentSubject);
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

document.getElementById('sign-in-btn').addEventListener('click', (event) => {
   event.preventDefault();
   AuthManager.login();
});

window.addEventListener('load', () => {
   AuthManager.checkAuthenticationStatus();
});

document.getElementById('back-btn').addEventListener('click', () => {
   window.history.back();
});

// =============================================================================
// BROWSER BACK BUTTON HANDLING
// =============================================================================

window.history.replaceState({
   page: APP_CONFIG.currentPage
}, "");

const originalLoadPage = PageManager.loadPage;
PageManager.loadPage = (page) => {
   originalLoadPage(page);
   if (!(page in LINKS) || LINKS[page] === null) {
      return;
   }
   if (window.history.state?.page !== page) {
      window.history.pushState({
         page
      }, "");
   }
};

window.addEventListener("popstate", (event) => {
   const statePage = event.state?.page;
   if (!statePage || statePage === "home") {
      PageManager.loadPage("home");
   } else {
      PageManager.loadPage(statePage);
   }
});
