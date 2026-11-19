//imports all of the important stuff
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts-json';
import Head from 'next/head';

//function that renders a post page
export default function Post({ postData }) {
    return (
        <Layout>
            <article className="card col-6">
                <div calssName="card-body">
                    <h5 className="card-title">{postData.post_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{postData}</h6>
                    <p className="card-text">{postData}</p>
                    <a></a>
                </div>
            </article>
        </Layout>
    );
}

//returns a list of possible values for 'id'
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false,
    };
}

//fetches necessary data for blog posts with a given id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}