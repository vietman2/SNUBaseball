export class SNUBaseballAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SNUBaseballAPIError";
  }
}
