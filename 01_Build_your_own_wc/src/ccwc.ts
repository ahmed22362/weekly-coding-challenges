import * as fs from "fs";
import * as path from "path";

export default class CodeChallengeWC {
  /**
   * This function read a given stream and return a promise of string
   *
   * @async
   * @param {NodeJS.ReadStream} stream
   * @returns {Promise<string>}
   */
  static async streamToString(
    stream: NodeJS.ReadStream | fs.ReadStream,
  ): Promise<string> {
    // lets have a ReadableStream as a stream variable
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
  }

  /**
   * This function return the count of bytes of a given string
   *
   * @param {string} text
   * @returns {number}
   */
  static getBytesCount(text: string): number {
    return new Blob([text]).size;
  }

  /**
   * This function return the count of lines in a given string
   *
   * @param {string} text
   * @returns {number}
   */
  static getLinesCount(text: string): number {
    return text.split(/\r\n|\r|\n/).length;
  }

  /**
   * This function return the count of words in a given string
   *
   * @param {string} text
   * @returns {number}
   */
  static getWordsCount(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  /**
   * This function return the count of characters in a given string
   *
   * @param {string} text
   * @returns {number}
   */
  static getCharacterCount(text: string): number {
    return text.length;
  }

  /**
   * Handles the specified command-line option, processing the given file contents
   * or buffer accordingly.
   *
   * @returns {string} - The result based on the specified option.
   * @throws {Error} - Throws an error if the option is invalid.
   */
  static handleOptions(option: string, text: string): string {
    switch (option.toLocaleLowerCase()) {
      case "-c":
        return `${this.getBytesCount(text)}`;
      case "-l":
        return `${this.getLinesCount(text)}`;
      case "-w":
        return `${this.getWordsCount(text)}`;
      case "-m":
        return `${this.getCharacterCount(text)}`;
      case "":
        return `${this.getBytesCount(text)} ${this.getLinesCount(
          text,
        )} ${this.getWordsCount(text)} ${this.getCharacterCount(text)}`;
      default:
        throw new Error("Can't find option");
    }
  }
  /**
   * Counts words/lines/chars from a provided stream.
   *
   * @param {Stream} stream - The readable stream to count from
   * @param {string} option - The count option (-l, -w, etc)
   * @returns {Promise<string>} The count result as a string
   */
  static async countFromStream(
    stream: NodeJS.ReadStream | fs.ReadStream,
    option: string,
  ): Promise<string> {
    const text = await this.streamToString(stream);
    return this.handleOptions(option, text);
  }
  /**
   * Counts words/lines/chars from a provided file path.
   *
   * @param {string} file - The path to the file to count
   * @param {string} option - The count option (-l, -w, etc)
   * @returns {string} The count result as a string
   */
  static countFromFile(file: string, option: string): string {
    const filePath = path.join(__dirname, file);
    const text = fs.readFileSync(filePath, "utf8");
    return this.handleOptions(option, text);
  }
  /**
   * Performs word count based on input stream or file.
   *
   * @param {Object} opts - The options
   * @param {string} opts.option - Counting option (-l, -w, etc)
   * @param {string} [opts.file] - Optional file path
   * @param {Stream} [opts.stream] - Optional stream
   * @returns {Promise<string>} The result of the count operation
   * @throws {Error} If neither file nor stream is provided
   */
  static async myWC({
    option,
    file,
    stream,
  }: {
    option: string;
    file?: string;
    stream?: NodeJS.ReadStream | fs.ReadStream;
  }): Promise<string> {
    let text;

    if (stream) {
      text = await this.countFromStream(stream, option);
    } else if (file) {
      text = this.countFromFile(file, option);
    } else {
      throw new Error("Provide file or stream");
    }

    return text;
  }
}
