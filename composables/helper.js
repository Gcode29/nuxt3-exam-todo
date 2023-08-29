export default function useObjectHelper() {
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return { isEmptyObject };
}
