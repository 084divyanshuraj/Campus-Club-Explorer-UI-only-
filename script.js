/* ==========================================================================
   CampusConnect - Campus Club Explorer
   Frontend Application Script (Full REST API Backend with Zero-Setup Fallback)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DEFAULT FALLBACK DATA (For Vercel / Standalone Deployment without server)
   -------------------------------------------------------------------------- */
const DEFAULT_CLUBS = [
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

const DEFAULT_REGISTRATIONS = [
  {
    id: 1,
    student_name: "Aarav Sharma",
    student_email: "aarav.sharma@campus.edu",
    reg_number: "2024CS1042",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    club_name: "ACM Student Chapter",
    status: "Approved",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 2,
    student_name: "Priya Nair",
    student_email: "priya.nair@campus.edu",
    reg_number: "2024EC2105",
    department: "Electronics & Communication",
    year: "1st Year",
    club_name: "Robotics Club",
    status: "Pending",
    created_at: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 3,
    student_name: "Rohan Verma",
    student_email: "rohan.verma@campus.edu",
    reg_number: "2024ME3319",
    department: "Mechanical Engineering",
    year: "3rd Year",
    club_name: "Sports Club",
    status: "Pending",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString()
  }
];

/* --------------------------------------------------------------------------
   2. GLOBAL STATE & DATA STORAGE
   -------------------------------------------------------------------------- */
let isBackendOnline = false;
let clubs = [];
let currentCategory = "All Clubs";
let currentSearchTerm = "";
let currentDetailClub = null;

// Auth State (Persists in localStorage)
let currentUser = JSON.parse(localStorage.getItem("campus_auth_user")) || null;
let currentLoginRole = "student";

// Admin Portal State
let adminStatusFilter = "All";
let adminClubFilterValue = "All";
let adminSearchTerm = "";

/* --------------------------------------------------------------------------
   3. DOM ELEMENT REFERENCES
   -------------------------------------------------------------------------- */
let clubsGrid = document.getElementById("clubsGrid");
let resultsCount = document.getElementById("resultsCount");
let noResultsMessage = document.getElementById("noResultsMessage");
let clubSearchInput = document.getElementById("clubSearchInput");
let heroSearchInput = document.getElementById("heroSearchInput");
let clearSearchBtn = document.getElementById("clearSearchBtn");
let categoryContainer = document.getElementById("categoryContainer");

// Auth & Navigation Elements
let navSignInBtn = document.getElementById("navSignInBtn");
let navUserPill = document.getElementById("navUserPill");
let navUserAvatar = document.getElementById("navUserAvatar");
let navUserName = document.getElementById("navUserName");
let navUserRole = document.getElementById("navUserRole");
let navStudentAppsBtn = document.getElementById("navStudentAppsBtn");
let navAdminBtn = document.getElementById("navAdminBtn");

// Details Modal Elements
let clubDetailsModal = document.getElementById("clubDetailsModal");
let detailIconBox = document.getElementById("detailIconBox");
let detailClubCategory = document.getElementById("detailClubCategory");
let detailClubName = document.getElementById("detailClubName");
let detailMembersCount = document.getElementById("detailMembersCount");
let detailMeetingSchedule = document.getElementById("detailMeetingSchedule");
let detailDescription = document.getElementById("detailDescription");
let detailActivitiesList = document.getElementById("detailActivitiesList");

// Join Modal & Form Elements
let joinClubModal = document.getElementById("joinClubModal");
let joinClubForm = document.getElementById("joinClubForm");
let studentNameInput = document.getElementById("studentName");
let studentEmailInput = document.getElementById("studentEmail");
let regNumberInput = document.getElementById("regNumber");
let clubSelectDropdown = document.getElementById("clubSelect");
let formErrorAlert = document.getElementById("formErrorAlert");
let formErrorMessage = document.getElementById("formErrorMessage");
let formSuccessAlert = document.getElementById("formSuccessAlert");
let formSuccessMessage = document.getElementById("formSuccessMessage");
let submitJoinBtn = document.getElementById("submitJoinBtn");

// Admin Modal Elements
let adminModal = document.getElementById("adminModal");
let adminBadgeCount = document.getElementById("adminBadgeCount");
let kpiTotalApps = document.getElementById("kpiTotalApps");
let kpiPendingApps = document.getElementById("kpiPendingApps");
let kpiApprovedApps = document.getElementById("kpiApprovedApps");
let kpiRejectedApps = document.getElementById("kpiRejectedApps");
let adminSearchInput = document.getElementById("adminSearchInput");
let adminClubFilter = document.getElementById("adminClubFilter");
let adminStatusTabs = document.getElementById("adminStatusTabs");
let adminTableBody = document.getElementById("adminTableBody");
let adminEmptyState = document.getElementById("adminEmptyState");
let adminToast = document.getElementById("adminToast");

// Login Modal Elements
let loginModal = document.getElementById("loginModal");
let loginRoleTabs = document.getElementById("loginRoleTabs");
let loginRolePill = document.getElementById("loginRolePill");
let loginModalTitle = document.getElementById("loginModalTitle");
let loginEmail = document.getElementById("loginEmail");
let loginEmailLabel = document.getElementById("loginEmailLabel");
let loginPassword = document.getElementById("loginPassword");
let loginSubmitBtn = document.getElementById("loginSubmitBtn");
let loginErrorAlert = document.getElementById("loginErrorAlert");
let loginErrorMessage = document.getElementById("loginErrorMessage");
let loginSuccessAlert = document.getElementById("loginSuccessAlert");
let loginSuccessMessage = document.getElementById("loginSuccessMessage");

// Student Apps Modal Elements
let studentAppsModal = document.getElementById("studentAppsModal");
let studentAppsTableBody = document.getElementById("studentAppsTableBody");
let studentAppsEmptyState = document.getElementById("studentAppsEmptyState");

// Hero Stats Elements
let heroStatClubs = document.getElementById("heroStatClubs");
let heroStatMembers = document.getElementById("heroStatMembers");

// Pending club to join after login
let pendingClubToJoin = null;

// Mobile Navigation
let hamburgerBtn = document.getElementById("hamburgerBtn");
let navLinks = document.getElementById("navLinks");


/* --------------------------------------------------------------------------
   4. LOCALSTORAGE HELPERS (For Standalone / Vercel Mode)
   -------------------------------------------------------------------------- */
function getLocalRegistrations() {
  const stored = localStorage.getItem("campus_registrations");
  if (!stored) {
    localStorage.setItem("campus_registrations", JSON.stringify(DEFAULT_REGISTRATIONS));
    return [...DEFAULT_REGISTRATIONS];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [...DEFAULT_REGISTRATIONS];
  }
}

function saveLocalRegistrations(list) {
  localStorage.setItem("campus_registrations", JSON.stringify(list));
}

function getLocalClubs() {
  const stored = localStorage.getItem("campus_clubs");
  if (!stored) {
    localStorage.setItem("campus_clubs", JSON.stringify(DEFAULT_CLUBS));
    return [...DEFAULT_CLUBS];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [...DEFAULT_CLUBS];
  }
}

function saveLocalClubs(list) {
  localStorage.setItem("campus_clubs", JSON.stringify(list));
}


/* --------------------------------------------------------------------------
   5. API CLIENT & HYBRID DATA FETCHING
   Tries Express REST API first; seamlessly falls back to local data if on Vercel.
   -------------------------------------------------------------------------- */
async function fetchClubs() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch('/api/clubs', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        isBackendOnline = true;
        clubs = data.data;
        displayClubs();
        populateClubDropdowns();
        fetchStats(); // Update stats immediately once clubs are loaded
        return;
      }
    }
    throw new Error("Backend API responded with non-200 status.");
  } catch (error) {
    // Graceful fallback to client / standalone mode (Vercel)
    isBackendOnline = false;
    console.info("⚡ Running in Vercel/Standalone mode with local persistence.");
    clubs = getLocalClubs();
    displayClubs();
    populateClubDropdowns();
    fetchStats();
  }
}

