import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/IMovie";

describe("movieSort", () => {
  test("should sort list", () => {
    //arrange
    let movies: IMovie[] = [
      {
        Title: "sist",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "först",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "mellan",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
    ];

    movieSort(movies);

    expect(movies[0].Title).toEqual("först");
  });
  test("should not sort list", () => {
    //arrange
    let movies: IMovie[] = [
      {
        Title: "borde bli lika",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "borde bli lika",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1999",
      },
    ];

    movieSort(movies);

    expect(movies[0].Year).toEqual("1998");
  });
  test("should sort list in reverse alphabetic order", () => {
    //arrange
    let movies: IMovie[] = [
      {
        Title: "abcdefghj",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "zzzzzz",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1999",
      },
      {
        Title: "mellan",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
    ];

    movieSort(movies, false);

    expect(movies[0].Title).toEqual("zzzzzz");
  });
  test("should test return 0", () => {
    //arrange
    let movies: IMovie[] = [
      {
        Title: "abcdefghj",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "abcdefghj",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
      {
        Title: "abcdefghj",
        imdbID: "0700818",
        Type: "hej",
        Poster: "posterul",
        Year: "1998",
      },
    ];

    movieSort(movies, false);

    expect(movies[0].Title).toEqual("abcdefghj");
  });
});
