const { db } = require('../config/db');

/**
 * @desc   Get aggregate statistics for dashboard and hero counters
 * @route  GET /api/stats
 */
exports.getStats = (req, res) => {
  try {
    const clubCount = db.prepare('SELECT COUNT(*) as count FROM clubs').get().count;
    const memberSum = db.prepare('SELECT SUM(members) as total FROM clubs').get().total || 0;

    const regCounts = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected
      FROM registrations
    `).get();

    const categories = db.prepare(`
      SELECT category, COUNT(*) as count
      FROM clubs
      GROUP BY category
      ORDER BY count DESC
    `).all();

    res.json({
      success: true,
      data: {
        totalClubs: clubCount,
        totalMembers: memberSum,
        registrations: {
          total: regCounts.total || 0,
          pending: regCounts.pending || 0,
          approved: regCounts.approved || 0,
          rejected: regCounts.rejected || 0
        },
        categories
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ success: false, message: 'Server error while calculating statistics.' });
  }
};

