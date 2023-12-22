module.exports = {
  apps: [
    {
      name: "saver-bot",
      cwd: "/home/ubuntu/pm/sded-saver-bot",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        DATABASE_URL: "",

        TG_TOKEN: "",
      },
    },
  ],
};
