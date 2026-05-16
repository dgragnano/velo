import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

// O Session Pooler do Supabase exige SSL.
// Em CI (GitHub Actions define CI=true automaticamente) habilitamos SSL;
// localmente, contra a conexão direta, SSL não é necessário.
const sslConfig = process.env.CI ? { rejectUnauthorized: false } : undefined

const dialect = new PostgresDialect({
    pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        max: 10,
        ssl: sslConfig,
    })
})

export const db = new Kysely<Database>({
    dialect,
})