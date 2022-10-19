import { BaseResource } from '../base';
import { SpringDataRestHref } from '../spring-data-rest';

export interface Character extends BaseResource {
  rarity: number;
  elementId: string;
  weaponOneId: string;
  weaponTwoId?: string;
  artifactSetOneId: string;
  artifactSetTwoId?: string;

  _links: {
    self: SpringDataRestHref;
    item: SpringDataRestHref;
    element: SpringDataRestHref;
    weaponOne: SpringDataRestHref;
    weaponTwo?: SpringDataRestHref;
    artifactSetOne: SpringDataRestHref;
    artifactSetTwo?: SpringDataRestHref;
  };
}
