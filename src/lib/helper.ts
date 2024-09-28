interface Countdown {
  title: string;
  start: number;
  end: number;
}

const sep = ",";

function encode(countdown: Countdown): string {
  let codestr = btoa(`${countdown.start}${sep}${countdown.end}${sep}${countdown.title}`);
  return encodeURIComponent(codestr);
}

function decode(code: string): Countdown {
  let parsed = atob(decodeURIComponent(code));
  let split = parsed.split(sep);

  // title could contain a sep. so split doesn't work as well if people put a sep in there :(
  let title = parsed.substring(split[0].length + split[1].length + 2); // +2 for 2 seps
  return {
    title,
    start: Number.parseInt(split[0]),
    end: Number.parseInt(split[1]),
  };
}

export { type Countdown, encode, decode };
