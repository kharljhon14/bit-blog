import { SignJWT } from 'jose';

const tempSecret = new TextEncoder().encode('secret');

export async function signInToken(userId: string) {
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setExpirationTime('1 week')
    .setIssuedAt()
    .sign(tempSecret);

  return jwt;
}
