import { getAllStories, postStory, getStoryById } from "./api";

const StoryModel = {
  async fetchAll() {
    return await getAllStories();
  },

  async fetchStoryById(id) {
    return await getStoryById(id);
  },

  async submitStory(data) {
    return await postStory(data);
  },
};

export default StoryModel;