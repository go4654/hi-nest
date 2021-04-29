import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return "this will return all movies"
    }

    @Get("/:id")
    getOne(@Param('id') movieId:string){
        return `영화 하나만 가져올수 있음 아이디는${movieId}`
    }

    @Post()
    create(){
        return "영화를 만듭니다"
    }

    @Delete('/:id')
    remove(@Param('id') movieId:string){
        return `${movieId}번 을 지웁니다`
    }

    @Patch("/:id")
    pacth(@Param('id') movieId:string){
        return `${movieId}번 을 수정합니다`
    }
}
