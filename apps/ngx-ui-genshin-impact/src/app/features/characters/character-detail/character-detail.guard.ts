import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export function characterDetailCanActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  console.log(state);
  const id = route.paramMap.get('id');
  if (id == 'error') {
    alert('Invalid product Id');
    return false;
  }
  return true;
}
