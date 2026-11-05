/* ==========================================================================
   CampusConnect - Campus Club Explorer
   Frontend Application Script (Full REST API Backend Integration)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. GLOBAL STATE & DATA STORAGE
   Clubs and stats are loaded asynchronously from the Express REST API.
   -------------------------------------------------------------------------- */
let clubs = [];
let currentCategory = "All Clubs";
let currentSearchTerm = "";
let currentDetailClub = null;

// Admin Portal State
let adminStatusFilter = "All";
let adminClubFilterValue = "All";
let adminSearchTerm = "";

/* --------------------------------------------------------------------------
   2. DOM ELEMENT REFERENCES
   -------------------------------------------------------------------------- */
// Club Catalog & Search
let clubsGrid = document.getElementById("clubsGrid");
let resultsCount = document.getElementById("resultsCount");
let noResultsMessage = document.getElementById("noResultsMessage");
let clubSearchInput = document.getElementById("clubSearchInput");
let heroSearchInput = document.getElementById("heroSearchInput");
let clearSearchBtn = document.getElementById("clearSearchBtn");
let categoryContainer = document.getElementById("categoryContainer");

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

// Hero Stats Elements
let heroStatClubs = document.getElementById("heroStatClubs");
let heroStatMembers = document.getElementById("heroStatMembers");

// Mobile Navigation
let hamburgerBtn = document.getElementById("hamburgerBtn");
let navLinks = document.getElementById("navLinks");


/* --------------------------------------------------------------------------
   3. API CLIENT: FETCH CLUBS FROM BACKEND
   Retrieves club list from GET /api/clubs
   -------------------------------------------------------------------------- */
async function fetchClubs() {
  try {
    // Show loading state if grid is currently empty
    if (!clubsGrid.hasChildNodes() || clubs.length === 0) {
      clubsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem; animation: pulseBadge 1.5s infinite;">⚡</div>
          <p style="font-weight: 600;">Connecting to CampusConnect Backend...</p>
        </div>
      `;
    }

    const response = await fetch('/api/clubs');
    if (!response.ok) {
      throw new Error(`Failed to load clubs (HTTP ${response.status})`);
    }

    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      clubs = data.data;
      displayClubs();
      populateClubDropdowns();
    }
  } catch (error) {
    console.error("Error fetching clubs from API:", error);
    clubsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1.5rem; background: #fff; border-radius: 12px; border: 1px solid var(--danger-border);">
        <p style="color: var(--danger); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">⚠️ Could not connect to backend server</p>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Make sure the Express server is running at <code>http://localhost:5000</code>.</p>
        <button type="button" class="btn btn-secondary" style="margin-top: 1rem;" onclick="fetchClubs()">Try Again</button>
      </div>
    `;
  }
}

/* --------------------------------------------------------------------------
   4. API CLIENT: FETCH SYSTEM & APPLICATION STATS
   Retrieves KPI metrics from GET /api/stats
   -------------------------------------------------------------------------- */
async function fetchStats() {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) return;

    const res = await response.json();
    if (res.success && res.data) {
      const { totalClubs, totalMembers, registrations } = res.data;

      // Update hero counters
      if (heroStatClubs) heroStatClubs.textContent = `${totalClubs}+`;
      if (heroStatMembers) heroStatMembers.textContent = `${Number(totalMembers).toLocaleString()}+`;

      // Update Admin badge count (pending applications)
      if (adminBadgeCount) {
        const pending = registrations.pending || 0;
        adminBadgeCount.textContent = pending;
        if (pending > 0) {
          adminBadgeCount.classList.add("has-pending");
        } else {
          adminBadgeCount.classList.remove("has-pending");
        }
      }

      // Update Admin KPI cards
      if (kpiTotalApps) kpiTotalApps.textContent = registrations.total || 0;
      if (kpiPendingApps) kpiPendingApps.textContent = registrations.pending || 0;
      if (kpiApprovedApps) kpiApprovedApps.textContent = registrations.approved || 0;
      if (kpiRejectedApps) kpiRejectedApps.textContent = registrations.rejected || 0;
    }
  } catch (error) {
    console.warn("Could not sync stats with API:", error);
  }
}

