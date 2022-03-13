export interface Item {
  id: number,
  deleted?: boolean,
  type: "job" | "story" | "comment" | "poll" | "pollopt",
  by?: string,
  time?: number,
  text?: string,
  dead?: boolean,
  /* parent	The comment's parent: either another comment or the relevant story,
poll	The pollopt's associated poll,
kids	The ids of the item's comments, in ranked display order,
url	The URL of the story,
score	The story's score, or the votes for a pollopt,
title	The title of the story, poll or job, HTML,
parts	A list of related pollopts, in display order,
descendants	In the case of stories or polls, the total comment count, */
}
