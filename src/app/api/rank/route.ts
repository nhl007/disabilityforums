import { connectToDB } from "@/libs/connectToDb";
import Business from "@/models/Business";
import { NextResponse } from "next/server";

const apiUrl = process.env.DISCOURSE_API_URL;

const authHeaders = new Headers();

authHeaders.append("api-key", process.env.DISCOURSE_API_KEY!);
authHeaders.append("Accept", "application/json");

const getUserById = async (id: number) => {
  const response = await fetch(`${apiUrl}/admin/users/${id}.json`, {
    method: "GET",
    headers: authHeaders,
  });

  const data = await response.json();
  // console.log("Post Count: ", data);
  return {
    name: data.username,
    postCount: data.post_count,
    level: data.trust_level,
  };
};

const searchPosts = async (username: string) => {
  // try {
  const response = await fetch(
    `${apiUrl}/search.json?q=@${username}&max_posts=100`
  );
  // const response = await fetch(`${apiUrl}/search.json?q=@${username}`);
  const data = await response.json();
  return data.posts;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
};

const getUserWhoLiked = async (postId: number) => {
  const response = await fetch(
    `${apiUrl}/post_action_users?id=${postId}&post_action_type_id=2`,
    {
      method: "GET",
      headers: authHeaders,
    }
  );
  const data = await response.json();

  return data.post_action_users;
};

export async function GET(req: Request) {
  try {
    await connectToDB();
    const businesses = await Business.find().select("discourseId");

    for (const business of businesses) {
      const data = await getUserById(327);
      let validPosts = 0;
      let validLikes = 0;

      if (data.postCount) {
        const posts = await searchPosts(data.name);
        console.log(posts);

        for (const post of posts) {
          if (post.blurb && post.blurb.length > 20) {
            validPosts += 1;
            const liked = await getUserWhoLiked(post.id);

            for (const user of liked) {
              if (user && user.id) {
                const userData = await getUserById(user.id);
                validLikes +=
                  userData.level === 2 ? 1 : userData.level === 3 ? 2 : 0;
              }
            }
          }
        }
      }

      const updatedRank = validLikes + validPosts;

      await Business.findByIdAndUpdate(business._id, { rank: updatedRank });

      console.log("valid posts", validPosts);
      console.log("valid Likes", validLikes);
      console.log("Rank :", validPosts + validLikes);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Ranked successfully",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error Occurred",
      },
      { status: 400 }
    );
  }
}

//! first how many post the user made
// 1pts per post

//! find out who liked the user's post

// trust level-2 =>1
// trust level-3=>2

//! add the points [rank complete]

//? ${apiUrl}/post_action_users?id=437&post_action_type_id=2
