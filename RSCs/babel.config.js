const development = (process.env.NODE_ENV || "development") === "development";

exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        useSpread: true,
        development: true,
      },
    ],
  ],
};