
export const tryCatch = async (asyncFunc) => {
    try {
      const data = await asyncFunc();
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  };