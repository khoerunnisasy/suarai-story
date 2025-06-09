import { openDB } from 'idb';

const DB_NAME = 'avengerz-fav';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteDB = {
  async save(story) {
    return (await dbPromise).put(STORE_NAME, story);
  },
  async remove(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
  async isFavorited(id) {
    const story = await (await dbPromise).get(STORE_NAME, id);
    return !!story;
  },
  async getAll() {
    return (await dbPromise).getAll(STORE_NAME);
  },
};

export default FavoriteDB;