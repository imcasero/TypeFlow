import { ITypingPerformance } from "./dto/TypingPerformance.dto";

export class TypingPerformance {
  private charactersTyped: number;
  private errors: number;
  private timeInMinutes: number;
  private totalWords: number;
  private correctWords: number;

  constructor(data: ITypingPerformance) {
    this.charactersTyped = data.charactersTyped;
    this.errors = data.errors;
    this.timeInMinutes = data.timeInMinutes;
    this.totalWords = data.totalWords;
    this.correctWords = data.correctWords;
  }

  private calculateWPM(): number {
    return this.charactersTyped / (5 * this.timeInMinutes);
  }

  private calculateWPMAdjusted(): number {
    const wpm = this.calculateWPM();
    const errorsPerMinute = this.errors / this.timeInMinutes;
    return wpm - errorsPerMinute;
  }

  public calculateAccuracy(): number {
    console.log(this.correctWords / this.totalWords);
    return (this.correctWords / this.totalWords) * 100;
  }

  public calculateFinalWPM(): number {
    const wpmAdjusted = this.calculateWPMAdjusted();
    const accuracy = this.calculateAccuracy();
    return wpmAdjusted * (accuracy / 100);
  }
}
