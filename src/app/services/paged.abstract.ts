import { Observable } from 'rxjs';
import { IList, IListOptions } from '../core/services';


export abstract class PagedService<T> {

    abstract GetPagedList(options: IListOptions): Observable<IList<T>>;
    // abstract DeleteItem();
    // abstract UpdateItem();
    // abstract AddItem();
}
