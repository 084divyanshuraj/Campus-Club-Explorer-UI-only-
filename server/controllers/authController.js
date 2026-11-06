/**
 * Authentication Controller
 * Handles user login & registration (Student & Admin) with zero-friction demo support
 */
const { db } = require('../config/db');

const DEMO_USERS = {
  admin: {
    id: 'admin_1',
    name: 'Campus Administrator',
    email: 'admin@campus.edu',
    role: 'admin',
    password: 'admin123'
  },
  student: {
    id: 'student_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    regNumber: '2024CS1042',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    role: 'student',
    password: 'student123'
  },
  student2: {
    id: 'student_2',
    name: 'Priya Nair',
    email: 'priya.nair@campus.edu',
    regNumber: '2024EC2105',
    department: 'Electronics & Communication',
    year: '1st Year',
    role: 'student',
    password: 'student123'
  }
};

/**
 * @desc   Authenticate user (Student or Admin)
 * @route  POST /api/auth/login
 */
exports.login = (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const targetRole = role || (trimmedEmail.includes('admin') ? 'admin' : 'student');

    // 1. Admin Verification
    if (targetRole === 'admin') {
      if (trimmedEmail === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
        return res.json({
          success: true,
          message: 'Admin authentication successful.',
          user: {
            id: DEMO_USERS.admin.id,
            name: DEMO_USERS.admin.name,
            email: DEMO_USERS.admin.email,
            role: 'admin'
          }
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials. Use admin@campus.edu / admin123'
      });
    }

    // 2. Student Verification
    if (targetRole === 'student') {
      // Check database registered users table first
      try {
        const dbUser = db.prepare('SELECT * FROM users WHERE LOWER(email) = ? AND password = ?').get(trimmedEmail, password);
        if (dbUser) {
          return res.json({
            success: true,
            message: `Welcome back, ${dbUser.name}!`,
            user: {
              id: 'student_' + dbUser.id,
              name: dbUser.name,
              email: dbUser.email,
              regNumber: dbUser.reg_number,
              department: dbUser.department,
              year: dbUser.year,
              role: dbUser.role
            }
          });
        }
      } catch (err) {
        console.warn('DB user query fallback:', err.message);
      }

      // Demo student match
      if (trimmedEmail === DEMO_USERS.student.email && password === DEMO_USERS.student.password) {
        return res.json({
          success: true,
          message: `Welcome back, ${DEMO_USERS.student.name}!`,
          user: {
            id: DEMO_USERS.student.id,
            name: DEMO_USERS.student.name,
            email: DEMO_USERS.student.email,
            regNumber: DEMO_USERS.student.regNumber,
            department: DEMO_USERS.student.department,
            year: DEMO_USERS.student.year,
            role: 'student'
          }
        });
      }

      // Demo student 2 match (Priya Nair)
      if (trimmedEmail === DEMO_USERS.student2.email && password === DEMO_USERS.student2.password) {
        return res.json({
          success: true,
          message: `Welcome back, ${DEMO_USERS.student2.name}!`,
          user: {
            id: DEMO_USERS.student2.id,
            name: DEMO_USERS.student2.name,
            email: DEMO_USERS.student2.email,
            regNumber: DEMO_USERS.student2.regNumber,
            department: DEMO_USERS.student2.department,
            year: DEMO_USERS.student2.year,
            role: 'student'
          }
        });
      }

      // Allow any valid college email format for student exploration
      if (trimmedEmail.includes('@') && password.length >= 4) {
        const studentName = (req.body.name || trimmedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).trim();
        const regNumber = (req.body.regNumber || '2024CAMPUS' + Math.floor(1000 + Math.random() * 9000)).trim().toUpperCase();
        const department = (req.body.department || 'Computer Science & Engineering').trim();
        const year = (req.body.year || '2nd Year').trim();

        return res.json({
          success: true,
          message: `Welcome, ${studentName}!`,
          user: {
            id: 'student_' + Date.now(),
            name: studentName,
            email: trimmedEmail,
            regNumber,
            department,
            year,
            role: 'student'
          }
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password must be at least 4 characters.'
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid role specified.' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
};

/**
 * @desc   Register a new Student Account
 * @route  POST /api/auth/register
 */
exports.register = (req, res) => {
  try {
    const name = (req.body.name || req.body.studentName || '').trim();
    const email = (req.body.email || req.body.studentEmail || '').trim().toLowerCase();
    const password = (req.body.password || '').trim();
    const regNumber = (req.body.regNumber || req.body.reg_number || '').trim().toUpperCase();
    const department = (req.body.department || 'Computer Science & Engineering').trim();
    const year = (req.body.year || '2nd Year (Sophomore)').trim();

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide your full student name.' });
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid college email address.' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters long.' });
    }
    if (!regNumber) {
      return res.status(400).json({ success: false, message: 'University registration / roll number is required.' });
    }

    // Check if user already exists
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = ?').get(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.'
      });
    }

    const insertStmt = db.prepare(`
      INSERT INTO users (name, email, password, reg_number, department, year, role)
      VALUES (?, ?, ?, ?, ?, ?, 'student')
    `);
    const result = insertStmt.run(name, email, password, regNumber, department, year);

    const newUser = {
      id: 'student_' + result.lastInsertRowid,
      name,
      email,
      regNumber,
      department,
      year,
      role: 'student'
    };

    return res.status(201).json({
      success: true,
      message: `Account created successfully! Welcome to CampusConnect, ${name}.`,
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during student registration.' });
  }
};

/**
 * @desc   Get demo account credentials for UI hints
 * @route  GET /api/auth/demo
 */
exports.getDemoAccounts = (req, res) => {
  res.json({
    success: true,
    data: {
      admin: {
        email: DEMO_USERS.admin.email,
        password: DEMO_USERS.admin.password,
        role: 'admin'
      },
      student: {
        email: DEMO_USERS.student.email,
        password: DEMO_USERS.student.password,
        role: 'student'
      }
    }
  });
};

