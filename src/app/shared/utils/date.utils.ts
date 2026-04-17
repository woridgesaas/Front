export class DateUtils {
  static toInputDate(value: unknown): Date | null {
    if (!value) return null;

    if (value instanceof Date) {
      return isNaN(value.getTime()) ? null : value;
    }

    const str = String(value).trim();
    if (!str) return null;

    const normalized = str.includes('T') ? str.split('T')[0] : str;
    const date = new Date(normalized);

    return isNaN(date.getTime()) ? null : date;
  }

  static toApiDate(value: unknown): string {
    if (!value) return '';

    if (value instanceof Date) {
      return isNaN(value.getTime()) ? '' : value.toISOString().split('T')[0];
    }

    const str = String(value).trim();
    if (!str) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }

    const date = new Date(str);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  }

  static toApiNullableDate(value: unknown): string | null {
    const result = this.toApiDate(value);
    return result || null;
  }
}
