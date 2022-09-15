import { SpringDataRestHref } from '../spring-data-rest';

export interface BaseResource {
  id: string;
  name: string;
  imageUrl: string;

  _links: {
    self: SpringDataRestHref;
    item: SpringDataRestHref;
  };
}
