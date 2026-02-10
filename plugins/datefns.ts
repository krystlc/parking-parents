// plugins/datefns.ts
import { format, formatDistanceToNow, parseISO } from "date-fns";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      datefns: {
        format: (date: string | number | Date, formatStr: string) =>
          format(new Date(date), formatStr),
        formatDistanceToNow: (date: string | number | Date) =>
          formatDistanceToNow(new Date(date)),
        parseISO: (dateString: string) => parseISO(dateString),
        // Add any other date-fns functions you need
      },
    },
  };
});
