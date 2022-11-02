import { baseUrl, postsNumber } from "../support/constants";
import { expect } from "chai";
import { Client } from "../src/client";
import { METHODS } from "../support/types";
import { header } from "../support/constants";
import { newPostBody } from "../support/constants";
import { newCommentsText } from "../support/constants";
import { newPostParam } from "../support/constants";

let response;
const client = new Client();
const userId = 5;
const status404 = 404;

describe("Test API", () => {
    it(`Should get information about user with Id:${userId}`, async () => {
      try {
        response = await client.request(METHODS.GET, { url: `${baseUrl}/users/${userId}` });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(response.status).to.equal(200);
      expect(response.data.id).to.equal(userId);
    });

    it(`Should create new post for user with Id:${newPostBody.userId}`, async () => {
      try {
        response = await client.request(METHODS.POST, { url: `${baseUrl}/posts?userId=${userId}`, headers: header, body: newPostBody });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(response.status).to.equal(201);
      expect(response.data.title).to.equal(newPostBody.title);
      expect(response.data.id).to.equal(postsNumber + 1);
    });

    it(`Should update ${newCommentsText.id}'st comment's text for postId:${newCommentsText.postId}`, async () => {
      try {
        response = await client.request(METHODS.PUT, { url: `${baseUrl}/comments/21`, headers: header, body: newCommentsText });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(response.status).to.equal(200);
      expect(response.data.body).to.equal(newCommentsText.body);
      expect(response.data.id).to.equal(newCommentsText.id)
    });

    it(`Should update ${newPostParam.id}'rd post for userId:${newPostParam.userId} with new param: ${newPostParam.date}`, async () => {
      try {
        response = await client.request(METHODS.PATCH, { url: `${baseUrl}/posts/3`, headers: header, body: newPostParam });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(response.status).to.equal(200);
      expect(response.data.id).to.equal(newPostParam.id);
      expect(response.data.time).to.equal(newPostParam.date);
    });

    it(`Should delete user with id:${userId}`, async () => {
      try {
        response = await client.request(METHODS.DELETE, { url: `${baseUrl}/users/${userId}` });
      } catch (error: any) {
        throw new Error(error.message);
      }
      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal({});
    });

    it(`Should recive response with status ${status404} code: "Not Found" trying to get non-existing user`, async () => {
      try {
        response = await client.request(METHODS.GET, { url: `${baseUrl}/55` });
      } catch (error: any) {
        expect(error.response.status).to.equal(404);
        expect(error.response.statusText).to.equal('Not Found');
      }
    });

    it(`Should recive response with status code: '${status404} Not Found' trying to get non-existing post`, async () => {
      try {
        response = await client.request(METHODS.GET, { url: `${baseUrl}/posts/${status404}` });
      } catch (error: any) {
        expect(error.response.status).to.equal(404);
      }
    });
});