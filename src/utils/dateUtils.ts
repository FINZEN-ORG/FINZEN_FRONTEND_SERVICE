// src/utils/date.ts
export const convertToISODate = (dateString: string): string => {
    try {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}T12:00:00`;
      }
      const parsedDate = new Date(dateString);
      return parsedDate.toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  };