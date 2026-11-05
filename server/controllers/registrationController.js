const { db } = require('../config/db');

/**
 * @desc   Submit a new student club registration application
 * @route  POST /api/registrations
 */
exports.createRegistration = (req, res) => {
  try {
    const studentName = (req.body.studentName || req.body.student_name || '').trim();
    const studentEmail = (req.body.studentEmail || req.body.student_email || '').trim().toLowerCase();
    const regNumber = (req.body.regNumber || req.body.reg_number || '').trim().toUpperCase();
    const clubName = (req.body.clubName || req.body.club_name || '').trim();

    // Field validations
    if (!studentName) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }
    if (!studentEmail || !studentEmail.includes('@') || !studentEmail.includes('.')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid college email address.' });
    }
    if (!regNumber) {
      return res.status(400).json({ success: false, message: 'University registration / roll number is required.' });
    }
    if (!clubName) {
      return res.status(400).json({ success: false, message: 'Please select a club to join.' });
    }

    // Verify club exists
    const club = db.prepare('SELECT * FROM clubs WHERE name = ?').get(clubName);
    if (!club) {
      return res.status(404).json({ success: false, message: `Selected club '${clubName}' does not exist.` });
    }

    // Check for duplicate application
    const existing = db.prepare(
      'SELECT id, status FROM registrations WHERE LOWER(student_email) = ? AND club_name = ?'
    ).get(studentEmail, clubName);

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `An application for ${clubName} using ${studentEmail} already exists (Status: ${existing.status}).`
      });
    }

    // Insert new application
    const insertStmt = db.prepare(`
      INSERT INTO registrations (student_name, student_email, reg_number, club_name, status)
      VALUES (?, ?, ?, ?, 'Pending')
    `);

    const result = insertStmt.run(studentName, studentEmail, regNumber, clubName);
    const newReg = db.prepare('SELECT * FROM registrations WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: `Congratulations ${studentName}! Your application to ${clubName} has been submitted for review.`,
      data: newReg
    });
  } catch (error) {
    console.error('Error submitting registration:', error);
    res.status(500).json({ success: false, message: 'Server error while processing registration.' });
  }
};

/**
 * @desc   Get all registration applications (with filter by club, status, or search)
 * @route  GET /api/registrations
 */
exports.getRegistrations = (req, res) => {
  try {
    const { club, status, search } = req.query;
    let query = 'SELECT * FROM registrations WHERE 1=1';
    const params = [];

    if (club && club !== 'All') {
      query += ' AND club_name = ?';
      params.push(club);
    }

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search && search.trim() !== '') {
      query += ' AND (LOWER(student_name) LIKE ? OR LOWER(reg_number) LIKE ? OR LOWER(student_email) LIKE ?)';
      const keyword = `%${search.trim().toLowerCase()}%`;
      params.push(keyword, keyword, keyword);
    }

    query += ' ORDER BY created_at DESC';

    const applications = db.prepare(query).all(...params);

    // Summary counts
    const pendingCount = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status = 'Pending'").get().count;
    const approvedCount = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status = 'Approved'").get().count;
    const rejectedCount = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status = 'Rejected'").get().count;
    const totalCount = db.prepare('SELECT COUNT(*) as count FROM registrations').get().count;

    res.json({
      success: true,
      counts: {
        total: totalCount,
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount
      },
      data: applications
    });
  } catch (error) {
    console.error('Error retrieving registrations:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching registrations.' });
  }
};

/**
 * @desc   Update registration status (Approve / Reject / Pending)
 * @route  PATCH /api/registrations/:id/status
 */
exports.updateRegistrationStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const reg = db.prepare('SELECT * FROM registrations WHERE id = ?').get(id);
    if (!reg) {
      return res.status(404).json({ success: false, message: `Registration with ID ${id} not found.` });
    }

    const prevStatus = reg.status;

    // Update status
    db.prepare(`
      UPDATE registrations
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, id);

    // Sync member count with club
    if (prevStatus !== 'Approved' && status === 'Approved') {
      db.prepare('UPDATE clubs SET members = members + 1 WHERE name = ?').run(reg.club_name);
    } else if (prevStatus === 'Approved' && status !== 'Approved') {
      db.prepare('UPDATE clubs SET members = MAX(0, members - 1) WHERE name = ?').run(reg.club_name);
    }

    const updated = db.prepare('SELECT * FROM registrations WHERE id = ?').get(id);

    res.json({
      success: true,
      message: `Application for ${reg.student_name} (${reg.club_name}) set to '${status}'.`,
      data: updated
    });
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({ success: false, message: 'Server error while updating application status.' });
  }
};

/**
 * @desc   Delete a registration application
 * @route  DELETE /api/registrations/:id
 */
exports.deleteRegistration = (req, res) => {
  try {
    const { id } = req.params;
    const reg = db.prepare('SELECT * FROM registrations WHERE id = ?').get(id);

    if (!reg) {
      return res.status(404).json({ success: false, message: `Registration with ID ${id} not found.` });
    }

    // If was approved, decrement member count
    if (reg.status === 'Approved') {
      db.prepare('UPDATE clubs SET members = MAX(0, members - 1) WHERE name = ?').run(reg.club_name);
    }

    db.prepare('DELETE FROM registrations WHERE id = ?').run(id);

    res.json({
      success: true,
      message: `Registration application for ${reg.student_name} was removed.`
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting registration.' });
  }
};

