import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import {
  BadRequestException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Plugin()
export class JwtAuthPlugin implements ApolloServerPlugin {
  private logger = new Logger(JwtAuthPlugin.name);
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const message = 'An GraphQL error occured, sending status: [%d]';
    const logError = (code, error) => {
      this.logger.error(error);
      this.logger.error(message, code);
    };
    const logWarn = (code, error) => {
      this.logger.warn(error);
      this.logger.warn(message, code);
    };
    return {
      async didEncounterErrors(requestContext) {
        if (
          requestContext.errors.find(
            (e) => e.originalError instanceof UnauthorizedException
          )
        ) {
          requestContext.response.http.status = 401;
        } else if (
          requestContext.errors.find(
            (e) => e.originalError instanceof BadRequestException
          )
        ) {
          requestContext.response.http.status = 400;
        } else if (
          requestContext.errors.find(
            (e) => e.originalError instanceof NotFoundException
          )
        ) {
          requestContext.response.http.status = 404;
        } else {
          requestContext.response.http.status = 500;
        }
        const log =
          requestContext.response.http.status === 500 ? logError : logWarn;
        log(requestContext.response.http.status, requestContext.errors[0]);
      },
    };
  }
}
