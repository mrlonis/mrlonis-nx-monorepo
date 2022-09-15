export interface BaseResource {
  id: string;
  name: string;
  imageUrl: string;

  _links: {
    self: {
      href: string;
    };
    item: {
      href: string;
    };
  };
}
