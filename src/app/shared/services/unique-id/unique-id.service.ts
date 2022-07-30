import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UniqueIdService {

  private numberOfGeneratedIds = 0;

  // Expressao que testa se inicia com letra e logo após as letra tem - e após qualquer coisa
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  public generateUniqueIdWithPrefix(prefix: string) {
    if (!prefix || !this.validId.test(prefix)) {
      throw Error('Prefix can not be empty');
    }

    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGeneratedUniqueIds(): number {
    return this.numberOfGeneratedIds;
  }

  public generateUniqueId(): string {
    return uuidv4();
  }

}
