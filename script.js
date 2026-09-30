/* ==========================================================================
   CampusConnect - Campus Club Explorer
   JavaScript Code (Beginner-Friendly DOM Manipulation)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CLUB DATA
   An array containing 8 simple JavaScript objects.
   Each object stores all the required details for a student club.
   -------------------------------------------------------------------------- */
let clubs = [
  {
    id: 1,
    name: "ACM Student Chapter",
    category: "Technology",
    categoryClass: "cat-tech",
    icon: "💻",
    members: 280,
    schedule: "Every Wednesday, 5:00 PM • CS Seminar Hall",
    description: "The premier computer science society promoting technical expertise, coding contests, and research papers.",
    fullDescription: "ACM Student Chapter is dedicated to advancing computing as a science and profession. We organize national hackathons, competitive programming bootcamps, algorithmic problem-solving workshops, and guest lectures from industry pioneers.",
    activities: [
      "CodeSprint 24-Hour Annual Hackathon",
      "Data Structures & Algorithms Bootcamp",
      "Weekly LeetCode Challenges & Mentorship",
      "Alumni Tech Talks & Mock Interviews"
    ]
  },
  {
    id: 2,
    name: "Google Developer Student Club",
    category: "Technology",
    categoryClass: "cat-tech",
    icon: "🌐",
    members: 340,
    schedule: "Every Friday, 4:30 PM • Innovation Lab 3",
    description: "Community-driven group bridging the gap between theory and practical industry technology using modern developer tools.",
    fullDescription: "GDSC is a university-based community group supported by Google Developers. From mobile and web development to machine learning and cloud architecture, our members build real-world software solutions for local communities.",
    activities: [
      "Global Solution Challenge Hackathon",
      "Google Cloud Study Jams",
      "Flutter & Android App Development",
      "Open Source Web Development Workshops"
    ]
  },
  {
    id: 3,
    name: "Robotics Club",
    category: "Technology",
    categoryClass: "cat-tech",
    icon: "🤖",
    members: 190,
    schedule: "Tuesday & Thursday, 5:30 PM • Makerspace Workshop",
    description: "Hands-on engineering club building autonomous rovers, drones, IoT devices, and combat robots.",
    fullDescription: "The Robotics Club is where mechanical design meets embedded programming. Members gain hands-on experience with Arduino, Raspberry Pi, 3D printing, sensor integration, and computer vision while competing in national robotics arenas.",
    activities: [
      "RoboWars Combat Championship",
      "Autonomous Line Follower Challenge",
      "Quadcopter Drone Design Workshop",
      "Embedded C and Arduino Masterclasses"
    ]
  },
  {
    id: 4,
    name: "Sports Club",
    category: "Sports",
    categoryClass: "cat-sports",
    icon: "⚽",
    members: 420,
    schedule: "Mon - Sat, 6:00 AM & 5:00 PM • University Sports Complex",
    description: "Promoting physical fitness, team spirit, and athletic excellence through inter-college tournaments.",
    fullDescription: "The Sports Club coordinates university athletics, intramural leagues, fitness conditioning, and inter-collegiate tournaments in cricket, football, basketball, badminton, and athletics. Everyone from casual players to seasoned athletes is welcome.",
    activities: [
      "Annual Inter-Department Sports Cup",
      "Campus 5K Marathon for Fitness",
      "Intramural Basketball League",
      "Weekend Fitness Conditioning & Yoga"
    ]
  },
  {
    id: 5,
    name: "Music & Dance Club",
    category: "Arts & Culture",
    categoryClass: "cat-arts",
    icon: "🎭",
    members: 260,
    schedule: "Mon, Wed & Fri, 5:00 PM • Cultural Auditorium",
    description: "Express your rhythm and melody through campus concerts, dance choreography, and stage battles.",
    fullDescription: "The Music & Dance Club is the vibrant cultural heartbeat of the university. We provide a collaborative stage for vocalists, instrumentalists, classical dancers, and modern street crews to rehearse, perform at college fests, and compete across India.",
    activities: [
      "Annual Battle of the Campus Bands",
      "Acoustic Unplugged Evening Sessions",
      "Western & Classical Dance Competitions",
      "Annual Spring Cultural Night Performance"
    ]
  },
  {
    id: 6,
    name: "Photography Club",
    category: "Photography",
    categoryClass: "cat-photo",
    icon: "📷",
    members: 175,
    schedule: "Every Saturday, 10:00 AM • Media Lab & Outdoors",
    description: "Capturing moments through visual storytelling, photowalks, portraiture, and digital editing.",
    fullDescription: "The Photography Club nurtures the art of visual storytelling. Whether you shoot with a professional DSLR or a smartphone, we explore manual camera exposure, lighting theory, post-processing in Lightroom, and outdoor city photo-walk expeditions.",
    activities: [
      "Golden Hour City Photowalks",
      "Adobe Lightroom Photo Editing Masterclasses",
      "Annual University Photography Exhibition",
      "Official Campus Event Coverage Team"
    ]
  },
  {
    id: 7,
    name: "Entrepreneurship Cell",
    category: "Entrepreneurship",
    categoryClass: "cat-biz",
    icon: "💡",
    members: 215,
    schedule: "Every Tuesday, 5:00 PM • Incubation Center Room 102",
    description: "Empowering future founders through pitch competitions, seed funding mentorship, and startup summits.",
    fullDescription: "E-Cell fosters the spirit of innovation and enterprise on campus. We help students transform ideas into viable startups by providing access to venture capitalists, angel investors, startup incubators, patent support, and pitch decks.",
    activities: [
      "Annual Campus Pitch Battle with Seed Grants",
      "Founders Talk Series with Startup CEOs",
      "Annual E-Summit & Business Plan Competition",
      "Product Design & Business Model Canvas Sprints"
    ]
  },
  {
    id: 8,
    name: "NSS Club",
    category: "Social Service",
    categoryClass: "cat-social",
    icon: "🤝",
    members: 380,
    schedule: "Every Sunday, 9:00 AM • Community Outreach Hall",
    description: "Dedicated to community welfare, rural education drives, environmental conservation, and blood camps.",
    fullDescription: "The National Service Scheme (NSS) unit connects students with meaningful civic responsibility. We organize blood donation camps, digital literacy drives in adopted villages, tree plantation campaigns, and disaster relief aid.",
    activities: [
      "Mega Annual Blood Donation Drive",
      "Clean Campus, Green Campus Plantation Drive",
      "Rural School Literacy & Computer Tutoring",
      "Public Health, Hygiene & Road Safety Drives"
    ]
  }
];

