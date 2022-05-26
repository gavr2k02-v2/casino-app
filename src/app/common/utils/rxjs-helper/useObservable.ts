import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';

export function useObservable<T>(observable: Subject<T>): T | undefined {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
}
