# File Format Series: Sketch to JSON

This repository contains the source code for the [File Format Series 01: Sketch to JSON](#) blog post.

Please refer to the article for instructions on how to use the code.

## Requirements

You'll need some familiarity with [TypeScript](https://typescriptlang.org), and a reasonably recent version of [node](https://nodejs.org) installed. For code editing, we recommend you use [Visual Studio Code](https://code.visualstudio.com). You don't need Sketch, or a Mac: you can run the sample code in any operating system.

## GitHub Action

The repository includes a GitHub Action (in [`.github/workflows`](https://github.com/sketch-hq/file-format-series-sketch-to-json/blob/main/.github/workflows/update-json.yml)) that runs when there's a change to the `color-library.sketch` file on the `main` branch.

The action will save the output of the conversion to `colors.json`, and store the file as an artifact in the [_Actions_ tab of the GitHub UI](https://github.com/sketch-hq/file-format-series-sketch-to-json/actions).
