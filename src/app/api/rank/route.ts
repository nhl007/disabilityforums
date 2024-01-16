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
    `${apiUrl}/user_actions.json?offset=0&username=${username}&filter=5`
  );
  // const response = await fetch(`${apiUrl}/search.json?q=@${username}`);
  const data = await response.json();
  return data.user_actions;
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
      const data = await getUserById(business.discourseId);

      // console.log(data, "user data from id ");

      let validPosts = 0;
      let validLikes = 0;

      if (data.postCount) {
        const posts = await searchPosts(data.name);
        // console.log(posts, "posts");

        for (const post of posts) {
          validPosts += 1;
          const liked = await getUserWhoLiked(post.post_id);

          for (const user of liked) {
            if (user && user.id) {
              const userData = await getUserById(user.id);
              validLikes +=
                userData.level === 2 ? 1 : userData.level === 3 ? 2 : 0;
            }
          }
        }
      }

      const updatedRank = validLikes + validPosts;

      // console.log(validPosts, validLikes, updatedRank);

      await Business.findByIdAndUpdate(business._id, { rating: updatedRank });

      // console.log("valid posts", validPosts);
      // console.log("valid Likes", validLikes);
      // console.log("Rank :", validPosts + validLikes);
    }

    // Fetch all documents, sort by rating, and update rank
    await Business.find()
      .sort({ rating: -1 })
      .exec()
      .then((businesses) => {
        businesses.forEach((business, index) => {
          business.rank = index + 1;
          business.save();
        });

        console.log("Ranking update successful");
        // mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error updating ranking:", error);
        // mongoose.connection.close();
      });

    return NextResponse.json(
      {
        success: true,
        message: "Ranked successfully",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
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
