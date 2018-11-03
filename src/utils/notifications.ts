import Stream from "getstream";

const client = Stream.connect(
  process.env.STREAM_KEY || "",
  process.env.STREAM_SECRET || "",
  "43934"
);

const addActivity = (
  verb: string,
  target: string,
  creator: string,
  slug: string,
  title: string
) => {
  const fTarget = target.replace(/\./g, "-");
  const fCreator = creator.replace(/\./g, "-");
  const user = client.feed("notification", fTarget);
  user
    .addActivity({
      actor: fCreator,
      verb,
      object: {
        slug,
        title
      },
      target
    })
    .catch(reason => console.log(reason));
};

export const clap = (
  target: string,
  creator: string,
  slug: string,
  title: string
) => {
  addActivity("clap", target, creator, slug, title);
};

export const comment = (
  target: string,
  creator: string,
  slug: string,
  title: string
) => {
  addActivity("comment", target, creator, slug, title);
};

export const getFeed = async (username: string) => {
  const fUsername = username.replace(/\./g, "-");
  const userFeed = client.feed("notification", fUsername);
  const feed = await userFeed.get({ limit: 30 });
  return feed;
};

export const markAsRead = async (username: string) => {
  const fUsername = username.replace(/\./g, "-");
  const userFeed = client.feed("notification", fUsername);
  await userFeed.get({ mark_read: true });
  await userFeed.get({ mark_seen: true });
};