async function fetchStats() {
  // 1. Always attempt live API first
  try {
    const response = await fetch('/api/stats');
    if (response.ok) {
      const res = await response.json();
      if (res.success && res.data) {
        isBackendOnline = true;
        applyStatsToUI(res.data.totalClubs, res.data.totalMembers, res.data.registrations);
        return;
      }
    }
  } catch (e) {
    // API not reachable, compute locally
  }

  // 2. Standalone / Local Fallback calculation (Guaranteed non-empty)
  const clubList = (clubs && clubs.length > 0) ? clubs : getLocalClubs();
  const totalClubs = clubList.length || 8;
  let totalMembers = 0;
  for (let i = 0; i < clubList.length; i++) {
    totalMembers += (clubList[i].members || 0);
  }
  if (totalMembers === 0) totalMembers = 2260;

  const regs = getLocalRegistrations();
  const counts = {
    total: regs.length,
    pending: regs.filter(r => r.status === "Pending").length,
    approved: regs.filter(r => r.status === "Approved").length,
    rejected: regs.filter(r => r.status === "Rejected").length
  };

  applyStatsToUI(totalClubs, totalMembers, counts);
}

function applyStatsToUI(totalClubs, totalMembers, regCounts) {
  const displayClubs = (totalClubs && totalClubs > 0) ? totalClubs : 8;
  const displayMembers = (totalMembers && totalMembers > 0) ? totalMembers : 2260;

  if (heroStatClubs) heroStatClubs.textContent = `${displayClubs}+`;
  if (heroStatMembers) heroStatMembers.textContent = `${Number(displayMembers).toLocaleString()}+`;

  const pending = regCounts.pending || 0;
  if (adminBadgeCount) {
    adminBadgeCount.textContent = pending;
    if (pending > 0) adminBadgeCount.classList.add("has-pending");
    else adminBadgeCount.classList.remove("has-pending");
  }

  if (kpiTotalApps) kpiTotalApps.textContent = regCounts.total || 0;
  if (kpiPendingApps) kpiPendingApps.textContent = pending;
  if (kpiApprovedApps) kpiApprovedApps.textContent = regCounts.approved || 0;
  if (kpiRejectedApps) kpiRejectedApps.textContent = regCounts.rejected || 0;
}


/* --------------------------------------------------------------------------
   6. FUNCTION: POPULATE DROPDOWNS DYNAMICALLY
   -------------------------------------------------------------------------- */
function populateClubDropdowns() {
  if (!clubSelectDropdown) return;
  const prevVal = clubSelectDropdown.value;

  let optionsHtml = '<option value="">-- Choose a Campus Club --</option>';
  let adminOptionsHtml = '<option value="All">All Clubs</option>';

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i];
    optionsHtml += `<option value="${club.name}">${club.name} (${club.category})</option>`;
    adminOptionsHtml += `<option value="${club.name}">${club.name}</option>`;
  }

  clubSelectDropdown.innerHTML = optionsHtml;
  if (prevVal) clubSelectDropdown.value = prevVal;

  if (adminClubFilter) {
    const prevAdminVal = adminClubFilter.value;
    adminClubFilter.innerHTML = adminOptionsHtml;
    if (prevAdminVal) adminClubFilter.value = prevAdminVal;
  }
}


/* --------------------------------------------------------------------------
   7. FUNCTION: DISPLAY CLUB CARDS
   -------------------------------------------------------------------------- */
