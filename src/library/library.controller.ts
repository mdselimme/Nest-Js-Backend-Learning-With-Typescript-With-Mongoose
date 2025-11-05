/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from './schemas/library.schema';
import { Book } from './schemas/book.schema';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService: LibraryService) { }

    @Post()
    createLibrary(@Body() data: Library) {
        return this.libraryService.createLibrary(data);
    }

    @Post('/create-book')
    createBook(@Body() data: Book & { libraryId: string }) {
        return this.libraryService.createBook(data);
    }
}
