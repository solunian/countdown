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

function decode_date(datestr: string): number {
  // weird timezone offset. too lazy to think to hard about this.
  return Math.floor(new Date(datestr).getTime() / 1000 + new Date().getTimezoneOffset() * 60);
  // return Math.floor(new Date(datestr).getTime() / 1000);
}

// offset by number of minutes
function now_offset(min_offset: number): number {
  return Math.floor(Date.now() / 1000 + min_offset * 60);
}

// time_remaining in seconds
function countdown_text(time_remaining: number): string {
  // times in seconds
  const day_sec = 60 * 60 * 24;
  const hr_sec = 60 * 60;
  const min_sec = 60;

  let text = [];
  const days = Math.floor(time_remaining / day_sec);
  const hrs = Math.floor((time_remaining - days * day_sec) / hr_sec);
  const mins = Math.floor((time_remaining - days * day_sec - hrs * hr_sec) / min_sec);
  const secs = time_remaining - days * day_sec - hrs * hr_sec - mins * min_sec;

  if (days !== 0) {
    text.push(`${days} ${days === 1 ? "day" : "days"}`);
  }
  if (hrs !== 0 || days > 0) {
    text.push(`${hrs} ${hrs === 1 ? "hour" : "hours"}`);
  }
  if (mins !== 0 || days > 0 || hrs > 0) {
    text.push(`${mins} ${mins === 1 ? "minute" : "minutes"}`);
  }
  if (secs !== 0 || days > 0 || hrs > 0 || mins > 0) {
    text.push(`${mins} ${mins === 1 ? "second" : "seconds"}`);
  }
  if (time_remaining <= 0) {
    return "done.";
  }

  return text.join(", ") + " remaining.";
}

export { type Countdown, encode, decode, decode_date, now_offset, countdown_text };