/* --------------------------------------------------------------------------
   2. FILTER & STATE VARIABLES
   Track current category and search keyword.
   -------------------------------------------------------------------------- */
let currentCategory = "All Clubs";
let currentSearchTerm = "";
let currentDetailClub = null; // Store club currently viewed in modal

/* --------------------------------------------------------------------------
   3. DOM ELEMENT REFERENCES
   Retrieve elements using document.getElementById and querySelector.
   -------------------------------------------------------------------------- */
let clubsGrid = document.getElementById("clubsGrid");
let resultsCount = document.getElementById("resultsCount");
let noResultsMessage = document.getElementById("noResultsMessage");
let clubSearchInput = document.getElementById("clubSearchInput");
let heroSearchInput = document.getElementById("heroSearchInput");
let clearSearchBtn = document.getElementById("clearSearchBtn");
let categoryContainer = document.getElementById("categoryContainer");

// Modals
let clubDetailsModal = document.getElementById("clubDetailsModal");
let joinClubModal = document.getElementById("joinClubModal");

// Details Modal Elements
let detailIconBox = document.getElementById("detailIconBox");
let detailClubCategory = document.getElementById("detailClubCategory");
let detailClubName = document.getElementById("detailClubName");
let detailMembersCount = document.getElementById("detailMembersCount");
let detailMeetingSchedule = document.getElementById("detailMeetingSchedule");
let detailDescription = document.getElementById("detailDescription");
let detailActivitiesList = document.getElementById("detailActivitiesList");

