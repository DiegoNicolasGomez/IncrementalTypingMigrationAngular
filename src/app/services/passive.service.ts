import { Injectable } from '@angular/core';
import { Generator } from '../classes/generator';

@Injectable({
  providedIn: 'root'
})
export class PassiveService {
  private generators: Generator[] = [];
  constructor() { 
    this.createGenerator(new Generator('Portable Generator', 5, 1));
    this.createGenerator(new Generator('Small Generator', 6, 2));
    this.createGenerator(new Generator('Medium-sized Generator', 9, 3));
    this.createGenerator(new Generator('Ample Generator', 12, 4));
    this.createGenerator(new Generator('Substantial Generator', 15, 5));
    this.createGenerator(new Generator('Reasonable Generator', 18, 6));
    this.createGenerator(new Generator('Large Generator', 21, 7));
    this.createGenerator(new Generator('Major Generator', 24, 8));
    this.createGenerator(new Generator('Jumbo Generator', 27, 9));
    this.createGenerator(new Generator('Colossal Generator', 30, 10));
  }

  createGenerator(generator: Generator) {
    this.generators.push(generator)
  }

  getGenerators(): Generator[] {
    return this.generators;
  }
}
