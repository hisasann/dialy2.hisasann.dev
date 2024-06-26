import BLOG from '@/blog.config';
import Container from '@/components/Elements/Base/container';
import BlogPost from '@/components/Elements/Blog/blog-post';
import Pagination from '@/components/Layouts/pagination';
import { getAllPosts } from '@/lib/notion/getAllPosts';

/**
 * The revalidate variable is used to indicate whether a particular operation should be revalidated.
 * It represents a boolean value where:
 * - true indicates that the operation should be revalidated
 * - false indicates that the operation should not be revalidated
 *
 * @type {number}
 */
export const revalidate: number = 1;

/**
 * Retrieves the posts to be displayed on a page.
 *
 * @returns {Promise<{
 *    page: number,
 *    postsToShow: Array,
 *    showNext: boolean
 * }>} The retrieved posts information.
 */
async function getPosts(): Promise<{
  page: number;
  postsToShow: Array<any>;
  showNext: boolean;
}> {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, BLOG.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > BLOG.postsPerPage;
  return {
    page: 1, // current page is 1
    postsToShow,
    showNext,
  };
}

/**
 * Retrieves a list of posts and renders them on the Home page.
 * @async
 */
export default async function Home() {
  const { page, postsToShow, showNext } = await getPosts();

  return (
    // <main className="flex min-h-screen flex-col items-start justify-between p-24">
    <Container layout={'blog'} fullWidth={false}>
      {postsToShow.map((post: any) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
    // </main>
  );
}
