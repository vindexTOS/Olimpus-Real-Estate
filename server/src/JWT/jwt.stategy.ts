// jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwt from "jsonwebtoken"; // Import jsonwebtoken
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY, // Use your JWT secret here
    });
  }

  async validate(payload : any) {
    if (!payload) {
        return 'no payload';
    }
      return payload
  }

  async generateToken(user) {
    const payload = {
        ...user
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_TIME, // Adjust token expiration as needed
    });
  }
}