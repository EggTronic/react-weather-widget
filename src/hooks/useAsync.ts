/* eslint-disable */
import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';
import { FnReturningPromise } from '../utils/index';

export default function useAsync<T extends FnReturningPromise>(fn: T, deps: DependencyList = []) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}