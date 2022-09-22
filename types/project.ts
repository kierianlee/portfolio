import { Slug } from "./slug";

export interface Project {
  _id: string;
  image: string;
  tags: string[];
  name: string;
  description: any[];
  slug: Slug;
}
