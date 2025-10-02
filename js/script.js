// =============================================================================
// CONFIGURATION & CONSTANTS
// =============================================================================

const APP_CONFIG = {
   name: 'Ion Spark',
   loadingDelay: 1000,
   iframeTransitionDuration: '1s',
   currentPage: 'home',
   theme: 'dark'
};


const USER_DATA = {
   name: '',
   grade: '',
   section: '',
   accountType: 'Student',
   avatar: ''
};

// Variable to hold all dashboard data fetched from the backend.
let DASHBOARD_DATA = {};

// Variable to hold all subscription data fetched from the backend.
let SUBSCRIPTION_DATA = [];

// Array to hold all unique page keys for each subscribed subject
let PAGELIST = {};

// Variable to track the currently selected subject.
let currentSubject = 'General';

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
   },

   // Function to get all dashboard data for the logged-in user
   getDashboardData: async () => {
      try {
         const data = await invokeFunction('get_student_dashboard_data', {}, false);
         return data || {}; // Return data or an empty object
      } catch (err) {
         console.error("Error fetching dashboard data:", err);
         return {}; // Return empty object on error
      }
   },

   // Function to get all subscriptions for the logged-in user
   getSubscriptionData: async () => {
      try {
         const data = await selectData('subscriptions', false, "subject, subscription_plan, subscription_ends_at", ['student_id'], [window.userId], 'id');
         return data || []; // Return data or an empty array
      } catch (err) {
         console.error("Error fetching dashboard data:", err);
         return []; // Return empty array on error
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

   createIframe: (src, page, minWidth) => {
      const iframe = DOMUtils.createElement('iframe');

      Object.assign(iframe.style, {
         width: '100%',
         height: '100%',
         border: 'none',
         flex: '1',
         opacity: '0',
         transition: `opacity ${APP_CONFIG.iframeTransitionDuration}`
      });

      if (minWidth) { // Use the passed argument
         iframe.style.minWidth = `${minWidth}px`;
      }

      const paramData = {
         token: USER_DATA['access_token'],
         user_id: window.userId,
         grade: USER_DATA['grade']
      };
      
      iframe.src = StringUtils.addUrlParams(src, paramData);

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

         // Run special initialization function if exists in the loaded iframe page
         if (typeof this.contentWindow.initializePage === 'function') {
              // If it exists, call it with USER_DATA passed
              this.contentWindow.initializePage(USER_DATA);
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
// DASHBOARD & SUBJECT SWITCHER FUNCTIONS
// =============================================================================

function renderDashboard(subject) {
   const content = DOMUtils.getElementById('content');
   content.innerHTML = '';

   const cards = DASHBOARD_DATA[subject]; // Use the new data source
   if (cards) {
      cards.forEach(cardData => {
         // The 'page' property is now the page_key
         const cardElement = UIComponents.createCard(cardData);
         content.appendChild(cardElement);
      });
   }
}

function setupSubjectSwitcher() {
   const switcher = DOMUtils.getElementById('subject-switcher');
   if (!switcher) return;
   switcher.innerHTML = ''; // Clear old buttons

   // The keys of DASHBOARD_DATA are the subscribed subjects
   const subscribedSubjects = Object.keys(DASHBOARD_DATA);

   if (subscribedSubjects.length === 0) {
      // Optional: Show a message if there are no subscriptions
      DOMUtils.getElementById('content').innerHTML = '<p class="info-message">You are not subscribed to any subjects yet.</p>';
      return;
   }
   
   // If currentSubject is not in the new list, default to the first one
   if (!subscribedSubjects.includes(currentSubject)) {
      currentSubject = subscribedSubjects[0];
   }

   subscribedSubjects.forEach(subject => {
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

function extractPages(obj) {
  const result = {};
  
  for (const [subject, items] of Object.entries(obj)) {
    result[subject] = items
      .filter(item => item.link)       // keep only entries with a non-falsy link
      .map(item => item.page);         // extract the "page" value
  }
  
  return result;
}


// =============================================================================
// PAGE MANAGEMENT
// =============================================================================

const PageManager = {

   // This history will track manual page loads for the back button
   manualHistory: [], 

   loadPage: (page) => {
      showProcessingDialog();

      // Clear the manual history when navigating to a non-manual page
      if (page === 'home') {
          PageManager.manualHistory = [];
      }

      if ( Object.keys(PAGELIST).length === 0 || (!(PAGELIST[currentSubject].includes(page)) && page !== 'home') ) {
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

      // Find card data from the new SUBJECT_DASHBOARDS object
      const allCards = Object.values(DASHBOARD_DATA).flat();
      const cardData = allCards.find(card => card.page === page);

      if (!cardData) {
         console.error(`No card data found for page key: ${page}`);
         hideProcessingDialog();
         // Optionally show an error message to the user
         elements.content.innerHTML = '<p class="error-message">Could not load this page.</p>';
         return;
      }

      const displayTitle = cardData ? cardData.title : StringUtils.capitalizeFirstLetter(page);

      elements.screenName.innerText = `${displayTitle} `;

      DOMUtils.hide(elements.studentProfile);
      DOMUtils.hide(elements.menuBtn);
      DOMUtils.show(elements.backBtn);

      const iframe = UIComponents.createIframe(cardData.link, page, cardData.min_width);
      elements.content.appendChild(iframe);
   },

   // Function to load custom URLs into an iframe
   loadManualPage: (url, title, pageKey, minWidth) => {
      showProcessingDialog();
      APP_CONFIG.currentPage = pageKey;

      const elements = {
         content: DOMUtils.getElementById('content'),
         screenName: DOMUtils.getElementById('screen-name'),
         studentProfile: DOMUtils.getElementById('student-profile'),
         menuBtn: DOMUtils.getElementById('menu-btn'),
         backBtn: DOMUtils.getElementById('back-btn'),
         subjectSwitcher: DOMUtils.getElementById('subject-switcher')
      };

      // Set up the page layout like other external pages
      elements.content.innerHTML = '';
      DOMUtils.hide(elements.subjectSwitcher);
      elements.content.classList.add('externalPage');
      elements.screenName.innerText = `${title} `;
      DOMUtils.hide(elements.studentProfile);
      DOMUtils.hide(elements.menuBtn);
      DOMUtils.show(elements.backBtn);

      // Create and append the iframe
      const iframe = UIComponents.createIframe(url, pageKey, minWidth);
      elements.content.appendChild(iframe);
      
      // Push state to browser history for back button functionality
      const state = { page: pageKey, manual: true, url: url, title: title };
      PageManager.manualHistory.push(state); // Keep track internally
      window.history.pushState(state, title, `#${pageKey}`);
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

         // Load profile AND dashboard data before showing the page
         await AppManager.initialize();

         DOMUtils.hide(elements.signInScreen);
         PageManager.loadPage('home'); // Load home page to trigger correct setup
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
            // Load profile AND dashboard data before showing the page
            await AppManager.initialize();
            DOMUtils.hide(signInScreen);
            PageManager.loadPage('home'); // Load home page to trigger correct setup
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
               // Run special toggleIframeTheme function if exists in the loaded iframe page
               if (typeof iframe.contentWindow.toggleIframeTheme === 'function') {
                    // If it exists, call it to sync live theme changes
                    iframe.contentWindow.toggleIframeTheme();
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
   },

   addUrlParams: (url, params) => {
      const paramString = Object.entries(params)
         .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
         .join('&');

      const separator = url.includes('?') ? '&' : '?';
      return url + separator + paramString;
   }
};


// =============================================================================
// APP MANAGEMENT
// =============================================================================

const AppManager = {
   initialize: async () => {
      await UIComponents.createUserProfile();
      DASHBOARD_DATA = await BackendManager.getDashboardData(); // Fetch and store dashboard data
      PAGELIST = extractPages(DASHBOARD_DATA);
      SUBSCRIPTION_DATA = await BackendManager.getSubscriptionData(); // Fetch and store subscription data
      USER_DATA['subscriptions'] = SUBSCRIPTION_DATA;
      MenuManager.initialize();
   }
};

// =============================================================================
// GLOBAL FUNCTIONS (for backward compatibility & sharing with iframes)
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

function loadManualPage(url, title, pageKey, minWidth) {
   PageManager.loadManualPage(url, title, pageKey, minWidth);
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
    // Don't push history for pages that don't exist in PAGELIST
   if (Object.keys(PAGELIST).length === 0 || !(PAGELIST[currentSubject] && PAGELIST[currentSubject].includes(page))) {
      return;
   }
   if (window.history.state?.page !== page) {
      // Use a distinct state for dashboard pages
      window.history.pushState({
         page: page,
         manual: false
      }, "");
   }
};

// MODIFIED: Update the popstate listener
window.addEventListener("popstate", (event) => {
   const state = event.state;
   
   if (!state || state.page === "home") {
      PageManager.loadPage("home");
   } else if (state.manual) {
      // If the page was manually loaded, use the state's info to reload it
      PageManager.manualHistory.pop(); // Remove current state as we're going back
      const previousState = PageManager.manualHistory[PageManager.manualHistory.length - 1];
      if (previousState) {
          PageManager.loadManualPage(previousState.url, previousState.title, previousState.page);
      } else {
          // If no manual pages are left in history, go home
          PageManager.loadPage("home");
      }
   } else {
      // Otherwise, it's a regular dashboard page
      PageManager.loadPage(state.page);
   }
});
