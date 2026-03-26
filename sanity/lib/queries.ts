import { defineQuery } from "next-sanity";

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    category,
    title,
    excerpt,
    intro,
    mainImage{
      alt,
      caption,
      asset
    },
    "publishedAt": coalesce(string(publishedAt), ""),
    readTime,
    pullQuote,
    takeaways,
    body[]{
      ...,
      _type == "image" => {
        ...,
        alt,
        caption,
        asset
      }
    }
  }
`);
