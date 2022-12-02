import { IOmdbResponse } from "../../models/IOmdbResponse";
import { IMovie } from "../../models/IMovie";

export const mockData: IMovie[] = [
  {
    Title: "hej",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "exempel",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1998",
  },

  {
    Title: "wihoo",
    imdbID: "0700818",
    Type: "hej",
    Poster: "posterul",
    Year: "1996",
  },
];
export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText !== "") {
      resolve(mockData);
    } else {
      reject();
    }
  });
};
