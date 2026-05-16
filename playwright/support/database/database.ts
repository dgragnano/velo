import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

// O Session Pooler do Supabase usa certificado auto-assinado, por isso
// rejectUnauthorized: false é necessário. Ativamos quando a URL contém
// 'pooler.supabase.com' (Session Pooler) ou quando estamos em CI.
const dbUrl = process.env.DATABASE_URL ?? ''
const useSSL = process.env.CI === 'true' || dbUrl.includes('pooler.supabase.com')
const sslConfig = useSSL ? { rejectUnauthorized: false } : undefined

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