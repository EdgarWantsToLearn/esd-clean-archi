export class ProductName {
    constructor(private readonly name: string) {
      if (name.length < 10 || name.length > 200) {
        throw new Error('Product name must be between 10 and 200 characters');
      }
    }
  
    get value(): string {
      return this.name;
    }
  }
  