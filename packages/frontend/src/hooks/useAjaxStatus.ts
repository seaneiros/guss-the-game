import {
  useRef,
  useState }                    from 'react';

import type { IAjaxStatus }     from '../types';
import type { AjaxStatusError } from '../utils/ajaxStatus';
import { AjaxStatus }           from 'src/constants';


export const useAjaxStatus = (defaultStatus: IAjaxStatus = AjaxStatus.default()) => {
  const [ status, setStatus ] = useState<IAjaxStatus>(defaultStatus);

  const { current: setSuccess } = useRef(() => setStatus(AjaxStatus.success()));
  const { current: setRequest } = useRef(() => setStatus(AjaxStatus.request()));
  const { current: setFailure } = useRef((err: AjaxStatusError) => setStatus(AjaxStatus.failure(err)));
  const { current: resetStatus } = useRef(() => setStatus(defaultStatus));


  return {
    status,
    setSuccess,
    setRequest,
    setFailure,
    resetStatus,
  };
};