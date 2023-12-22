"use server";

const apiUrl = process.env.DISCOURSE_API_URL as string;

const authHeaders = new Headers();

authHeaders.append("api-key", process.env.DISCOURSE_API_KEY!);
authHeaders.append("Accept", "application/json");

export async function createADiscourseUser(
  name: string,
  email: string,
  password: string,
  username: string
) {
  try {
    const body = {
      name: name,
      email: email,
      password: password,
      username: username,
      active: "true",
      approved: "true",
    };

    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      formData.append(key, value);
    }
    formData.append("user_fields[1]", "NDIS participant");

    const response = await fetch(`${apiUrl}/users.json`, {
      method: "POST",
      headers: authHeaders,
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
      return data.user_id;
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDiscourseUserById(id: number) {
  try {
    const response = await fetch(`${apiUrl}/admin/users/${id}.json`, {
      method: "GET",
      headers: authHeaders,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}

export async function getDiscourseUserByEmail(email: string) {
  try {
    const response = await fetch(
      `${apiUrl}/admin/users/list/active?email=${email}`,
      {
        method: "GET",
        headers: authHeaders,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return null;
  }
}

export async function discourseSearchPosts(username: string) {
  try {
    const response = await fetch(`${apiUrl}/search.json?q=@${username}`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDiscourseCategories() {
  try {
    const response = await fetch(`${apiUrl}/categories.json?`);
    const data = await response.json();
    const categories = data.category_list.categories.map((c: any) => {
      return { name: c.name, id: c.id };
    });
    return categories;
    // return data.category_list.categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function rankBusiness(username: string) {
  const data = await discourseSearchPosts(username);

  let rank = 0;
  const count = data.length;
  data.map((post: any) => {
    rank += post.like_count * 2;
  });
  return rank + count;
  // step 1 count post of a member, 1 points for each post
  // count likes received on the posts . 2 points per likes
}
