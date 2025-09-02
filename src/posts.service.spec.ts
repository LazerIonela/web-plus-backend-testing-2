import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result).toEqual(
        posts.map((p) => expect.objectContaining(p))
      );
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toEqual([
        expect.objectContaining(posts[1]),
        expect.objectContaining(posts[2]),
      ]);
    });

    it('returns first N posts when only limit provided', () => {
      const result = postsService.findMany({ limit: 2 });
      expect(result).toEqual([
        expect.objectContaining(posts[0]),
        expect.objectContaining(posts[1]),
      ]);
    });

    it('skips N posts when only skip provided', () => {
      const result = postsService.findMany({ skip: 2 });
      expect(result).toEqual([
        expect.objectContaining(posts[2]),
        expect.objectContaining(posts[3]),
      ]);
    });

    it('returns empty array if skip > posts count', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result).toEqual([]);
    });

    it('returns all posts if limit > posts count', () => {
      const result = postsService.findMany({ limit: 10 });
      expect(result).toEqual(
        posts.map((p) => expect.objectContaining(p))
      );
    });

    it('returns empty array if limit = 0', () => {
      const result = postsService.findMany({ limit: 0 });
      expect(result).toEqual([]);
    });

    it('returns all posts if skip = 0', () => {
      const result = postsService.findMany({ skip: 0 });
      expect(result).toEqual(
        posts.map((p) => expect.objectContaining(p))
      );
    });

    it('works correctly if both skip=0 and limit=0', () => {
      const result = postsService.findMany({ skip: 0, limit: 0 });
      expect(result).toEqual([]);
    });
  });
});