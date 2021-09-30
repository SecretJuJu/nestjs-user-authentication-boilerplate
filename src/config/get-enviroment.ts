const getEnv = (key: string): string => {
  const value: string | undefined = process.env[key];
  if (!value) {
    // value === undeefined
    throw new Error(`환경변수 ${key}이 설정되지 않았습니다.`);
  }

  return value;
};

export default getEnv;
