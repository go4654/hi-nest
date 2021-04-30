import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should retrun an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe("getOne", () => {
    it("shold return a movie", () => {
      service.create({
        title:"Test Movie",
        genres:["Ttest"],
        year:2000
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it("should throw 404 error", () => {
      try{
        service.getOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`해당 아이디:999 영화를 찾을수없습니다`)
      }
    })
  })

  describe("deleteOne", () => {
    it("영화삭제", () => {
      service.create({
        title:"Test Movie",
        genres:["Ttest"],
        year:2000
      })
      // console.log(service.getAll())
      const beforeDelete = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete)
    })
    it("404를 리턴함",() => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`해당 아이디:999 영화를 찾을수없습니다`)
      }
    })
  })

  describe("create",() => {
    it("영화 만들기", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title:"Test Movie",
        genres:["Ttest"],
        year:2000
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate)

    });
  })

  describe("updata", () => {
    it("영화 수정", () => {
      service.create({
        title:"Test Movie",
        genres:["Ttest"],
        year:2000
      })
      service.update(1, {title:"update test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update test');
    })

    it("404를 리턴함",() => {
      try{
        service.update(999,{});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`해당 아이디:999 영화를 찾을수없습니다`)
      }
    })
  })

});
