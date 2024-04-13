//My base de datos
import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ unique: true, optional: false }),
    password: column.text({ optional: true }), //puede logearse con otras alternativas como github o google o apple por ejemplo
    github_id: column.text({ optional: true, unique: true }),
  }
})

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }), //OJO da error hasta ahora colocando id  en la ssesion como clave primaria pero con el lucia auth
    userId: column.text({ optional: false, references: () => User.columns.id }),
    expiresAt: column.number({ optional: false }),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Session,
  }
});
