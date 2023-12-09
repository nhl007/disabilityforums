"use server";

const apiUrl = process.env.DISCOURSE_API_URL;

const authHeaders = new Headers();
authHeaders.append("api-key", process.env.DISCOURSE_API_KEY!);
authHeaders.append("api-username", process.env.DISCOURSE_API_USER_NAME!);

export async function getDiscourseUserById(id: number) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDiscourseUserByEmail(email: string) {
  try {
    const response = await fetch(
      `${apiUrl}/admin/users/list/active.json?email=${email}`,
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
