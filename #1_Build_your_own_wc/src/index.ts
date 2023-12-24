import * as fs from "fs";
import { argv, stdin } from "process";
import CodeChallengeWC from "./ccwc";
import path from "path";

function main() {
  // Check stdin first
  if (stdin && !stdin.isTTY) {
    if (argv.length === 3) {
      const option = argv[2];
      handleStdin(stdin, option);
    } else if (argv.length === 2) {
      handleStdin(stdin);
    }
  }

  // Now handle filePath argument
  else if (argv.length >= 3) {
    if (argv.length === 4) {
      const filePath = argv[2];
      if (!fs.existsSync(path.join(__dirname, filePath))) {
        throw new Error(`File not found at ${path.join(__dirname, filePath)}`);
      }
      const option = argv[3];
      handleFile(filePath, option);
    } else if (argv.length === 3) {
      const filePath = argv[2];
      if (!fs.existsSync(path.join(__dirname, filePath))) {
        throw new Error(`File not found at ${filePath}`);
      }
      handleFile(filePath);
    }
  } else {
    throw new Error("Please provide file path or pipe input!");
  }
}

function handleStdin(
  stream: NodeJS.ReadStream | fs.ReadStream,
  option?: string,
) {
  CodeChallengeWC.myWC({ option: option || "", stream }).then((out) =>
    console.log(out),
  );
}

function handleFile(filePath: string, option?: string) {
  CodeChallengeWC.myWC({ option: option || "", file: filePath }).then((out) =>
    console.log(out),
  );
}

main();
