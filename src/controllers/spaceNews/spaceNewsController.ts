import { Request, Response } from 'express';
import {
  createSpaceNews,
  getAllSpaceNews,
  getSpaceNewsById,
  deleteSpaceNews,
  updateSpaceNews
} from '../../services/spaceNews/spaceNewsService';

// POST controller
export const createNews = async (req: Request, res: Response) => {
  try {
    const news = await createSpaceNews(req.body);
    res.status(201).json(news);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// GET controller
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const newsList = await getAllSpaceNews();
    res.status(200).json(newsList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// GET controller by id
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await getSpaceNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json(news);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// DELETE controller
export const deleteNews = async (req: Request, res: Response) => {
    try {
      await deleteSpaceNews(req.params.id);
      res.status(200).json({ message: 'News deleted successfully' }); // Success message
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  };

// PATCH controller
export const updateNews = async (req: Request, res: Response) => {
  try {
    const updatedNews = await updateSpaceNews(req.params.id, req.body);
    res.status(200).json(updatedNews);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'News not found') {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
