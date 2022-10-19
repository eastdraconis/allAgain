// @ts-nocheck
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { feedService } from "../services/feedService";

const feedRouter = Router();

feedRouter.post("/", loginRequired, async (req, res, next) => {
  try {
    const { category, tags, imageUrls, description, datetime } = req.body;
    const createdFeed = await feedService.postFeed({
      userId: req.currentUserId,
      category,
      tags,
      imageUrls,
      description,
      datetime,
    });
    res.status(200).send(createdFeed.toString());
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/", async (req, res, next) => {
  try {
    const feedList = await feedService.getAllFeeds();
    res.status(200).send(feedList);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/:feedId", async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const feed = await feedService.getFeedByFeedId({ feedId });
    res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
});

feedRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const feeds = await feedService.getFeedByUserId({ userId });
    res.status(200).send(feeds);
  } catch (error) {
    next(error);
  }
});

feedRouter.put("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const { category, tags, imageUrls, description } = req.body;
    const currentUserId = req.currentUserId;

    const updatedFeed = await feedService.updateFeed({
      currentUserId,
      feedId,
      category,
      tags,
      imageUrls,
      description,
    });
    res.status(200).send(updatedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/:feedId", loginRequired, async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const currentUserId = req.currentUserId;
    const deletedFeed = await feedService.deleteFeed({ currentUserId, feedId });
    res.status(200).send(deletedFeed);
  } catch (error) {
    next(error);
  }
});

feedRouter.post("/likes", loginRequired, async (req, res, next) => {
  try {
    const { feedId, userId } = req.body;
    const likeId = await feedService.postLike({
      feedId,
      userId,
    });
    res.status(200).send(likeId.toString());
  } catch (error) {
    next(error);
  }
});

feedRouter.delete("/likes/:likeId", loginRequired, async (req, res, next) => {
  try {
    const { likeId } = req.params;
    const currentUserId = req.currentUserId;
    const deleted = await feedService.deleteLike({ currentUserId, likeId });
    res.status(200).send(deleted);
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
