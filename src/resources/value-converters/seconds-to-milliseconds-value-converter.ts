export class SecondsToMillisecondsValueConverter {

    toView(ms: number): number {
      return ms / 1000;
    }

    fromView(sec: number): number {
      return sec * 1000;
    }
  }
  