// Join Form Elements
let joinClubForm = document.getElementById("joinClubForm");
let studentNameInput = document.getElementById("studentName");
let studentEmailInput = document.getElementById("studentEmail");
let regNumberInput = document.getElementById("regNumber");
let clubSelectDropdown = document.getElementById("clubSelect");
let formErrorAlert = document.getElementById("formErrorAlert");
let formErrorMessage = document.getElementById("formErrorMessage");
let formSuccessAlert = document.getElementById("formSuccessAlert");
let formSuccessMessage = document.getElementById("formSuccessMessage");

// Navigation
let hamburgerBtn = document.getElementById("hamburgerBtn");
let navLinks = document.getElementById("navLinks");


/* --------------------------------------------------------------------------
   4. FUNCTION: DISPLAY CLUB CARDS
   Uses a basic 'for' loop and 'if-else' to filter and generate HTML.
   Demonstrates innerHTML usage.
   -------------------------------------------------------------------------- */
function displayClubs() {
  let cardsHtml = "";
  let matchingCount = 0;

  // Loop through all clubs using a standard for loop
  for (let i = 0; i < clubs.length; i++) {
    let club = clubs[i];

    // Check if club matches selected category
    let matchesCategory = false;
    if (currentCategory === "All Clubs" || club.category === currentCategory) {
      matchesCategory = true;
    }

    // Check if club matches search term (case-insensitive)
    let matchesSearch = false;
    let nameLower = club.name.toLowerCase();
    let categoryLower = club.category.toLowerCase();
    let searchLower = currentSearchTerm.toLowerCase().trim();

    if (searchLower === "" || nameLower.includes(searchLower) || categoryLower.includes(searchLower)) {
      matchesSearch = true;
    }

    // If both category and search match, build the card HTML
    if (matchesCategory && matchesSearch) {
      matchingCount = matchingCount + 1;

      cardsHtml = cardsHtml + 
        '<div class="club-card">' +
          '<div class="club-card-header">' +
            '<div class="club-icon-avatar">' + club.icon + '</div>' +
            '<span class="club-category-pill ' + club.categoryClass + '">' + club.category + '</span>' +
          '</div>' +
          '<h3 class="club-card-title">' + club.name + '</h3>' +
          '<p class="club-card-description">' + club.description + '</p>' +
          '<div class="club-card-meta">' +
            '<span class="meta-members-badge">👥 ' + club.members + ' active members</span>' +
          '</div>' +
          '<div class="club-card-actions">' +
            '<button type="button" class="btn btn-secondary" onclick="openDetailModal(' + club.id + ')">' +
              'View Details' +
            '</button>' +
            '<button type="button" class="btn btn-primary" onclick="openJoinModal(\'' + club.name + '\')">' +
              'Join Club' +
            '</button>' +
          '</div>' +
        '</div>';
    }
  }

  // Update DOM with generated cards
  clubsGrid.innerHTML = cardsHtml;

  // Update results counter text
  if (matchingCount === 1) {
    resultsCount.textContent = "Showing 1 club";
  } else {
    resultsCount.textContent = "Showing " + matchingCount + " clubs";
  }

  // Handle empty search results message
  if (matchingCount === 0) {
    clubsGrid.style.display = "none";
    noResultsMessage.style.display = "block";
  } else {
    clubsGrid.style.display = "grid";
    noResultsMessage.style.display = "none";
  }
}


/* --------------------------------------------------------------------------
   5. FUNCTION: FILTER BY CATEGORY
   Updates active category button and re-renders clubs.
   -------------------------------------------------------------------------- */
function filterByCategory(categoryName) {
  currentCategory = categoryName;

  // Update active class on category buttons using a for loop
  let categoryButtons = categoryContainer.querySelectorAll(".category-btn");
  for (let i = 0; i < categoryButtons.length; i++) {
    let button = categoryButtons[i];
    let buttonCategory = button.getAttribute("data-category");

    if (buttonCategory === categoryName) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }

  // Re-render clubs list
  displayClubs();
}


/* --------------------------------------------------------------------------
   6. FUNCTION: HANDLE SEARCH INPUT
   Reads search box input and updates results in real-time.
   -------------------------------------------------------------------------- */