function displayClubs() {
  let cardsHtml = "";
  let matchingCount = 0;

  for (let i = 0; i < clubs.length; i++) {
    let club = clubs[i];

    let matchesCategory = (currentCategory === "All Clubs" || club.category === currentCategory);

    let nameLower = club.name.toLowerCase();
    let categoryLower = club.category.toLowerCase();
    let descLower = (club.description || "").toLowerCase();
    let searchLower = currentSearchTerm.toLowerCase().trim();

    let matchesSearch = (searchLower === "" || nameLower.includes(searchLower) || categoryLower.includes(searchLower) || descLower.includes(searchLower));

    if (matchesCategory && matchesSearch) {
      matchingCount++;
      cardsHtml += `
        <div class="club-card">
          <div class="club-card-header">
            <div class="club-icon-avatar">${club.icon}</div>
            <span class="club-category-pill ${club.categoryClass}">${club.category}</span>
          </div>
          <h3 class="club-card-title">${club.name}</h3>
          <p class="club-card-description">${club.description}</p>
          <div class="club-card-meta">
            <span class="meta-members-badge">👥 ${club.members} active members</span>
          </div>
          <div class="club-card-actions">
            <button type="button" class="btn btn-secondary" onclick="openDetailModal(${club.id})">
              View Details
            </button>
            <button type="button" class="btn btn-primary" onclick="openJoinModal('${club.name.replace(/'/g, "\\'")}')">
              Join Club
            </button>
          </div>
        </div>
      `;
    }
  }

  clubsGrid.innerHTML = cardsHtml;
  resultsCount.textContent = matchingCount + (matchingCount === 1 ? " club found" : " clubs found");

  if (matchingCount === 0) {
    noResultsMessage.style.display = "block";
    clubsGrid.style.display = "none";
  } else {
    noResultsMessage.style.display = "none";
    clubsGrid.style.display = "grid";
  }
}


/* --------------------------------------------------------------------------
   8. FILTERING & SEARCH HANDLERS
   -------------------------------------------------------------------------- */
