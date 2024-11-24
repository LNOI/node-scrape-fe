"use server";
import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your actual API base URL

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(`API request failed with status ${response.status}`);
  }
  return response;
};

const get = async (endpoint, params = {}) => {
  try {
    const session = await auth();
    const url = new URL(`${BASE_URL}/user/${session.user.id}/${endpoint}`);
    // console.log(session)
    url.search = new URLSearchParams(params);
    console.log(url);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.access_token,
      },
    });
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw Error(`API GET request failed: ${error.message}`);
  }
};

const post = async (endpoint, data) => {
  const session = await auth();
  console.log(session);
  try {
    const response = await fetch(
      `${BASE_URL}/user/${session.user.id}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token,
        },
        body: JSON.stringify(data),
      }
    );
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    throw Error(`API POST request failed: ${error.message}`);
  }
};

const put = async (endpoint, data) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${BASE_URL}/user/${session.user.id}/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token,
        },
        body: JSON.stringify(data),
      }
    );
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw Error(`API PUT request failed: ${error.message}`);
  }
};

const del = async (endpoint) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${BASE_URL}/user/${session.user.id}/${endpoint}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + session.access_token,
        },
      }
    );
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    throw Error(`API DELETE request failed: ${error.message}`);
  }
};

export { get, post, put, del };
