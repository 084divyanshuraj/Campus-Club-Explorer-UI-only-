/**
 * Seed data for CampusConnect clubs and initial demo registrations.
 */

const initialClubs = [
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

const sampleRegistrations = [
  {
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

module.exports = { initialClubs, sampleRegistrations };

