import { Router } from 'express';
import { createNews, getAllNews, getNewsById, deleteNews, updateNews } from '../../controllers/spaceNews/spaceNewsController';

const router = Router();

// Routes for Space News
router.post('/space/news', createNews); // Create new space news
router.get('/space/news', getAllNews); // Get all space news
router.get('/space/news/:id', getNewsById); // Get space news by ID
router.patch('/space/news/:id', updateNews); // Update space news by ID
router.delete('/space/news/:id', deleteNews); // Delete space news by ID

export default router;
