import { Slug } from "./slug";

export interface Post {
  _id: string;
  image: string;
  date: string;
  title: string;
  subtitle: string;
  content: any[];
  slug: Slug;
}