/* --------------------------------------------------------------------------
   5. FUNCTION: POPULATE DROPDOWNS DYNAMICALLY
   Keeps the join form dropdown & admin filter aligned with live clubs.
   -------------------------------------------------------------------------- */
function populateClubDropdowns() {
  if (!clubSelectDropdown) return;

  // Preserve any currently selected value
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
   6. FUNCTION: DISPLAY CLUB CARDS
   Filters live clubs by selected category and active search term.
   -------------------------------------------------------------------------- */
function displayClubs() {
  let cardsHtml = "";
  let matchingCount = 0;

  for (let i = 0; i < clubs.length; i++) {
    let club = clubs[i];

    // Category matching
    let matchesCategory = false;
    if (currentCategory === "All Clubs" || club.category === currentCategory) {
      matchesCategory = true;
    }

    // Search term matching
    let matchesSearch = false;
    let nameLower = club.name.toLowerCase();
    let categoryLower = club.category.toLowerCase();
    let descLower = (club.description || "").toLowerCase();
    let searchLower = currentSearchTerm.toLowerCase().trim();

    if (searchLower === "" || nameLower.includes(searchLower) || categoryLower.includes(searchLower) || descLower.includes(searchLower)) {
      matchesSearch = true;
    }

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

  // Inject cards into DOM
  clubsGrid.innerHTML = cardsHtml;

  // Update results counter
  resultsCount.textContent = matchingCount + (matchingCount === 1 ? " club found" : " clubs found");

  // Show or hide empty state
  if (matchingCount === 0) {
    noResultsMessage.style.display = "block";
    clubsGrid.style.display = "none";
  } else {
    noResultsMessage.style.display = "none";
    clubsGrid.style.display = "grid";
  }
}

/* --------------------------------------------------------------------------
   7. FILTERING & SEARCH HANDLERS
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

  // Sync both search bars
  if (event.target === clubSearchInput && heroSearchInput) {
    heroSearchInput.value = currentSearchTerm;
  } else if (event.target === heroSearchInput && clubSearchInput) {
    clubSearchInput.value = currentSearchTerm;
  }

  // Toggle clear button
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
   8. CLUB DETAILS MODAL
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

    clubDetailsModal.classList.add("active");
    clubDetailsModal.setAttribute("aria-hidden", "false");
  }
}

function closeDetailModal() {
  clubDetailsModal.classList.remove("active");
  clubDetailsModal.setAttribute("aria-hidden", "true");
}

function switchToJoinFromDetails() {
  if (currentDetailClub !== null) {
    let clubName = currentDetailClub.name;
    closeDetailModal();
    openJoinModal(clubName);
  }
}


/* --------------------------------------------------------------------------
   9. JOIN CLUB REGISTRATION MODAL & SUBMISSION (POST /api/registrations)
   -------------------------------------------------------------------------- */
function openJoinModal(preselectedClubName) {
  formErrorAlert.style.display = "none";
  formSuccessAlert.style.display = "none";
  joinClubForm.style.display = "block";

  if (submitJoinBtn) {
    submitJoinBtn.disabled = false;
    submitJoinBtn.textContent = "Submit Application";
  }

  if (preselectedClubName && clubSelectDropdown) {
    clubSelectDropdown.value = preselectedClubName;
  }

  joinClubModal.classList.add("active");
  joinClubModal.setAttribute("aria-hidden", "false");
}

function closeJoinModal() {
  joinClubModal.classList.remove("active");
  joinClubModal.setAttribute("aria-hidden", "true");
}

async function handleJoinFormSubmit(event) {
  event.preventDefault();

  let nameValue = studentNameInput.value.trim();
  let emailValue = studentEmailInput.value.trim();
  let regValue = regNumberInput.value.trim();
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

  // Show loading state
  submitJoinBtn.disabled = true;
  submitJoinBtn.textContent = "Submitting Application...";
  formErrorAlert.style.display = "none";

  try {
    const response = await fetch('/api/registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        studentName: nameValue,
        studentEmail: emailValue,
        regNumber: regValue,
        clubName: clubValue
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to submit registration.");
    }

    // Success response
    formErrorAlert.style.display = "none";
    formSuccessMessage.textContent = result.message;
    formSuccessAlert.style.display = "flex";
    joinClubForm.style.display = "none";
    joinClubForm.reset();

    // Refresh KPI metrics & live club data
    fetchStats();
    fetchClubs();

  } catch (err) {
    console.error("Registration error:", err);
    formErrorMessage.textContent = err.message || "An error occurred while submitting. Please try again.";
    formErrorAlert.style.display = "flex";
    submitJoinBtn.disabled = false;
    submitJoinBtn.textContent = "Submit Application";
  }
}


/* --------------------------------------------------------------------------
   10. ADMIN APPLICATIONS MANAGEMENT PORTAL
   -------------------------------------------------------------------------- */
function openAdminModal() {
  adminModal.classList.add("active");
  adminModal.setAttribute("aria-hidden", "false");
  loadAdminRegistrations();
  fetchStats();
}

function closeAdminModal() {
  adminModal.classList.remove("active");
  adminModal.setAttribute("aria-hidden", "true");
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

  adminTableBody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
        Loading applications from SQLite database...
      </td>
    </tr>
  `;

  try {
    const params = new URLSearchParams();
    if (adminStatusFilter !== "All") params.append("status", adminStatusFilter);
    if (adminClubFilterValue !== "All") params.append("club", adminClubFilterValue);
    if (adminSearchTerm.trim() !== "") params.append("search", adminSearchTerm.trim());

    const response = await fetch(`/api/registrations?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch applications.");

    const res = await response.json();
    const applications = res.data || [];

    // Update KPI counters
    if (res.counts) {
      if (kpiTotalApps) kpiTotalApps.textContent = res.counts.total;
      if (kpiPendingApps) kpiPendingApps.textContent = res.counts.pending;
      if (kpiApprovedApps) kpiApprovedApps.textContent = res.counts.approved;
      if (kpiRejectedApps) kpiRejectedApps.textContent = res.counts.rejected;
      if (adminBadgeCount) {
        adminBadgeCount.textContent = res.counts.pending;
        if (res.counts.pending > 0) adminBadgeCount.classList.add("has-pending");
        else adminBadgeCount.classList.remove("has-pending");
      }
    }

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

      // Action buttons based on current status
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

  } catch (error) {
    console.error("Error loading registrations:", error);
    adminTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--danger);">
          Error connecting to registrations database.
        </td>
      </tr>
    `;
  }
}

async function updateRegistrationStatus(id, newStatus) {
  try {
    const response = await fetch(`/api/registrations/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    const res = await response.json();
    if (!response.ok || !res.success) {
      throw new Error(res.message || "Failed to update status.");
    }

    showAdminToast(res.message, newStatus === "Approved" ? "success" : "info");
    
    // Refresh table, global stats & clubs to reflect member count changes
    loadAdminRegistrations();
    fetchStats();
    fetchClubs();

  } catch (error) {
    showAdminToast(error.message, "error");
  }
}

async function deleteRegistration(id) {
  if (!confirm("Are you sure you want to delete this application record?")) {
    return;
  }

  try {
    const response = await fetch(`/api/registrations/${id}`, {
      method: "DELETE"
    });

    const res = await response.json();
    if (!response.ok || !res.success) {
      throw new Error(res.message || "Failed to delete application.");
    }

    showAdminToast(res.message, "info");
    loadAdminRegistrations();
    fetchStats();
    fetchClubs();

  } catch (error) {
    showAdminToast(error.message, "error");
  }
}


/* --------------------------------------------------------------------------
   11. MOBILE NAVIGATION
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
   12. APPLICATION INITIALIZATION & EVENT LISTENERS
   -------------------------------------------------------------------------- */
function initializeApp() {
  // 1. Initial live data fetch
  fetchClubs();
  fetchStats();

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
    if (event.target === clubDetailsModal) closeDetailModal();
    if (event.target === joinClubModal) closeJoinModal();
    if (event.target === adminModal) closeAdminModal();
  });

  // 10. Close modals on Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeDetailModal();
      closeJoinModal();
      closeAdminModal();
    }
  });
}

// Boot application
window.addEventListener("DOMContentLoaded", initializeApp);
