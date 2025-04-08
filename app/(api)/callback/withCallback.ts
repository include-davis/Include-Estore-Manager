import callbacks from '../../_utils/callbacks';

export default function WithCallback(func: (...args: unknown[]) => unknown) {
  return async (...args: unknown[]) => {
    const res = await func(...args);
    callbacks.onUpdate();
    return res;
  };
}
