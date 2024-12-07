import { Exclude } from 'class-transformer';

export interface UserType {
  email: string;
  username: string;
  password: string;

}
export class SerializedUsers {
  email: string;
  username: string;

  @Exclude()
  password: string;

  constructor(partial: SerializedUsers) {
    Object.assign(this, partial);
  }
}
