const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null || args[key] !== undefined) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