function handleSearchInput(event) {
  let query = event.target.value;
  currentSearchTerm = query;

  // Sync hero search box and main search box if they exist
  if (event.target === clubSearchInput && heroSearchInput) {
    heroSearchInput.value = query;
  } else if (event.target === heroSearchInput && clubSearchInput) {
    clubSearchInput.value = query;
  }

  // Show or hide clear button
  if (currentSearchTerm.trim() !== "") {
    clearSearchBtn.style.display = "block";
  } else {
    clearSearchBtn.style.display = "none";
  }

  // Re-render clubs
  displayClubs();
}

// Clear search input function
function clearSearch() {
  clubSearchInput.value = "";
  if (heroSearchInput) {
    heroSearchInput.value = "";
  }
  currentSearchTerm = "";
  clearSearchBtn.style.display = "none";
  displayClubs();
  clubSearchInput.focus();
}

// Reset all search and category filters
function resetAllFilters() {
  clearSearch();
  filterByCategory("All Clubs");
}


/* --------------------------------------------------------------------------
   7. FUNCTION: SCROLL TO CLUBS & FOOTER FILTER HELPER
   Smoothly scrolls to the clubs section when clicking explore button.
   -------------------------------------------------------------------------- */
function scrollToClubs() {
  let clubsSection = document.getElementById("clubsSection");
  if (clubsSection) {
    // If hero search has input, pass it down and search immediately
    if (heroSearchInput && heroSearchInput.value.trim() !== "") {
      clubSearchInput.value = heroSearchInput.value;
      currentSearchTerm = heroSearchInput.value;
      clearSearchBtn.style.display = "block";
      displayClubs();
    }
    clubsSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Allows footer category links to filter clubs and scroll up
function filterFromFooter(categoryName) {
  filterByCategory(categoryName);
  let clubsSection = document.getElementById("clubsSection");
  if (clubsSection) {
    clubsSection.scrollIntoView({ behavior: "smooth" });
  }
}


/* --------------------------------------------------------------------------
   8. FUNCTION: CLUB DETAILS MODAL (VIEW DETAILS)
   Finds club by ID and populates modal with details.
   -------------------------------------------------------------------------- */
function openDetailModal(clubId) {
  let selectedClub = null;

  // Find matching club using a simple for loop
  for (let i = 0; i < clubs.length; i++) {
    if (clubs[i].id === clubId) {
      selectedClub = clubs[i];
      break;
    }
  }

  if (selectedClub !== null) {
    currentDetailClub = selectedClub;

    // Populate modal fields
    detailIconBox.textContent = selectedClub.icon;
    detailClubCategory.textContent = selectedClub.category;
    detailClubCategory.className = "club-category-pill " + selectedClub.categoryClass;
    detailClubName.textContent = selectedClub.name;
    detailMembersCount.textContent = selectedClub.members + " students";
    detailMeetingSchedule.textContent = selectedClub.schedule;
    detailDescription.textContent = selectedClub.fullDescription;

    // Build activities list items using for loop
    let activitiesHtml = "";
    for (let j = 0; j < selectedClub.activities.length; j++) {
      activitiesHtml = activitiesHtml + 
        '<li class="detail-activity-item">' +
          '<span class="activity-bullet">✓</span> ' +
          '<span>' + selectedClub.activities[j] + '</span>' +
        '</li>';
    }
    detailActivitiesList.innerHTML = activitiesHtml;

    // Show modal by adding active class
    clubDetailsModal.classList.add("active");
    clubDetailsModal.setAttribute("aria-hidden", "false");
  }
}

// Close details modal
function closeDetailModal() {
  clubDetailsModal.classList.remove("active");
  clubDetailsModal.setAttribute("aria-hidden", "true");
}

// Switch directly from details modal to the registration form
function switchToJoinFromDetails() {
  if (currentDetailClub !== null) {
    let clubName = currentDetailClub.name;
    closeDetailModal();
    openJoinModal(clubName);
  }
}


/* --------------------------------------------------------------------------
   9. FUNCTION: JOIN CLUB REGISTRATION FORM MODAL
   Opens registration modal and pre-selects club if provided.
   -------------------------------------------------------------------------- */
function openJoinModal(preselectedClubName) {
  // Reset alerts
  formErrorAlert.style.display = "none";
  formSuccessAlert.style.display = "none";
  joinClubForm.style.display = "block";

  // Pre-select club in dropdown if provided
  if (preselectedClubName) {
    clubSelectDropdown.value = preselectedClubName;
  }

  // Open modal
  joinClubModal.classList.add("active");
  joinClubModal.setAttribute("aria-hidden", "false");
}

// Close registration modal
function closeJoinModal() {
  joinClubModal.classList.remove("active");
  joinClubModal.setAttribute("aria-hidden", "true");
}


/* --------------------------------------------------------------------------
   10. FUNCTION: FORM VALIDATION & SUBMISSION
   Validates required fields and checks email format.
   -------------------------------------------------------------------------- */
function handleJoinFormSubmit(event) {
  // Prevent page refresh on submit
  event.preventDefault();

  // Get field values
  let nameValue = studentNameInput.value.trim();
  let emailValue = studentEmailInput.value.trim();
  let regValue = regNumberInput.value.trim();
  let clubValue = clubSelectDropdown.value;

  // Validation checks using if-else statements
  let isValid = true;
  let errorText = "";

  if (nameValue === "") {
    isValid = false;
    errorText = "Please enter your full name.";
  } else if (emailValue === "") {
    isValid = false;
    errorText = "Please enter your college email address.";
  } else if (!emailValue.includes("@")) {
    isValid = false;
    errorText = "Please enter a valid email address containing '@'.";
  } else if (regValue === "") {
    isValid = false;
    errorText = "Please enter your university registration / roll number.";
  } else if (clubValue === "") {
    isValid = false;
    errorText = "Please select a club from the dropdown list.";
  }

  // If form is invalid, show error message
  if (isValid === false) {
    formErrorMessage.textContent = errorText;
    formErrorAlert.style.display = "flex";
    formSuccessAlert.style.display = "none";
    return;
  }

  // If valid, hide error, show success message, and reset inputs
  formErrorAlert.style.display = "none";
  formSuccessMessage.textContent = "Congratulations " + nameValue + "! Your registration for " + clubValue + " is received. A confirmation has been sent to " + emailValue + ".";
  formSuccessAlert.style.display = "flex";

  // Hide the form fields to highlight success message clearly
  joinClubForm.style.display = "none";

  // Reset form inputs for next time
  joinClubForm.reset();
}


/* --------------------------------------------------------------------------
   11. FUNCTION: MOBILE NAVIGATION MENU TOGGLE
   Toggles navigation menu open/close on small screens.
   -------------------------------------------------------------------------- */
function toggleMobileMenu() {
  navLinks.classList.toggle("active");
}

// Close mobile menu when a nav link is clicked
function handleNavLinkClick() {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
}


/* --------------------------------------------------------------------------
   12. EVENT LISTENERS SETUP
   Attaches standard DOM event listeners when page finishes loading.
   -------------------------------------------------------------------------- */
function initializeApp() {
  // 1. Initial render of all clubs
  displayClubs();

  // 2. Attach category button click listeners using for loop
  let categoryButtons = categoryContainer.querySelectorAll(".category-btn");
  for (let i = 0; i < categoryButtons.length; i++) {
    let button = categoryButtons[i];
    button.addEventListener("click", function() {
      let category = this.getAttribute("data-category");
      filterByCategory(category);
    });
  }

  // 3. Search inputs event listeners (real-time filtering on input)
  if (clubSearchInput) {
    clubSearchInput.addEventListener("input", handleSearchInput);
  }
  if (heroSearchInput) {
    heroSearchInput.addEventListener("input", handleSearchInput);
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", clearSearch);
  }

  // 4. Mobile hamburger menu
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  // 5. Close mobile menu when nav links are clicked
  let navItems = navLinks.querySelectorAll(".nav-link");
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", handleNavLinkClick);
  }

  // 6. Close modals when clicking on background overlay
  window.addEventListener("click", function(event) {
    if (event.target === clubDetailsModal) {
      closeDetailModal();
    }
    if (event.target === joinClubModal) {
      closeJoinModal();
    }
  });

  // 7. Close modals when pressing Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeDetailModal();
      closeJoinModal();
    }
  });
}

// Run initializeApp when DOM is fully loaded
window.addEventListener("DOMContentLoaded", initializeApp);
