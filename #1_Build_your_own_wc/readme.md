# Word Count Utility

This challenge corresponds to the first part of the Coding Challenges series by John Crickett https://codingchallenges.fyi/challenges/challenge-wc.

## Description

A simple command line utility for counting words, lines, characters and bytes from a file or input stream.

## Usage

The utility accepts the following options:

- `-c` Count bytes
- `-l` Count lines
- `-w` Count words
- `-m` Count characters

With no option, it will print all counts.

Provide a file path to count from a file:

```
$ ts-node src/index.ts file.txt -l
```

Or pipe input to count from a stream:

```
$ cat file.txt | ts-node src/index.ts -w
```

## Examples

Count lines in file:

```
$ ts-node ./src/index.ts ../test/file.txt
7146
```

Count words from piped input:

```
$ echo "Hello world" | ts-node ./src/index.ts -w
2
```

## Code Overview

The main logic is handled in `CodeChallengeWC.js`:

- `streamToString()` - converts a stream to a string
- `countFromStream()` - counts words/lines/etc from a stream
- `countFromFile()` - counts words/lines/etc from a file
- `handleOptions()` - handles the command line options
- `myWC()` - main entry point, routes to stream/file handlers

## Running Locally

To test locally, install dependencies:

```
npm install
```

Then run:

```
ts-node ./src/index.ts <file> [options]
```

Input can also be piped in:

```
echo "text" | ts-node ./src/index.ts [options]
```
