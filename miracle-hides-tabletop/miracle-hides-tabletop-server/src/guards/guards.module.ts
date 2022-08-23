import { Module } from '@nestjs/common';
import { AuthGuard, AUTH_GUARD } from './auth.guard';
@Module({
  exports: [AUTH_GUARD],
  providers: [
    {
      provide: AUTH_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class GuardsModule {}
