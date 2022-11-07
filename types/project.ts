import { Slug } from "./slug";

export interface Project {
  _id: string;
  image: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
  tags: string[];
  name: string;
  description: any[];
  slug: Slug;
}
