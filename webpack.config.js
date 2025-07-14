const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ config }) => {
  const isBuild = config.mode === "production";

  return {
    ...config,
    output: {
      ...config.output,
      library: "grapesjs-dinvitations",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: isBuild
            ? [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            : ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext]",
          },
        },
        ...config.module.rules,
      ],
    },
    plugins: [
      ...(config.plugins || []),
      ...(isBuild
        ? [
            new MiniCssExtractPlugin({
              filename: "grapesjs-dinvitations.min.css",
            }),
          ]
        : []),
    ],
  };
};