function filterByCategory(categoryName) {
  currentCategory = categoryName;

  let categoryButtons = categoryContainer.querySelectorAll(".category-btn");
  for (let i = 0; i < categoryButtons.length; i++) {
    let btn = categoryButtons[i];
    let btnCategory = btn.getAttribute("data-category");

    if (btnCategory === categoryName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }

  displayClubs();
}

function handleSearchInput(event) {
  currentSearchTerm = event.target.value;

  if (event.target === clubSearchInput && heroSearchInput) {
    heroSearchInput.value = currentSearchTerm;
  } else if (event.target === heroSearchInput && clubSearchInput) {
    clubSearchInput.value = currentSearchTerm;
  }

  if (clearSearchBtn) {
    clearSearchBtn.style.display = currentSearchTerm.trim() !== "" ? "block" : "none";
  }

  displayClubs();
}

function clearSearch() {
  currentSearchTerm = "";
  if (clubSearchInput) clubSearchInput.value = "";
  if (heroSearchInput) heroSearchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.style.display = "none";
  displayClubs();
}

function resetAllFilters() {
  clearSearch();
  filterByCategory("All Clubs");
}

function scrollToClubs() {
  let clubsSection = document.getElementById("clubsSection");
  if (clubsSection) {
    if (heroSearchInput && heroSearchInput.value.trim() !== "") {
      clubSearchInput.value = heroSearchInput.value;
      currentSearchTerm = heroSearchInput.value;
      clearSearchBtn.style.display = "block";
      displayClubs();
    }
    clubsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function filterFromFooter(categoryName) {
  filterByCategory(categoryName);
  let clubsSection = document.getElementById("clubsSection");
  if (clubsSection) {
    clubsSection.scrollIntoView({ behavior: "smooth" });
  }
}


/* --------------------------------------------------------------------------
   9. CLUB DETAILS MODAL
   -------------------------------------------------------------------------- */
function openDetailModal(clubId) {
  let selectedClub = null;
  for (let i = 0; i < clubs.length; i++) {
    if (clubs[i].id === clubId) {
      selectedClub = clubs[i];
      break;
    }
  }

  if (selectedClub !== null) {
    currentDetailClub = selectedClub;

    detailIconBox.textContent = selectedClub.icon;
    detailClubCategory.textContent = selectedClub.category;
    detailClubCategory.className = "club-category-pill " + selectedClub.categoryClass;
    detailClubName.textContent = selectedClub.name;
    detailMembersCount.textContent = selectedClub.members + " students";
    detailMeetingSchedule.textContent = selectedClub.schedule;
    detailDescription.textContent = selectedClub.fullDescription;

    let activitiesHtml = "";
    if (Array.isArray(selectedClub.activities)) {
      for (let j = 0; j < selectedClub.activities.length; j++) {
        activitiesHtml += `
          <li class="detail-activity-item">
            <span class="activity-bullet">✓</span>
            <span>${selectedClub.activities[j]}</span>
          </li>
        `;
      }
    }
    detailActivitiesList.innerHTML = activitiesHtml;

    const modal = clubDetailsModal || document.getElementById("clubDetailsModal");
    if (modal) {
      modal.classList.add("active");
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  }
}

function closeDetailModal() {
  const modal = clubDetailsModal || document.getElementById("clubDetailsModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function switchToJoinFromDetails() {
  if (currentDetailClub !== null) {
    let clubName = currentDetailClub.name;
    closeDetailModal();
    openJoinModal(clubName);
  }
}


/* --------------------------------------------------------------------------
   10. JOIN CLUB REGISTRATION MODAL & SUBMISSION (Hybrid API + Standalone)
   -------------------------------------------------------------------------- */
function openJoinModal(preselectedClubName) {
  // Enforce mandatory Student Login before applying to any club
  if (!currentUser || currentUser.role !== "student") {
    pendingClubToJoin = preselectedClubName || null;
    openLoginModal("student", "Please sign in with your student credentials (Registration No, Department, Year) to apply for campus clubs!");
    return;
  }

  formErrorAlert.style.display = "none";
  formSuccessAlert.style.display = "none";
  joinClubForm.style.display = "block";

  if (submitJoinBtn) {
    submitJoinBtn.disabled = false;
    submitJoinBtn.textContent = "Submit Application";
  }

  // Pre-fill student info from authenticated student session
  if (studentNameInput) studentNameInput.value = currentUser.name || "";
  if (studentEmailInput) studentEmailInput.value = currentUser.email || "";
  if (regNumberInput) regNumberInput.value = currentUser.regNumber || "";

  const deptSelect = document.getElementById("studentDepartment");
  if (deptSelect && currentUser.department) {
    deptSelect.value = currentUser.department;
  }
  const yearSelect = document.getElementById("studentYear");
  if (yearSelect && currentUser.year) {
    yearSelect.value = currentUser.year;
  }

  if (preselectedClubName && clubSelectDropdown) {
    clubSelectDropdown.value = preselectedClubName;
  }

  const modal = joinClubModal || document.getElementById("joinClubModal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeJoinModal() {
  const modal = joinClubModal || document.getElementById("joinClubModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

async function handleJoinFormSubmit(event) {
  event.preventDefault();

  let nameValue = studentNameInput.value.trim();
  let emailValue = studentEmailInput.value.trim();
  let regValue = regNumberInput.value.trim();
  let deptValue = document.getElementById("studentDepartment") ? document.getElementById("studentDepartment").value : "Computer Science & Engineering";
  let yearValue = document.getElementById("studentYear") ? document.getElementById("studentYear").value : "2nd Year (Sophomore)";
  let clubValue = clubSelectDropdown.value;

  // Frontend validation
  let errorText = "";
  if (nameValue === "") {
    errorText = "Please enter your full name.";
  } else if (emailValue === "") {
    errorText = "Please enter your college email address.";
  } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
    errorText = "Please enter a valid email address (e.g. name@college.edu).";
  } else if (regValue === "") {
    errorText = "Please enter your university registration / roll number.";
  } else if (clubValue === "") {
    errorText = "Please select a club from the dropdown list.";
  }

  if (errorText !== "") {
    formErrorMessage.textContent = errorText;
    formErrorAlert.style.display = "flex";
    formSuccessAlert.style.display = "none";
    return;
  }

  submitJoinBtn.disabled = true;
  submitJoinBtn.textContent = "Submitting Application...";
  formErrorAlert.style.display = "none";

  // Case A: Connected to live Express REST backend
  if (isBackendOnline) {
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: nameValue,
          studentEmail: emailValue,
          regNumber: regValue,
          department: deptValue,
          year: yearValue,
          clubName: clubValue
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit registration.");
      }

      formSuccessMessage.textContent = result.message;
      completeRegistrationSuccess();
      return;
    } catch (err) {
      console.warn("Backend submit failed, trying fallback:", err);
    }
  }

  // Case B: Standalone Vercel / Client Fallback Mode
  const localRegs = getLocalRegistrations();
  const exists = localRegs.some(r => r.student_email.toLowerCase() === emailValue.toLowerCase() && r.club_name === clubValue);

  if (exists) {
    formErrorMessage.textContent = `An application for ${clubValue} using ${emailValue} already exists.`;
    formErrorAlert.style.display = "flex";
    submitJoinBtn.disabled = false;
    submitJoinBtn.textContent = "Submit Application";
    return;
  }

  const newApp = {
    id: Date.now(),
    student_name: nameValue,
    student_email: emailValue,
    reg_number: regValue,
    department: deptValue,
    year: yearValue,
    club_name: clubValue,
    status: "Pending",
    created_at: new Date().toISOString()
  };

  localRegs.unshift(newApp);
  saveLocalRegistrations(localRegs);

  formSuccessMessage.textContent = `Congratulations ${nameValue}! Your application to ${clubValue} has been submitted for review.`;
  completeRegistrationSuccess();
}

function completeRegistrationSuccess() {
  formErrorAlert.style.display = "none";
  formSuccessAlert.style.display = "flex";
  joinClubForm.style.display = "none";
  joinClubForm.reset();

  fetchStats();
  if (isBackendOnline) fetchClubs();
}


/* --------------------------------------------------------------------------
   11. ADMIN APPLICATIONS MANAGEMENT PORTAL (Hybrid API + Standalone)
   -------------------------------------------------------------------------- */
function openAdminModal() {
  // Access Control: Only allow logged-in Admin accounts
  if (!currentUser || currentUser.role !== "admin") {
    openLoginModal("admin", "Admin access required. Please sign in as an Administrator to view and manage student applications.");
    return;
  }

  const modal = adminModal || document.getElementById("adminModal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  }
  loadAdminRegistrations();
  fetchStats();
}

function closeAdminModal() {
  const modal = adminModal || document.getElementById("adminModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function showAdminToast(message, type = "success") {
  if (!adminToast) return;
  adminToast.textContent = (type === "success" ? "✓ " : type === "error" ? "⚠️ " : "ℹ️ ") + message;
  adminToast.className = `admin-toast toast-${type}`;
  adminToast.style.display = "flex";

  setTimeout(() => {
    adminToast.style.display = "none";
  }, 4000);
}

async function loadAdminRegistrations() {
  if (!adminTableBody) return;

  // Case A: Live Backend
  if (isBackendOnline) {
    try {
      const params = new URLSearchParams();
      if (adminStatusFilter !== "All") params.append("status", adminStatusFilter);
      if (adminClubFilterValue !== "All") params.append("club", adminClubFilterValue);
      if (adminSearchTerm.trim() !== "") params.append("search", adminSearchTerm.trim());

      const response = await fetch(`/api/registrations?${params.toString()}`);
      if (response.ok) {
        const res = await response.json();
        renderAdminApplications(res.data || []);
        if (res.counts) applyStatsToUI(clubs.length, clubs.reduce((acc, c) => acc + c.members, 0), res.counts);
        return;
      }
    } catch (error) {
      console.warn("API request failed, loading locally:", error);
    }
  }

  // Case B: Standalone / Vercel Local Fallback
  let localApps = getLocalRegistrations();

  if (adminClubFilterValue !== "All") {
    localApps = localApps.filter(a => a.club_name === adminClubFilterValue);
  }
  if (adminStatusFilter !== "All") {
    localApps = localApps.filter(a => a.status === adminStatusFilter);
  }
  if (adminSearchTerm.trim() !== "") {
    const term = adminSearchTerm.toLowerCase().trim();
    localApps = localApps.filter(a =>
      a.student_name.toLowerCase().includes(term) ||
      a.reg_number.toLowerCase().includes(term) ||
      a.student_email.toLowerCase().includes(term)
    );
  }

  renderAdminApplications(localApps);
}

function renderAdminApplications(applications) {
  if (applications.length === 0) {
    adminTableBody.innerHTML = "";
    adminEmptyState.style.display = "block";
    document.getElementById("adminTable").style.display = "none";
    return;
  }

  adminEmptyState.style.display = "none";
  document.getElementById("adminTable").style.display = "table";

  let rowsHtml = "";
  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    const statusClass = app.status === "Approved" ? "status-approved" : app.status === "Rejected" ? "status-rejected" : "status-pending";
    const statusIcon = app.status === "Approved" ? "✓" : app.status === "Rejected" ? "✕" : "⏳";

    const dateFormatted = new Date(app.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    let actionButtons = `
      <div class="action-btns">
        ${app.status !== 'Approved' ? `<button type="button" class="btn-action btn-approve" onclick="updateRegistrationStatus(${app.id}, 'Approved')" title="Approve Application">✓ Approve</button>` : ''}
        ${app.status !== 'Rejected' ? `<button type="button" class="btn-action btn-reject" onclick="updateRegistrationStatus(${app.id}, 'Rejected')" title="Reject Application">✕ Reject</button>` : ''}
        <button type="button" class="btn-action btn-delete" onclick="deleteRegistration(${app.id})" title="Delete Application">🗑</button>
      </div>
    `;

    rowsHtml += `
      <tr>
        <td>
          <div class="applicant-cell">
            <span class="applicant-name">${app.student_name}</span>
            <span class="applicant-email">${app.student_email}</span>
          </div>
        </td>
        <td><span class="reg-badge">${app.reg_number}</span></td>
        <td>
          <span class="dept-badge" title="${app.department || 'Computer Science & Engineering'}">${(app.department || 'CSE').replace('Computer Science & Engineering', 'CSE').replace('Electronics & Communication', 'ECE').replace('Information Technology', 'IT').replace('Mechanical Engineering', 'ME').replace('Civil Engineering', 'CE').replace('Electrical Engineering', 'EE').replace('Business Administration', 'BBA')}</span>
          <br><small style="color: var(--text-muted); font-size: 0.75rem;">${app.year || '2nd Year'}</small>
        </td>
        <td><strong>${app.club_name}</strong></td>
        <td style="white-space: nowrap; color: var(--text-muted); font-size: 0.82rem;">${dateFormatted}</td>
        <td>
          <span class="status-pill ${statusClass}">
            <span>${statusIcon}</span> ${app.status}
          </span>
        </td>
        <td>${actionButtons}</td>
      </tr>
    `;
  }

  adminTableBody.innerHTML = rowsHtml;
}

async function updateRegistrationStatus(id, newStatus) {
  if (isBackendOnline) {
    try {
      const response = await fetch(`/api/registrations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const res = await response.json();
      if (response.ok && res.success) {
        showAdminToast(res.message, newStatus === "Approved" ? "success" : "info");
        loadAdminRegistrations();
        fetchStats();
        fetchClubs();
        return;
      }
    } catch (e) {
      console.warn("Backend update failed, using local update.");
    }
  }

  // Local fallback
  const localRegs = getLocalRegistrations();
  const target = localRegs.find(r => r.id === id);
  if (target) {
    const prevStatus = target.status;
    target.status = newStatus;
    saveLocalRegistrations(localRegs);

    // Sync member count
    const localClubs = getLocalClubs();
    const club = localClubs.find(c => c.name === target.club_name);
    if (club) {
      if (prevStatus !== "Approved" && newStatus === "Approved") {
        club.members += 1;
      } else if (prevStatus === "Approved" && newStatus !== "Approved") {
        club.members = Math.max(0, club.members - 1);
      }
      saveLocalClubs(localClubs);
      clubs = localClubs;
      displayClubs();
    }

    showAdminToast(`Application for ${target.student_name} (${target.club_name}) set to '${newStatus}'.`, newStatus === "Approved" ? "success" : "info");
    loadAdminRegistrations();
    fetchStats();
  }
}

async function deleteRegistration(id) {
  if (!confirm("Are you sure you want to delete this application record?")) return;

  if (isBackendOnline) {
    try {
      const response = await fetch(`/api/registrations/${id}`, { method: "DELETE" });
      const res = await response.json();
      if (response.ok && res.success) {
        showAdminToast(res.message, "info");
        loadAdminRegistrations();
        fetchStats();
        fetchClubs();
        return;
      }
    } catch (e) {
      console.warn("Backend delete failed, using local delete.");
    }
  }

  // Local fallback
  let localRegs = getLocalRegistrations();
  const target = localRegs.find(r => r.id === id);
  if (target) {
    if (target.status === "Approved") {
      const localClubs = getLocalClubs();
      const club = localClubs.find(c => c.name === target.club_name);
      if (club) {
        club.members = Math.max(0, club.members - 1);
        saveLocalClubs(localClubs);
        clubs = localClubs;
        displayClubs();
      }
    }
    localRegs = localRegs.filter(r => r.id !== id);
    saveLocalRegistrations(localRegs);

    showAdminToast(`Application for ${target.student_name} was removed.`, "info");
    loadAdminRegistrations();
    fetchStats();
  }
}


/* --------------------------------------------------------------------------
   12. AUTHENTICATION & ROLE MANAGEMENT (Student & Admin)
   -------------------------------------------------------------------------- */
function updateAuthUI() {
  if (currentUser) {
    if (navSignInBtn) navSignInBtn.style.display = "none";
    if (navUserPill) navUserPill.style.display = "inline-flex";
    if (navUserName) navUserName.textContent = currentUser.name || "User";
    if (navUserRole) navUserRole.textContent = currentUser.role === "admin" ? "🛡️ Admin" : "🎓 Student";
    if (navUserAvatar) navUserAvatar.textContent = currentUser.role === "admin" ? "🛡️" : "🎓";

    if (currentUser.role === "admin") {
      if (navAdminBtn) navAdminBtn.style.display = "inline-flex";
      if (navStudentAppsBtn) navStudentAppsBtn.style.display = "none";
    } else {
      if (navAdminBtn) navAdminBtn.style.display = "none";
      if (navStudentAppsBtn) navStudentAppsBtn.style.display = "inline-flex";
    }
  } else {
    if (navSignInBtn) navSignInBtn.style.display = "inline-flex";
    if (navUserPill) navUserPill.style.display = "none";
    if (navStudentAppsBtn) navStudentAppsBtn.style.display = "none";
    if (navAdminBtn) navAdminBtn.style.display = "none";
  }
}

function handleAdminNavClick() {
  if (currentUser && currentUser.role === "admin") {
    openAdminModal();
  } else {
    openLoginModal("admin", "Admin access required to view and manage student registrations.");
  }
}

function openLoginModal(role = "student", noticeMessage = "") {
  const modal = loginModal || document.getElementById("loginModal");
  if (!modal) {
    console.error("loginModal element not found in DOM.");
    return;
  }

  setLoginRole(role);

  const errorAlert = loginErrorAlert || document.getElementById("loginErrorAlert");
  const errorMsg = loginErrorMessage || document.getElementById("loginErrorMessage");
  if (errorAlert) {
    if (noticeMessage) {
      if (errorMsg) errorMsg.textContent = noticeMessage;
      errorAlert.style.display = "flex";
    } else {
      errorAlert.style.display = "none";
    }
  }

  const successAlert = loginSuccessAlert || document.getElementById("loginSuccessAlert");
  if (successAlert) successAlert.style.display = "none";

  modal.classList.add("active");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function closeLoginModal() {
  const modal = loginModal || document.getElementById("loginModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function setLoginRole(role) {
  currentLoginRole = role;

  const roleTabs = loginRoleTabs || document.getElementById("loginRoleTabs");
  if (roleTabs) {
    const tabs = roleTabs.querySelectorAll(".role-tab");
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute("data-role") === role) {
        tabs[i].classList.add("active");
      } else {
        tabs[i].classList.remove("active");
      }
    }
  }

  const rolePill = loginRolePill || document.getElementById("loginRolePill");
  const modalTitle = loginModalTitle || document.getElementById("loginModalTitle");
  const emailLabel = loginEmailLabel || document.getElementById("loginEmailLabel");
  const emailInput = loginEmail || document.getElementById("loginEmail");
  const submitBtn = loginSubmitBtn || document.getElementById("loginSubmitBtn");
  const studentFields = document.getElementById("studentAuthFields");

  if (role === "admin") {
    if (studentFields) studentFields.style.display = "none";
    if (rolePill) {
      rolePill.textContent = "Club Lead & Staff Access";
      rolePill.className = "club-category-pill cat-biz";
    }
    if (modalTitle) modalTitle.textContent = "Club Admin Sign In";
    if (emailLabel) emailLabel.innerHTML = 'Admin Email <span class="required-star">*</span>';
    if (emailInput) {
      emailInput.placeholder = "admin@campus.edu";
      emailInput.value = "admin@campus.edu";
    }
    if (loginPassword) loginPassword.value = "admin123";
    if (submitBtn) submitBtn.textContent = "Sign In as Administrator";
  } else {
    if (studentFields) studentFields.style.display = "block";
    if (rolePill) {
      rolePill.textContent = "Campus Student Portal";
      rolePill.className = "club-category-pill cat-tech";
    }
    if (modalTitle) modalTitle.textContent = "Student Sign In";
    if (emailLabel) emailLabel.innerHTML = 'College Email <span class="required-star">*</span>';
    if (emailInput) {
      emailInput.placeholder = "e.g. aarav.sharma@campus.edu";
      if (!emailInput.value || emailInput.value === "admin@campus.edu") {
        emailInput.value = "aarav.sharma@campus.edu";
      }
    }
    if (loginPassword && (!loginPassword.value || loginPassword.value === "admin123")) {
      loginPassword.value = "student123";
    }
    if (submitBtn) submitBtn.textContent = "Sign In as Student";
  }
}

function useDemoLogin(role) {
  setLoginRole(role === "admin" ? "admin" : "student");

  const sName = document.getElementById("loginStudentName");
  const sReg = document.getElementById("loginRegNumber");
  const sDept = document.getElementById("loginDepartment");
  const sYear = document.getElementById("loginYear");

  if (role === "admin") {
    if (loginEmail) loginEmail.value = "admin@campus.edu";
    if (loginPassword) loginPassword.value = "admin123";
  } else if (role === "student2") {
    if (sName) sName.value = "Priya Nair";
    if (sReg) sReg.value = "2024EC2105";
    if (sDept) sDept.value = "Electronics & Communication";
    if (sYear) sYear.value = "1st Year (Freshman)";
    if (loginEmail) loginEmail.value = "priya.nair@campus.edu";
    if (loginPassword) loginPassword.value = "student123";
  } else {
    // Default student (Aarav)
    if (sName) sName.value = "Aarav Sharma";
    if (sReg) sReg.value = "2024CS1042";
    if (sDept) sDept.value = "Computer Science & Engineering";
    if (sYear) sYear.value = "2nd Year (Sophomore)";
    if (loginEmail) loginEmail.value = "aarav.sharma@campus.edu";
    if (loginPassword) loginPassword.value = "student123";
  }
  handleLoginSubmit(new Event("submit"));
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈 Hide";
  } else {
    input.type = "password";
    btn.textContent = "👁️ Show";
  }
}

async function handleLoginSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();

  const emailVal = loginEmail ? loginEmail.value.trim() : "";
  const passwordVal = loginPassword ? loginPassword.value.trim() : "";

  const studentNameInput = document.getElementById("loginStudentName");
  const studentRegInput = document.getElementById("loginRegNumber");
  const studentDeptInput = document.getElementById("loginDepartment");
  const studentYearInput = document.getElementById("loginYear");

  const nameVal = studentNameInput ? studentNameInput.value.trim() : "";
  const regVal = studentRegInput ? studentRegInput.value.trim().toUpperCase() : "";
  const deptVal = studentDeptInput ? studentDeptInput.value : "Computer Science & Engineering";
  const yearVal = studentYearInput ? studentYearInput.value : "2nd Year (Sophomore)";

  if (!emailVal || !passwordVal) {
    if (loginErrorMessage) loginErrorMessage.textContent = "Please enter both email and password.";
    if (loginErrorAlert) loginErrorAlert.style.display = "flex";
    return;
  }

  if (currentLoginRole === "student") {
    if (!nameVal) {
      if (loginErrorMessage) loginErrorMessage.textContent = "Please enter your full student name.";
      if (loginErrorAlert) loginErrorAlert.style.display = "flex";
      return;
    }
    if (!regVal) {
      if (loginErrorMessage) loginErrorMessage.textContent = "Please enter your university roll / registration number.";
      if (loginErrorAlert) loginErrorAlert.style.display = "flex";
      return;
    }
  }

  if (loginSubmitBtn) {
    loginSubmitBtn.disabled = true;
    loginSubmitBtn.textContent = "Signing In...";
  }

  // 1. Try Live Express REST Backend API
  if (isBackendOnline) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailVal,
          password: passwordVal,
          role: currentLoginRole,
          name: nameVal,
          regNumber: regVal,
          department: deptVal,
          year: yearVal
        })
      });

      const result = await response.json();
      if (response.ok && result.success && result.user) {
        completeLoginSuccess(result.user);
        return;
      }
      throw new Error(result.message || "Invalid credentials.");
    } catch (err) {
      console.warn("Backend auth failed, checking fallback:", err);
      // Fallback allowed if offline/Vercel
      if (isBackendOnline) {
        if (loginErrorMessage) loginErrorMessage.textContent = err.message;
        if (loginErrorAlert) loginErrorAlert.style.display = "flex";
        if (loginSubmitBtn) {
          loginSubmitBtn.disabled = false;
          loginSubmitBtn.textContent = currentLoginRole === "admin" ? "Sign In as Administrator" : "Sign In as Student";
        }
        return;
      }
    }
  }

  // 2. Client-side / Vercel Standalone Fallback Validation
  if (currentLoginRole === "admin") {
    if (emailVal.toLowerCase() === "admin@campus.edu" && passwordVal === "admin123") {
      completeLoginSuccess({
        id: "admin_demo",
        name: "Campus Administrator",
        email: "admin@campus.edu",
        role: "admin"
      });
      return;
    } else {
      if (loginErrorMessage) loginErrorMessage.textContent = "Invalid Admin login. Use admin@campus.edu / admin123";
      if (loginErrorAlert) loginErrorAlert.style.display = "flex";
      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = false;
        loginSubmitBtn.textContent = "Sign In as Administrator";
      }
      return;
    }
  } else {
    // Student Fallback - Aarav
    if (emailVal.toLowerCase() === "aarav.sharma@campus.edu" && passwordVal === "student123") {
      completeLoginSuccess({
        id: "student_demo",
        name: nameVal || "Aarav Sharma",
        email: "aarav.sharma@campus.edu",
        regNumber: regVal || "2024CS1042",
        department: deptVal || "Computer Science & Engineering",
        year: yearVal || "2nd Year (Sophomore)",
        role: "student"
      });
      return;
    }

    // Student Fallback - Priya
    if (emailVal.toLowerCase() === "priya.nair@campus.edu" && passwordVal === "student123") {
      completeLoginSuccess({
        id: "student_demo_2",
        name: nameVal || "Priya Nair",
        email: "priya.nair@campus.edu",
        regNumber: regVal || "2024EC2105",
        department: deptVal || "Electronics & Communication",
        year: yearVal || "1st Year (Freshman)",
        role: "student"
      });
      return;
    }

    // Any valid student credentials
    if (emailVal.includes("@") && passwordVal.length >= 4) {
      const parsedName = nameVal || (emailVal.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()));
      completeLoginSuccess({
        id: "student_" + Date.now(),
        name: parsedName,
        email: emailVal,
        regNumber: regVal || ("2024CAMPUS" + Math.floor(1000 + Math.random() * 9000)),
        department: deptVal,
        year: yearVal,
        role: "student"
      });
      return;
    }

    if (loginErrorMessage) loginErrorMessage.textContent = "Password must be at least 4 characters.";
    if (loginErrorAlert) loginErrorAlert.style.display = "flex";
    if (loginSubmitBtn) {
      loginSubmitBtn.disabled = false;
      loginSubmitBtn.textContent = "Sign In as Student";
    }
  }
}

function completeLoginSuccess(user) {
  currentUser = user;
  localStorage.setItem("campus_auth_user", JSON.stringify(user));

  if (loginErrorAlert) loginErrorAlert.style.display = "none";
  if (loginSuccessAlert) {
    if (loginSuccessMessage) loginSuccessMessage.textContent = `Welcome, ${user.name}!`;
    loginSuccessAlert.style.display = "flex";
  }

  setTimeout(() => {
    closeLoginModal();
    updateAuthUI();

    if (user.role === "admin") {
      openAdminModal();
    } else {
      showAdminToast(`Signed in as ${user.name} (${user.regNumber || 'Student'})`, "success");
      // Seamless auto-resume: if user was trying to join a club, open the modal with their info pre-filled!
      if (pendingClubToJoin) {
        const clubToOpen = pendingClubToJoin;
        pendingClubToJoin = null;
        openJoinModal(clubToOpen);
      }
    }

    if (loginSubmitBtn) {
      loginSubmitBtn.disabled = false;
      loginSubmitBtn.textContent = user.role === "admin" ? "Sign In as Administrator" : "Sign In as Student";
    }
  }, 600);
}

function handleLogout() {
  const prevName = currentUser ? currentUser.name : "User";
  currentUser = null;
  localStorage.removeItem("campus_auth_user");
  closeAdminModal();
  closeStudentAppsModal();
  updateAuthUI();
  showAdminToast(`Signed out successfully. See you soon, ${prevName}!`, "info");
}


/* --------------------------------------------------------------------------
   13. STUDENT DASHBOARD / MY APPLICATIONS MODAL
   -------------------------------------------------------------------------- */
async function openStudentAppsModal() {
  // Guard: Only allow logged-in students
  if (!currentUser || currentUser.role !== "student") {
    openLoginModal("student", "Please sign in with your student account to view your club applications.");
    return;
  }

  const modal = studentAppsModal || document.getElementById("studentAppsModal");
  if (!modal) return;

  modal.classList.add("active");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");

  const tableBody = studentAppsTableBody || document.getElementById("studentAppsTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = `
    <tr>
      <td colspan="4" style="text-align: center; padding: 2rem; color: var(--text-muted);">
        Loading your applications...
      </td>
    </tr>
  `;

  let apps = [];

  if (isBackendOnline) {
    try {
      const response = await fetch(`/api/registrations?search=${encodeURIComponent(currentUser.email)}`);
      if (response.ok) {
        const res = await response.json();
        apps = (res.data || []).filter(a => a.student_email.toLowerCase() === currentUser.email.toLowerCase());
      }
    } catch (e) {
      console.warn("Could not fetch student apps from API:", e);
    }
  }

  if (apps.length === 0) {
    const localRegs = getLocalRegistrations();
    apps = localRegs.filter(a => a.student_email.toLowerCase() === currentUser.email.toLowerCase());
  }

  const emptyState = studentAppsEmptyState || document.getElementById("studentAppsEmptyState");
  const appsTable = document.getElementById("studentAppsTable");

  if (apps.length === 0) {
    tableBody.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (appsTable) appsTable.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (appsTable) appsTable.style.display = "table";

  let rowsHtml = "";
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    const statusClass = app.status === "Approved" ? "status-approved" : app.status === "Rejected" ? "status-rejected" : "status-pending";
    const statusIcon = app.status === "Approved" ? "✓" : app.status === "Rejected" ? "✕" : "⏳";
    const dateFormatted = new Date(app.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    rowsHtml += `
      <tr>
        <td><strong>${app.club_name}</strong></td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${dateFormatted}</td>
        <td><span class="reg-badge">${app.reg_number}</span></td>
        <td>
          <span class="status-pill ${statusClass}">
            <span>${statusIcon}</span> ${app.status}
          </span>
        </td>
      </tr>
    `;
  }

  tableBody.innerHTML = rowsHtml;
}

function closeStudentAppsModal() {
  const modal = studentAppsModal || document.getElementById("studentAppsModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}


/* --------------------------------------------------------------------------
   14. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function toggleMobileMenu() {
  navLinks.classList.toggle("active");
}

function handleNavLinkClick() {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
}


/* --------------------------------------------------------------------------
   15. APPLICATION INITIALIZATION & EVENT LISTENERS
   -------------------------------------------------------------------------- */
async function initializeApp() {
  // 1. Initial live data fetch (with automatic Vercel fallback)
  await fetchClubs();
  updateAuthUI();

  // 2. Category button clicks
  let categoryButtons = categoryContainer.querySelectorAll(".category-btn");
  for (let i = 0; i < categoryButtons.length; i++) {
    let button = categoryButtons[i];
    button.addEventListener("click", function() {
      let category = this.getAttribute("data-category");
      filterByCategory(category);
    });
  }

  // 3. Search inputs
  if (clubSearchInput) clubSearchInput.addEventListener("input", handleSearchInput);
  if (heroSearchInput) heroSearchInput.addEventListener("input", handleSearchInput);
  if (clearSearchBtn) clearSearchBtn.addEventListener("click", clearSearch);

  // 4. Mobile hamburger menu
  if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleMobileMenu);

  // 5. Close mobile menu on nav click
  let navItems = navLinks.querySelectorAll(".nav-link");
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", handleNavLinkClick);
  }

  // 6. Admin Portal Status Tabs
  if (adminStatusTabs) {
    const tabs = adminStatusTabs.querySelectorAll(".status-tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function() {
        for (let j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
        this.classList.add("active");
        adminStatusFilter = this.getAttribute("data-status");
        loadAdminRegistrations();
      });
    }
  }

  // 7. Admin Club Dropdown Filter
  if (adminClubFilter) {
    adminClubFilter.addEventListener("change", function() {
      adminClubFilterValue = this.value;
      loadAdminRegistrations();
    });
  }

  // 8. Admin Search Input
  if (adminSearchInput) {
    adminSearchInput.addEventListener("input", function(e) {
      adminSearchTerm = e.target.value;
      loadAdminRegistrations();
    });
  }

  // 9. Close modals on background overlay click
  window.addEventListener("click", function(event) {
    if (event.target === clubDetailsModal || event.target.id === "clubDetailsModal") closeDetailModal();
    if (event.target === joinClubModal || event.target.id === "joinClubModal") closeJoinModal();
    if (event.target === adminModal || event.target.id === "adminModal") closeAdminModal();
    if (event.target === loginModal || event.target.id === "loginModal") closeLoginModal();
    if (event.target === studentAppsModal || event.target.id === "studentAppsModal") closeStudentAppsModal();
  });

  // 10. Close modals on Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeDetailModal();
      closeJoinModal();
      closeAdminModal();
      closeLoginModal();
      closeStudentAppsModal();
    }
  });
}

// Boot application
window.addEventListener("DOMContentLoaded", initializeApp);
