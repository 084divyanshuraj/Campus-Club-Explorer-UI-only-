const { db } = require('../config/db');

/**
 * Format raw SQLite club row (parse activities JSON)
 */
function formatClub(row) {
  if (!row) return null;
  return {
    ...row,
    activities: row.activities ? JSON.parse(row.activities) : []
  };
}

/**
 * Helper to compute CSS class for category tag
 */
function getCategoryClass(category) {
  const map = {
    'Technology': 'cat-tech',
    'Sports': 'cat-sports',
    'Arts & Culture': 'cat-arts',
    'Photography': 'cat-photo',
    'Entrepreneurship': 'cat-biz',
    'Social Service': 'cat-social'
  };
  return map[category] || 'cat-general';
}

/**
 * @desc   Get all clubs (with optional search and category filters)
 * @route  GET /api/clubs
 */
exports.getAllClubs = (req, res) => {
  try {
    const { search, category } = req.query;
    let query = 'SELECT * FROM clubs WHERE 1=1';
    const params = [];

    // Filter by Category
    if (category && category !== 'All Clubs') {
      query += ' AND category = ?';
      params.push(category);
    }

    // Filter by Search Keyword (in name, category, or description)
    if (search && search.trim() !== '') {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(category) LIKE ? OR LOWER(description) LIKE ?)';
      const keyword = `%${search.trim().toLowerCase()}%`;
      params.push(keyword, keyword, keyword);
    }

    query += ' ORDER BY id ASC';

    const rows = db.prepare(query).all(...params);
    const clubs = rows.map(formatClub);

    res.json({
      success: true,
      count: clubs.length,
      data: clubs
    });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ success: false, message: 'Server error while retrieving clubs.' });
  }
};

/**
 * @desc   Get single club by ID
 * @route  GET /api/clubs/:id
 */
exports.getClubById = (req, res) => {
  try {
    const { id } = req.params;
    const row = db.prepare('SELECT * FROM clubs WHERE id = ?').get(id);

    if (!row) {
      return res.status(404).json({ success: false, message: `Club with ID ${id} not found.` });
    }

    res.json({
      success: true,
      data: formatClub(row)
    });
  } catch (error) {
    console.error('Error retrieving club:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching club details.' });
  }
};

/**
 * @desc   Create a new club
 * @route  POST /api/clubs
 */
exports.createClub = (req, res) => {
  try {
    const {
      name,
      category,
      categoryClass,
      icon,
      members,
      schedule,
      description,
      fullDescription,
      activities
    } = req.body;

    // Validation
    if (!name || !category || !schedule || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, schedule, and description are required fields.'
      });
    }

    const assignedClass = categoryClass || getCategoryClass(category);
    const assignedIcon = icon || '🎯';
    const membersCount = parseInt(members, 10) || 0;
    const activitiesJson = JSON.stringify(Array.isArray(activities) ? activities : []);

    const stmt = db.prepare(`
      INSERT INTO clubs (name, category, categoryClass, icon, members, schedule, description, fullDescription, activities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      category.trim(),
      assignedClass,
      assignedIcon,
      membersCount,
      schedule.trim(),
      description.trim(),
      (fullDescription || description).trim(),
      activitiesJson
    );

    const newClub = db.prepare('SELECT * FROM clubs WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Club created successfully!',
      data: formatClub(newClub)
    });
  } catch (error) {
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ success: false, message: 'A club with this name already exists.' });
    }
    console.error('Error creating club:', error);
    res.status(500).json({ success: false, message: 'Server error while creating club.' });
  }
};

/**
 * @desc   Update club details
 * @route  PUT /api/clubs/:id
 */
exports.updateClub = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM clubs WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: `Club with ID ${id} not found.` });
    }

    const {
      name = existing.name,
      category = existing.category,
      categoryClass = existing.categoryClass,
      icon = existing.icon,
      members = existing.members,
      schedule = existing.schedule,
      description = existing.description,
      fullDescription = existing.fullDescription,
      activities
    } = req.body;

    const activitiesJson = activities ? JSON.stringify(activities) : existing.activities;

    db.prepare(`
      UPDATE clubs
      SET name = ?, category = ?, categoryClass = ?, icon = ?, members = ?, schedule = ?, description = ?, fullDescription = ?, activities = ?
      WHERE id = ?
    `).run(
      name,
      category,
      categoryClass,
      icon,
      members,
      schedule,
      description,
      fullDescription,
      activitiesJson,
      id
    );

    const updated = db.prepare('SELECT * FROM clubs WHERE id = ?').get(id);

    res.json({
      success: true,
      message: 'Club updated successfully.',
      data: formatClub(updated)
    });
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ success: false, message: 'Server error while updating club.' });
  }
};

/**
 * @desc   Delete a club
 * @route  DELETE /api/clubs/:id
 */
exports.deleteClub = (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM clubs WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: `Club with ID ${id} not found.` });
    }

    db.prepare('DELETE FROM clubs WHERE id = ?').run(id);

    res.json({
      success: true,
      message: `Club '${existing.name}' deleted successfully.`
    });
  } catch (error) {
    console.error('Error deleting club:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting club.' });
  }
};

