const request = require('supertest');
const {Genre} = require('../../models/genre');
let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async() => {
    server.close();
    await Genre.remove({});
  })

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.insertMany([
        { name: 'genre1' },
        { name: 'genre2' },
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name ==='genre1')).toBeTruthy();
      expect(res.body.some(g => g.name ==='genre2')).toBeTruthy();
      
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async() =>{
      // const genre = await Genre.collection.insert({name: 'genre1'});
      
      // const res = await request(server).get(`/api/genres/${genre.ops[0]._id}`);
      // console.log(res.body)
      const genre = new Genre({ name: 'genre1' });
      await genre.save();
      const res = await request(server).get('/api/genres/' + genre._id);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('name', genre.name);
    });
    it('should throw', async () => {
      const res = await request(server).get(`/api/genres/1`);
      expect(res.status).toBe(404);
    })
  });
});