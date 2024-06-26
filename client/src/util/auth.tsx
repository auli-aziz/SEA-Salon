export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration') as string;
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken(): string | null {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader(): string | null {
  const token = getAuthToken();
  if(token === "EXPIRED") {
    return null;
  }
  return token;
}