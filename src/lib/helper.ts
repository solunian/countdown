interface Countdown {
  title: string;
  start: number;
  end: number;
}

function encode(countdown: Countdown): string {
  let codestr = btoa(`${countdown.title},${countdown.start},${countdown.end}`);
  return encodeURIComponent(codestr);
}

function decode(code: string): Countdown {
  let parsed = atob(decodeURIComponent(code)).split(",");
  return {
    title: parsed[0],
    start: Number.parseInt(parsed[1]),
    end: Number.parseInt(parsed[2]),
  };
}

export { type Countdown, encode, decode };
