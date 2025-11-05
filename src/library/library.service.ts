/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { Library } from './schemas/library.schema';


@Injectable()
export class LibraryService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>, @InjectModel(Library.name) private libraryModel: Model<Library>) { };

    async createBook(bookData: Book & { libraryId: string }): Promise<Book> {
        const book = await this.bookModel.create(bookData);
        await this.libraryModel.findByIdAndUpdate(bookData.libraryId, {
            $push: { books: book._id },
        }, { new: true })
        return book;
    }

    async createLibrary(libraryData: Library): Promise<Library> {
        const library = await this.libraryModel.create(libraryData);
        return library;
    }
}
