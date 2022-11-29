import { IOmdbResponse } from "../../models/IOmdbResponse";
import { IMovie } from "../../models/IMovie";

let mockData: IMovie[] = [
  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1996",
  },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve(mockData);
  });
};
