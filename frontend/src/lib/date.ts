const frenchFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatFrenchDate(dateInput: string | number | Date) {
  return frenchFormatter.format(new Date(dateInput));
}

