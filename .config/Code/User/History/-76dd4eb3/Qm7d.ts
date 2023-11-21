import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { RateLimitRequestHandler, rateLimit } from 'express-rate-limit';
import { log } from '../../../utils/bunyan/log';
import { IAuthService } from '../../../../modules/users/services/IAuthService';
import { JWTClaims } from '../../../../modules/users/domain/Jwt';
import { DecodedExpressRequest } from '../../../../modules/users/infra/http/models/decodedRequest';
// import { redisCacheService } from '../../../../modules/cache/services';

export class Middleware {
  public constructor(authService: IAuthService) {
    this.authService = authService;
  }

  private authService: IAuthService;

  private endRequest(status: 400 | 401 | 403 | 500, name: string, details: string, res: any) {
    return res.status(status).json({ errors: [{ name, details }] });
  }

  public logRequest(req: Request, res: Response, next: NextFunction) {
    log.info({ 'x-request-id': req.get('x-request-id'), req });
    res.on('finish', () => {
      log.info({ 'x-request-id': req.get('x-request-id'), res });
    });

    return next();
  }

  public ensureAuthenticated() {
    return async (req: any, res: any, next: any) => {
      const { token } = req.headers;

      if (token) {
        let decoded: JWTClaims;

        try {
          decoded = await this.authService.decodeJWT(String(token));
        } catch (err) {
          if (!!err.expiredAt)
            return this.endRequest(
              401,
              'ERR_INVALID_TOKEN_SIGNATURE',
              `"x-auth-token" expired at: ${err.expiredAt}.`,
              res
            );
          return this.endRequest(
            401,
            'ERR_INVALID_TOKEN_SIGNATURE',
            'signature check failed.',
            res
          );
        }

        let tokens: any[];

        try {
          tokens = await this.authService.getTokens(decoded.email);
        } catch (err) {
          log.error('[Middleware]: an untracked error ocurred.');
          log.error(err);

          return this.endRequest(500, 'ERR_UNEXPECTED', 'An untracked error ocurred.', res);
        }

        if (tokens.length <= 0)
          return this.endRequest(
            401,
            'ERR_INVALID_TOKEN_SIGNATURE',
            'signature check failed.',
            res
          );

        req.decoded = decoded;

        return next();
      }

      return this.endRequest(500, 'ERR_UNEXPECTED', 'An untracked error ocurred.', res);
    };
  }

  public rateLimit(minutes: number, max: number): RateLimitRequestHandler {
    return rateLimit({
      windowMs: minutes * 60 * 1000,
      max,
      headers: true,
    });
  }

  public multerUpload(fileSize: number, filename: string) {
    const multerUpload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: fileSize * 1024 * 1024,
      },
    }).single(filename);

    return (req: Request, res: Response, next: NextFunction) => {
      multerUpload(req, res, (err: any) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return this.endRequest(400, 'ERR_FILE_TOO_LARGE', 'File too large.', res);
          }

          return this.endRequest(400, 'ERR_FILE_UPLOAD_FAILED', 'File upload failed.', res);
        }

        return next();
      });
    };
  }
}
