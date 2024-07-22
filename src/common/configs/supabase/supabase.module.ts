import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { createClient } from '@supabase/supabase-js';
import { Database } from 'src/database.supabase';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SupabaseClient',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseServiceKey = configService.get<string>(
          'SUPABASE_SERVICE_KEY',
        );
        return createClient<Database>(supabaseUrl, supabaseServiceKey);
      },
    },
    SupabaseStrategy,
    SupabaseGuard,
  ],
  exports: [SupabaseStrategy, SupabaseGuard, 'SupabaseClient'],
})
export class SupabaseModule {}
