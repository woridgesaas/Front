export class FormChangeDetector<T extends object> {
  private snapshot: string;

  constructor(initialValue: T) {
    this.snapshot = this.serialize(initialValue);
  }

  hasChanges(currentValue: T): boolean {
    return this.serialize(currentValue) !== this.snapshot;
  }

  updateSnapshot(newValue: T): void {
    this.snapshot = this.serialize(newValue);
  }

  private serialize(value: unknown): string {
    return JSON.stringify(this.normalize(value));
  }

  private normalize(value: unknown): unknown {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.normalize(item));
    }

    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const normalized: Record<string, unknown> = {};

      Object.keys(obj)
        .sort()
        .forEach((key) => {
          const current = obj[key];

          if (current === undefined) {
            normalized[key] = null;
          } else if (typeof current === 'string') {
            normalized[key] = current.trim();
          } else {
            normalized[key] = this.normalize(current);
          }
        });

      return normalized;
    }

    return value;
  }
}
