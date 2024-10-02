import { useRef } from "react";
/*-- Example usage
  import useMounted from "hooks/useMounted"

  const mounted = useMounted()
--*/

import { useEffect, useState } from "react";
const useMounted = () => {
  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);
  return hasMounted.current;
};
export default useMounted;