export default interface IJwtConfig {
  algorithm: string;
  audience: string;
  expiresIn: string;
  issuer: string;
  privateKey: string;
  publicKey?: string;
}
