import { signify } from "react-signify";
import { MergeDb } from "../modules/MergeDb";

const MovieData = MergeDb();
export const sMovie = signify(MovieData);
