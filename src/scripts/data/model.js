import { getAllStories, postStory, getStoryById } from "./api";

const StoryModel = {
  async fetchAll() {
    const response = await getAllStories();
    return response.listStory || [];
  },

  async fetchStoryById(id) {
    const response = await getStoryById(id);
    return response.story || {}; // ✅ ini perbaikan pentingnya
  },

  async submitStory(data) {
    return await postStory(data);
  },
};

export default StoryModel;
