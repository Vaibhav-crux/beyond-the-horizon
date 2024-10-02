import SpaceNews, { ISpaceNews } from '../../models/SpaceNews';

// Create space news
export const createSpaceNews = async (newsData: ISpaceNews) => {
  const news = new SpaceNews(newsData);
  await news.save();
  return news;
};

// Get all space news
export const getAllSpaceNews = async () => {
  return await SpaceNews.find().sort({ publishedAt: -1 });
};

// Get space news by ID
export const getSpaceNewsById = async (id: string) => {
  return await SpaceNews.findById(id);
};

// Delete space news by ID
export const deleteSpaceNews = async (id: string): Promise<void> => {
    const result = await SpaceNews.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Space news not found'); // Throw an error if the news doesn't exist
    }
  };

// Update space news by ID
export const updateSpaceNews = async (id: string, updates: Partial<ISpaceNews>) => {
  const news = await SpaceNews.findByIdAndUpdate(id, updates, { new: true });
  if (!news) {
    throw new Error('News not found');
  }
  return news;
};