export const getBaseUrl = () => {
  return typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL // 서버 사이드
    : window.location.origin; // 클라이언트 사이드
};
